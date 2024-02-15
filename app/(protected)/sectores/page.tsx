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
import { SectorSchema } from "@/schemas";
import { useEffect, useState, useTransition } from "react";
import {  BarLoader } from 'react-spinners';
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import { Card, CardContent } from "@/components/ui/card";
import { getCampamentosData } from "@/data/campamentos";
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowDownIcon, CheckIcon } from "@radix-ui/react-icons";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Campamento } from "@/app/_components/campamentos_columns";
import { getSectoresData } from "@/data/sectores";
import { addSector } from "@/actions/sectores";
import Sectores from "@/app/_components/sectores/sectores";
import { Sector, columns } from "@/app/_components/sectores/sectores_columns";
// import { uploadImage } from "@/hooks/useUploadImg";

const SectoresPage = () => {

  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [wings, setWings] = useState<Sector[]>([]);
  const [campamentos, setCampamentos] = useState<Campamento[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [id, setId] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const wingsData = await getSectoresData();
        const campamentoData = await getCampamentosData();
        setWings(wingsData);
        setCampamentos(campamentoData);
        console.log(wingsData)
      } catch (error) {
        console.error('Error al traer la información de los sectores:', error);
      } finally{
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const form = useForm<z.infer<typeof SectorSchema>>({
    resolver: zodResolver(SectorSchema),
    defaultValues: {
      campamentoId: "asd",
      nombre: "",
    },
  })
  
  const onSubmit = (values: z.infer<typeof SectorSchema>) =>{
    if(!id) {
      setError('Selecciona un campamento');
      return;
    }
    startTransition(async ()=>{
        addSector({...values, campamentoId: id})
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
        <h1 className="text-3xl">Sectores</h1>
        <Dialog>
          <DialogTrigger className="bg-[#169f85] hover:bg-[#169f85] font-normal p-2 rounded-md text-white">
            CREAR SECTOR
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="w-full text-center font-normal">Crear sector</DialogTitle>
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
                          <Input  {...field} type="text" placeholder="Sector 1" disabled={isPending}/>
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
          <Sectores columns={columns} data={wings}/> 
        </CardContent>
      </Card>
    </div>
  );
};

export default SectoresPage;
