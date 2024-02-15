'use client'
import { Button } from "@/components/ui/button"
import * as z from 'zod'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useEffect, useRef, useState, useTransition } from "react"
import { BarLoader } from "react-spinners"
import { toast } from "sonner"
import { SectorSchema, WingSchema } from "@/schemas"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { getCampamento } from "@/actions/campamentos"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Campamento } from "../campamentos_columns"
import { getCampamentosData } from "@/data/campamentos"
import { ArrowDownIcon, CheckIcon } from "@radix-ui/react-icons"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { editSector } from "@/actions/sectores"

const EditSector = ({sector, id}:{sector:z.infer<typeof SectorSchema>, id: string}) => {
    
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
          const campamento = await getCampamento({id: sector.campamentoId});
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
          nombre: sector.nombre || undefined,
          campamentoId: sector.campamentoId || undefined,
        },
      })

      const onSubmit = (values: z.infer<typeof WingSchema>) =>{
        startTransition(async ()=> {
          const mappedValues = { ...values, campamentoId: idCampamento }
          
          
            editSector({values: mappedValues, id})
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
        <DialogTitle>Editar sector {sector.nombre}</DialogTitle>
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
                  <FormError message={error} />
                  <FormSuccess message={success} />
                  <Button disabled={isPending} type="submit" size="lg" className='w-full text-md font-semibold'>{isPending ? <BarLoader color="white"/> : 'Actualizar'}</Button>
                </form>
              </Form>
    </DialogContent>
  </Dialog>
  )
}

export default EditSector