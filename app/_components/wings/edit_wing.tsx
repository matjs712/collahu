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
import { useEffect, useRef, useState, useTransition } from "react"
import { BarLoader } from "react-spinners"
import { toast } from "sonner"
import { CampamentoSchema, WingSchema } from "@/schemas"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { editCampamento, getCampamento } from "@/actions/campamentos"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Campamento } from "../campamentos_columns"
import { getCampamentosData } from "@/data/campamentos"
import { ArrowDownIcon, CheckIcon } from "@radix-ui/react-icons"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { editWing } from "@/actions/wings"

const EditWing = ({wing, id}:{wing:z.infer<typeof WingSchema>, id: string}) => {
    
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [isPending, startTransition] = useTransition()
    const [success, setSuccess] = useState<string | undefined>("");
    const [error, setError] = useState<string | undefined>("");
    const [value, setValue] = useState<string>("");
    const [campamentos, setCampamentos] = useState<Campamento[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [idCampamento, setIdCampamento] = useState<string>("");

    useEffect(() => {
      // setLoading(true);
      const fetchData = async () => {
        try {
          const campamento = await getCampamento({id: wing.campamentoId});
          // @ts-ignore
          setValue(campamento?.nombre);
          // @ts-ignore
          setIdCampamento(campamento?.id)
          const campamentoData = await getCampamentosData();
          setCampamentos(campamentoData);
        } catch (error) {
          console.error('Error al traer la información de los campamentos:', error);
        } finally{
          // setLoading(false);
        }
      };
  
      fetchData();
    }, []);

    const form = useForm<z.infer<typeof WingSchema>>({
        resolver: zodResolver(WingSchema),
        defaultValues: {
          nombre: wing.nombre || undefined,
          descripcion: wing.descripcion || undefined,
          n_habitaciones: wing.n_habitaciones || undefined,
          campamentoId: wing.campamentoId || undefined,
        },
      })

      const onSubmit = (values: z.infer<typeof WingSchema>) =>{
        startTransition(async ()=> {
          const mappedValues = { ...values, campamentoId: idCampamento }
          
          
            editWing({values: mappedValues, id})
            .then((resp) => {
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
    <Dialog>
    <DialogTrigger className="w-full text-start px-2">Editar</DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Editar campamento {wing.nombre}</DialogTitle>
      </DialogHeader>
      <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                <FormField
                      control={form.control}
                            name="campamentoId"
                            render={({field}) => (
                            <FormItem className='flex flex-col gap-1'>
                                <FormLabel>Selecciona un campamento.</FormLabel>
                                <FormControl className='w-full text-black'>
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <Button 
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={open}
                                        className="w-full justify-between"
                                        >
                                        {value
                                            ? campamentos.find((campamento) => campamento.nombre === value)?.nombre
                                            : "Selecciona un campamento..."}
                                        <ArrowDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0">
                                        <Command>
                                        <CommandInput placeholder="Busca un campamento..." />
                                        <CommandEmpty>No hay campamentos registrados.</CommandEmpty>
                                        <CommandGroup>
                                            {campamentos.map((campamento) => (
                                            <CommandItem
                                                key={campamento.nombre}
                                                value={campamento.nombre}
                                                onSelect={(currentValue) => {
                                                    console.log(currentValue);
                                                    setValue(currentValue === value ? "" : campamento.nombre);
                                                    setIdCampamento(campamento.id);
                                                    setOpen(false);
                                                }}
                                            >
                                                <CheckIcon
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    value === campamento.nombre ? "opacity-100" : "opacity-0"
                                                )}
                                                />
                                                {campamento.nombre}
                                            </CommandItem>
                                            ))}
                                        </CommandGroup>
                                        </Command>
                                    </PopoverContent>
                                    </Popover>
                                </FormControl>
                                {/* <FormDescription /> */}
                                <FormMessage className='m-0'/>
                            </FormItem>
                            )}
                        />


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
                    name="n_habitaciones"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-md'>Número de habítaciones</FormLabel>
                        <FormControl>
                          <Input {...field}
                            value={Number(field.value) || 0}
                            type='number' 
                            placeholder="0" 
                            disabled={isPending}
                            onChange={(e) => {
                              const newValue = e.target.value;
                              field.onChange(newValue !== '' ? Number(newValue) : ''); // Convertir a número
                            }}
                            />
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
    </DialogContent>
  </Dialog>
  )
}

export default EditWing