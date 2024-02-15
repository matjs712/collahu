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
import { CampamentoSchema } from "@/schemas";
import { useEffect, useRef, useState, useTransition } from "react";
import { addCampamentos } from "@/actions/campamentos";
import {  BarLoader } from 'react-spinners';
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import { Card, CardContent } from "@/components/ui/card";
import Campamentos from "@/app/_components/campamentos";
import { Campamento, columns } from "@/app/_components/campamentos_columns";
import { getCampamentosData } from "@/data/campamentos";
import { redirect } from "next/navigation";
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
// import { uploadImage } from "@/hooks/useUploadImg";

const CampamentosPage = () => {

  const inputFileRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [campamentos, setCampamentos] = useState<Campamento[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const campamentosData = await getCampamentosData();
        setCampamentos(campamentosData);
        console.log('data', campamentosData)
      } catch (error) {
        console.error('Error al traer la información de los campamentos:', error);
      } finally{
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const form = useForm<z.infer<typeof CampamentoSchema>>({
    resolver: zodResolver(CampamentoSchema),
    defaultValues: {
      nombre: "",
      descripcion: "",
      direccion: "",
      img: "",
    },
  })
  
  const onSubmit = (values: z.infer<typeof CampamentoSchema>) =>{
    startTransition(async ()=>{
      if (!inputFileRef.current?.files) throw new Error("No file selected");
      const file = inputFileRef.current.files[0]; 
      
      if(file){
        // const imgUrl = await uploadImage({ file });
        // const mappedValues = { ...values, img: imgUrl };

        addCampamentos(values) // MODIFICAR POR MAPPEDVALUES
          .then( resp=> {
            if(resp.success){
              setSuccess(resp.success);
              toast(resp.success);
            }else if(resp.error){
              setError(resp.error);
              toast(resp.error)
            }
          })
      }else{
          addCampamentos(values)
          .then( resp=> {
            if(resp.success){
              setSuccess(resp.success);
              toast(resp.success);
            }else if(resp.error){
              setError(resp.error);
              toast(resp.error)
            }
          })
        }
    })
  }


  return (
    <div className="flex items-center justify-between flex-wrap">
      <div className="flex w-full items-center justify-between flex-wrap">
        <h1 className="text-3xl">Campamentos</h1>
        <Dialog>
          <DialogTrigger className="bg-[#169f85] hover:bg-[#169f85] font-normal p-2 rounded-md text-white">
            CREAR CAMPAMENTO
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="w-full text-center font-normal">Crear campamento</DialogTitle>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="nombre"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-md'>Nombre</FormLabel>
                        <FormControl>
                          <Input  {...field} type="text" placeholder="Campamento 1" disabled={isPending}/>
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
                          <Input {...field}  type='text' placeholder="Ingresa la descripción del campamento" disabled={isPending}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="direccion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-md'>Dirección</FormLabel>
                        <FormControl>
                          <Input {...field}  type='text' placeholder="Ingresa la dirección del campamento" disabled={isPending}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                            control={form.control}
                            name="img"
                            render={({field}) => (
                            <FormItem className="mt-2 flex flex-col gap-2">
                                <FormLabel className='block'>Imagen</FormLabel>
                                <FormControl>
                                    <input style={{ color:'black' }} type="file" ref={inputFileRef} disabled={isPending}/>
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
          <Campamentos columns={columns} data={campamentos}/> 
        </CardContent>
      </Card>
    </div>
  );
};

export default CampamentosPage;
