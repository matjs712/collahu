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
import { EspacioSchema } from "@/schemas";
import { useEffect, useState, useTransition } from "react";
import { getCampamentos } from "@/actions/campamentos";
import {  BarLoader } from 'react-spinners';
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import { Card, CardContent } from "@/components/ui/card";
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import { Wing } from "@/app/_components/wings/wings_columns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowDownIcon, CheckIcon } from "@radix-ui/react-icons";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { addEspacio } from "@/actions/espacios";
import { getEspaciosData } from "@/data/espacios";
import { Espacio, columns } from "@/app/_components/espacios/epsacios_columns";
import Espacios from "@/app/_components/espacios/espacios";
import { getSectoresData } from "@/data/sectores";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";


const EspaciosPage = () => {

  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [wings, setWings] = useState<Wing[]>([]);
  const [espacios, setEspacios] = useState<Espacio[]>([]);
  const [campamentos, setCampamentos] = useState<any>([]);
  const [sectores, setSectores] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [openWing, setOpenWing] = useState<boolean>(false);
  const [openSector, setOpenSector] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [valueWing, setValueWing] = useState<string>("");
  const [valueSector, setValueSector] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [idWing, setIdWing] = useState<string>("");
  const [idSector, setIdSector] = useState<string>("");
  

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const espaciosData = await getEspaciosData();
        console.log(espaciosData)
        setEspacios(espaciosData);
        const campamentosData = await getCampamentos();
        setCampamentos(campamentosData);
      } catch (error) {
        console.error('Error al traer la información de las alas:', error);
      } finally{
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const form = useForm<z.infer<typeof EspacioSchema>>({
    resolver: zodResolver(EspacioSchema),
    defaultValues: {
      campamentoId: "asd",
      wingId: "asd",
      sectorId: "asd",
      nombre: "",
      tipo: "",
      inventario: "",
      piso: "",
      descripcion: "",
    },
  })
  
  const onSubmit = (values: z.infer<typeof EspacioSchema>) =>{
    if(!id) {
      setError('Selecciona un campamento');
      return;
    }
    if(!idWing) {
      setError('Selecciona un ala');
      return;
    }
    startTransition(async ()=>{
        addEspacio({...values, campamentoId: id, wingId: idWing, sectorId: idSector})
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
        <h1 className="text-3xl">Espacios comunes</h1>
        <Dialog>
          <DialogTrigger className="bg-[#169f85] hover:bg-[#169f85] font-normal p-2 rounded-md text-white">
            CREAR ESPACIO COMÚN
          </DialogTrigger>
          <DialogContent style={{ height:'90%', overflowY:'auto' }}>
            <DialogHeader>
              <DialogTitle className="w-full text-center font-normal">Crear espacio común</DialogTitle>
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
                                            ? campamentos.find((campamento:any) => campamento.nombre === value)?.nombre
                                            : "Selecciona un campamento..."}
                                        <ArrowDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0">
                                        <Command>
                                        <CommandInput placeholder="Busca un campamento..." />
                                        <CommandEmpty>No hay campamentos registrados.</CommandEmpty>
                                        <CommandGroup>
                                            {campamentos.map((campamento:any) => (
                                            <CommandItem
                                                key={campamento.nombre}
                                                value={campamento.nombre}
                                                onSelect={(currentValue) => {
                                                    console.log(currentValue);
                                                    setValue(currentValue === value ? "" : campamento.nombre);
                                                    setId(campamento.id);
                                                    setOpen(false);
                                                    setWings(campamento.wings)
                                                    setSectores(campamento.sectores)
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
                            name="wingId"
                            render={({field}) => (
                            <FormItem className='flex flex-col gap-1'>
                                <FormLabel>Selecciona un pabellón.</FormLabel>
                                <FormControl className='w-full text-black'>
                                <Popover open={openWing} onOpenChange={setOpenWing}>
                                    <PopoverTrigger asChild>
                                        <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={openWing}
                                        className="w-full justify-between"
                                        >
                                        {valueWing
                                            ? wings.find((wing:any) => wing.nombre === valueWing)?.nombre
                                            : "Selecciona un pabellón..."}
                                        <ArrowDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0">
                                        <Command>
                                        <CommandInput placeholder="Busca un ala..." />
                                        <CommandEmpty>No se encontrarón registros.</CommandEmpty>
                                        <CommandGroup>
                                            {wings.map((wing:any) => (
                                            <CommandItem
                                                key={wing.nombre}
                                                value={wing.nombre}
                                                onSelect={(currentValue) => {
                                                    console.log(currentValue);
                                                    setValueWing(currentValue === valueWing ? "" : wing.nombre);
                                                    setIdWing(wing.id);
                                                    setOpenWing(false);
                                                }}
                                            >
                                                <CheckIcon
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    valueWing === wing.nombre ? "opacity-100" : "opacity-0"
                                                )}
                                                />
                                                {wing.nombre}
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
                            name="sectorId"
                            render={({field}) => (
                            <FormItem className='flex flex-col gap-1'>
                                <FormLabel>Selecciona un sector.</FormLabel>
                                <FormControl className='w-full text-black'>
                                <Popover open={openSector} onOpenChange={setOpenSector}>
                                    <PopoverTrigger asChild>
                                        <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={openSector}
                                        className="w-full justify-between"
                                        >
                                        {valueWing
                                            ? sectores.find((sector:any) => sector.nombre === valueSector)?.nombre
                                            : "Selecciona un sector..."}
                                        <ArrowDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0">
                                        <Command>
                                        <CommandInput placeholder="Busca un ala..." />
                                        <CommandEmpty>No se encontrarón registros.</CommandEmpty>
                                        <CommandGroup>
                                            {sectores.map((sector:any) => (
                                            <CommandItem
                                                key={sector.nombre}
                                                value={sector.nombre}
                                                onSelect={(currentValue) => {
                                                    console.log(currentValue);
                                                    setValueSector(currentValue === valueSector ? "" : sector.nombre);
                                                    setIdSector(sector.id);
                                                    setOpenSector(false);
                                                }}
                                            >
                                                <CheckIcon
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    valueSector === sector.nombre ? "opacity-100" : "opacity-0"
                                                )}
                                                />
                                                {sector.nombre}
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
                    name="tipo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-md'>Tipo</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecciona un tipo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hall">Hall</SelectItem>
                              <SelectItem value="pasillo">Pasillo</SelectItem>
                              <SelectItem value="Sala de recreacion">Sala de recreaciòn</SelectItem>
                              <SelectItem value="Sala de relajación">Sala de relajación</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
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
                          <Input  {...field} type="text" placeholder="Espacio 1" disabled={isPending}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="inventario"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-md'>Inventario</FormLabel>
                        <FormControl>
                          {/* <Input  {...field} type="text" placeholder="" disabled={isPending}/> */}
                          <Textarea {...field} placeholder="Listado de ..." disabled={isPending}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="piso"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-md'>Piso</FormLabel>
                        <FormControl>
                          <Input  {...field} type="text" placeholder="Piso 1" disabled={isPending}/>
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
          <Espacios columns={columns} data={espacios}/> 
        </CardContent>
      </Card>
    </div>
  );
};

export default EspaciosPage;
