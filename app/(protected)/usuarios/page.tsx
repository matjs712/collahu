'use client'
import { Button } from "@/components/ui/button";
import * as z from "zod"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CampamentoSchema, UserSchema } from "@/schemas";
import { useEffect, useRef, useState, useTransition } from "react";
import { addCampamentos } from "@/actions/campamentos";
import {  BarLoader } from 'react-spinners';
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import { Card, CardContent } from "@/components/ui/card";

import { getCampamentosData } from "@/data/campamentos";
import { redirect } from "next/navigation";
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { addUsuarios } from "@/actions/usuarios";
import { getUserData } from "@/data/usuarios";
import { User, columns } from "@/app/_components/users/users_columns";
import Users from "@/app/_components/users/users";
  
const UsuariosPage = () => {

  const inputFileRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [value, setValue] = useState("");
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const usersData = await getUserData();
        setUsers(usersData);
        console.log(usersData)
      } catch (error) {
        console.error('Error al traer la información de los campamentos:', error);
      } finally{
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: "",
      email: "",
      cargo: "",
      rol: "",
      rut: "",
      telefono: ""
    },
  })
  
  const onSubmit = (values: z.infer<typeof UserSchema>) =>{
    startTransition(async ()=>{
        addUsuarios(values) // MODIFICAR POR MAPPEDVALUES
          .then( resp=> {
            if(resp.success){
              setSuccess(resp.success);
              toast(resp.success);
            }else if(resp.error){
              setError(resp.error);
              toast(resp.error)
            }
          })
    })
  }


  return (
    <div className="flex items-center justify-between flex-wrap">
      <div className="flex w-full items-center justify-between flex-wrap">
        <h1 className="text-3xl">Usuarios</h1>
        <Dialog>
          <DialogTrigger className="bg-[#169f85] hover:bg-[#169f85] font-normal p-2 rounded-md text-white">
            CREAR USUARIO
          </DialogTrigger>
          <DialogContent style={{ height:'90%', overflowY:'auto' }}>
            <DialogHeader>
              <DialogTitle className="w-full text-center font-normal">Crear usuario</DialogTitle>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-md'>Nombre</FormLabel>
                        <FormControl>
                          <Input  {...field} type="text" placeholder="Mark" disabled={isPending}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-md'>Correo</FormLabel>
                        <FormControl>
                          <Input  {...field} type="email" placeholder="john@doe.cl" disabled={isPending}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="rut"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-md'>Rut</FormLabel>
                        <FormControl>
                          <Input  {...field} type="text" placeholder="xxxxxxxxx" disabled={isPending}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="telefono"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-md'>Teléfono</FormLabel>
                        <FormControl>
                          <Input  {...field} type="text" placeholder="xxxxxxxxx" disabled={isPending}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cargo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-md'>Cargo</FormLabel>
                        <FormControl>
                          <Input  {...field} type="text" placeholder="..." disabled={isPending}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="rol"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-md'>Rol</FormLabel>
                        <FormControl>
                        <Select 
                            onValueChange={field.onChange}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Rol" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="recepcionista">Recepcionista</SelectItem>
                                <SelectItem value="huesped">Huesped</SelectItem>
                                <SelectItem value="CMDIC">CMDIC</SelectItem>
                                <SelectItem value="ESED">ESED</SelectItem>
                                <SelectItem value="administrador de aplicación">Administrador de aplicación</SelectItem>
                            </SelectContent>
                            </Select>

                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
           
   
                
                        <FormError message={error} />
                        <FormSuccess message={success} />
                  <Button disabled={isPending} type="submit" size="lg" className='w-full text-md font-semibold'>{isPending ? <BarLoader color="white"/> : 'Crear'}</Button>
                </form>
              </Form>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <hr className="w-full h-[2px] bg-gray-300 mt-4"/>
      <Toaster />
      <Card className="w-[380px] sm:w-full h-fit-content">
        <CardContent className="pt-5">
          <Users columns={columns} data={users}/> 
        </CardContent>
      </Card>
    </div>
  );
};

export default UsuariosPage;
