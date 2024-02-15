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
import { MotivoSchema } from "@/schemas";
import { useEffect, useRef, useState, useTransition } from "react";
import { addCampamentos } from "@/actions/campamentos";
import {  BarLoader } from 'react-spinners';
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import { Card, CardContent } from "@/components/ui/card";
import Motivos from "@/app/_components/motivos/motivos";
import { Motivo, columns } from "@/app/_components/motivos/motivos_columns";
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import { getMotivosData } from "@/data/motivos";
import { addMotivo } from "@/actions/motivos";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MotivosPage = () => {

  const inputFileRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [motivos, setMotivos] = useState<Motivo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const motivosData = await getMotivosData();
        setMotivos(motivosData);
        console.log(motivosData)
      } catch (error) {
        console.error('Error al traer la información de los motivos:', error);
      } finally{
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const form = useForm<z.infer<typeof MotivoSchema>>({
    resolver: zodResolver(MotivoSchema),
    defaultValues: {
      tipo_requerimiento: "",
      descripcion: "",
      prioridad: ""
    },
  })
  
  const onSubmit = (values: z.infer<typeof MotivoSchema>) =>{
    startTransition(async ()=>{
        addMotivo(values)
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
        <h1 className="text-3xl">Motivos</h1>
        <Dialog>
          <DialogTrigger className="bg-[#169f85] hover:bg-[#169f85] font-normal p-2 rounded-md text-white">
            CREAR MOTIVO
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="w-full text-center font-normal">Crear motivo</DialogTitle>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="tipo_requerimiento"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-md'>Tipo de Requerimiento</FormLabel>
                        <FormControl>
                        <Select 
                            onValueChange={field.onChange}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Seleccione un tipo de requerimiento" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Obras civiles">Obras civiles</SelectItem>
                                <SelectItem value="Eléctricos">Eléctricos</SelectItem>
                                <SelectItem value="Sanitaríos">Sanitaríos</SelectItem>
                                <SelectItem value="Climatización">Climatización</SelectItem>
                                <SelectItem value="Agua Caliente">Agua Caliente</SelectItem>
                                <SelectItem value="Cerrajería">Cerrajería</SelectItem>
                            </SelectContent>
                            </Select>

                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="descripcion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-md'>Descripción</FormLabel>
                        <FormControl>
                          <Input {...field}  type='text' placeholder="El dia...." disabled={isPending}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                    <FormField
                    control={form.control}
                    name="prioridad"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-md'>Prioridad</FormLabel>
                        <FormControl>
                        <Select 
                            onValueChange={field.onChange}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Seleccione el nivel de prioridad" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Urgente">Urgente</SelectItem>
                                <SelectItem value="Dentro del día">Dentro del día</SelectItem>
                                <SelectItem value="Baja">Baja</SelectItem>
                            </SelectContent>
                            </Select>

                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                        <FormError message={error} />
                        <FormSuccess message={success} />
                  <Button disabled={isPending} type="submit" size="lg" className='w-full text-md font-semibold'>{isPending ? <BarLoader color="white"/> : 'Entrar'}</Button>
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
          <Motivos columns={columns} data={motivos}/> 
        </CardContent>
      </Card>
    </div>
  );
};

export default MotivosPage;
