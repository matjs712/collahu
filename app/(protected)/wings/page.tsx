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
import { CampamentoSchema, WingSchema } from "@/schemas";
import { useEffect, useRef, useState, useTransition } from "react";
import { addCampamentos } from "@/actions/campamentos";
import {  BarLoader } from 'react-spinners';
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import { Card, CardContent } from "@/components/ui/card";
import { getCampamentosData } from "@/data/campamentos";
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import Wings from "@/app/_components/wings/wings";
import { getWingsData } from "@/data/wings";
import { Wing, columns } from "@/app/_components/wings/wings_columns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowDownIcon, CheckIcon } from "@radix-ui/react-icons";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Campamento } from "@/app/_components/campamentos_columns";
import { addWing } from "@/actions/wings";
// import { uploadImage } from "@/hooks/useUploadImg";

const WingsPage = () => {

  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [wings, setWings] = useState<Wing[]>([]);
  const [campamentos, setCampamentos] = useState<Campamento[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [id, setId] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const wingsData = await getWingsData();
        const campamentoData = await getCampamentosData();
        setWings(wingsData);
        setCampamentos(campamentoData);
        console.log(wingsData)
      } catch (error) {
        console.error('Error al traer la información de las alas:', error);
      } finally{
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const form = useForm<z.infer<typeof WingSchema>>({
    resolver: zodResolver(WingSchema),
    defaultValues: {
      campamentoId: "asd",
      nombre: "",
      descripcion: "",
      n_habitaciones: 0,
    },
  })
  
  const onSubmit = (values: z.infer<typeof WingSchema>) =>{
    if(!id) {
      setError('Selecciona un campamento');
      return;
    }
    startTransition(async ()=>{
        addWing({...values, campamentoId: id})
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
        <h1 className="text-3xl">Wings / Alas</h1>
        <Dialog>
          <DialogTrigger className="bg-[#169f85] hover:bg-[#169f85] font-normal p-2 rounded-md text-white">
            CREAR ALA
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="w-full text-center font-normal">Crear ala</DialogTitle>
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
                                                    setId(campamento.id);
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
                          <Input  {...field} type="text" placeholder="Ala 1" disabled={isPending}/>
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
                          <Input {...field}  type='text' placeholder="Ingresa la descripción del ala" disabled={isPending}/>
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
                            min={0}
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
          <Wings columns={columns} data={wings}/> 
        </CardContent>
      </Card>
    </div>
  );
};

export default WingsPage;
