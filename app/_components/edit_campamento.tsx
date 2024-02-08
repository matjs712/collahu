'use client'
import { Button } from "@/components/ui/button"
import * as z from 'zod'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useRef, useState, useTransition } from "react"
import { BarLoader } from "react-spinners"
import { toast } from "sonner"
import { CampamentoSchema } from "@/schemas"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { editCampamento } from "@/actions/campamentos"

const EditCampamento = ({campamento, id}:{campamento:z.infer<typeof CampamentoSchema>, id: string}) => {
    
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [isPending, startTransition] = useTransition()
    const [success, setSuccess] = useState<string | undefined>("");
    const [error, setError] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof CampamentoSchema>>({
        resolver: zodResolver(CampamentoSchema),
        defaultValues: {
          nombre: campamento.nombre || undefined,
          descripcion: campamento.descripcion || undefined,
          img: "" || undefined
        },
      })

      const onSubmit = (values: z.infer<typeof CampamentoSchema>) =>{
        startTransition(async ()=> {
          if (!inputFileRef.current?.files) throw new Error("No file selected");
          const file = inputFileRef.current.files[0]; 
          
          if(file){
            // const imgUrl = await uploadImage({ file });
            // const mappedValues = { ...values, img: imgUrl };
    
            editCampamento({values, id})
            //   .then( resp=> {
            //     if(resp.success){
            //       setSuccess(resp.success);
            //       toast(resp.success);
            //     }else if(resp.error){
            //       setError(resp.error);
            //       toast(resp.error)
            //     }
            //   })
          }else{
            editCampamento({values, id})
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
    <Dialog>
    <DialogTrigger className="w-full text-start px-2">Editar</DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Editar campamento {campamento.nombre}</DialogTitle>
      </DialogHeader>
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
                  <Button disabled={isPending} type="submit" size="lg" className='w-full text-md font-semibold'>{isPending ? <BarLoader color="white"/> : 'Editar'}</Button>
                </form>
              </Form>
    </DialogContent>
  </Dialog>
  )
}

export default EditCampamento