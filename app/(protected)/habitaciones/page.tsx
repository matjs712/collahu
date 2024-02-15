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
import { EspacioSchema, HabitacionSchema } from "@/schemas";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addHabitacion } from "@/actions/habitacion";
import Habitaciones from "@/app/_components/habitaciones/habitaciones";
import { Habitacion, columns } from "@/app/_components/habitaciones/habitaciones_columns";
import { getHabitacionesData } from "@/data/habitaciones";


const HabitacionesPage = () => {

  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [wings, setWings] = useState<Wing[]>([]);
  const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);
  const [campamentos, setCampamentos] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [openWing, setOpenWing] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [valueWing, setValueWing] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [idWing, setIdWing] = useState<string>("");
  

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const habitacionData = await getHabitacionesData();
        setHabitaciones(habitacionData);
        const campamentosData = await getCampamentos();
        console.log('campamentos',campamentosData);
        setCampamentos(campamentosData);
      } catch (error) {
        console.error('Error al traer la información de las alas:', error);
      } finally{
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const form = useForm<z.infer<typeof HabitacionSchema>>({
    resolver: zodResolver(HabitacionSchema),
    defaultValues: {
      campamentoId: "asd",
      wingId: "asd",
      numero: 0,
      descripcion: "",
      n_camas: 0,
      piso: "",
      tipo_cama: "",
      tipo_cargos: "",
      tipo_banio: "",
      tipo_turnos: "",
    },
  })
  
  const onSubmit = (values: z.infer<typeof HabitacionSchema>) =>{
    if(!id) {
      setError('Selecciona un campamento');
      return;
    }
    if(!idWing) {
      setError('Selecciona un ala');
      return;
    }
    console.log({...values, campamentoId: id, wingId: idWing});
    startTransition(async ()=>{
        addHabitacion({...values, campamentoId: id, wingId: idWing})
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
        <h1 className="text-3xl">Habitaciones</h1>
        <Dialog>
          <DialogTrigger className="bg-[#169f85] hover:bg-[#169f85] font-normal p-2 rounded-md text-white">
            CREAR HABITACIÓN
          </DialogTrigger>
          <DialogContent style={{ height:'90%', overflowY:'auto' }}>
            <DialogHeader className="h-[80vh]">
              <DialogTitle className="w-full text-center font-normal">Crear habitación</DialogTitle>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 overflow-auto">

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
                                <FormLabel>Selecciona un ala.</FormLabel>
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
                                            : "Selecciona un ala..."}
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
                    name="numero"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-md'>Número</FormLabel>
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
                    name="piso"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-md'>Piso</FormLabel>
                        <FormControl>
                          <Input {...field}  type='text' placeholder="Piso de ejemplo..." disabled={isPending}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="n_camas"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-md'>Número de camas</FormLabel>
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
                    <div className="flex flex-wrap items-center gap-4">

                    
                    <FormField
                    control={form.control}
                    name="tipo_cama"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-md'>Tipo de cama</FormLabel>
                        <FormControl>
                        <Select 
                            onValueChange={field.onChange}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Seleccione un tipo de cama" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="2 plazas">2 plazas</SelectItem>
                                <SelectItem value="1 1/2">1 1/2</SelectItem>
                                <SelectItem value="1 plaza">1 plaza</SelectItem>
                                <SelectItem value="Litera">Litera</SelectItem>
                            </SelectContent>
                            </Select>

                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                    <FormField
                    control={form.control}
                    name="tipo_huesped"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-md'>Tipo de huesped</FormLabel>
                        <FormControl>
                        <Select 
                            onValueChange={field.onChange}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Seleccione un tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="mujeres">Mujeres</SelectItem>
                                <SelectItem value="hombres">Hombres</SelectItem>
                            </SelectContent>
                            </Select>

                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                    <FormField
                    control={form.control}
                    name="tipo_banio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-md'>Tipo de baño</FormLabel>
                        <FormControl>
                        <Select 
                            onValueChange={field.onChange}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Seleccione un tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="individual">Individual</SelectItem>
                                <SelectItem value="compartido">Compartido</SelectItem>
                                <SelectItem value="colectivo">Colectivo</SelectItem>
                            </SelectContent>
                            </Select>

                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                    <FormField
                    control={form.control}
                    name="tipo_cargos"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-md'>Cargos Reservados</FormLabel>
                        <FormControl>
                        <Select 
                            onValueChange={field.onChange}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Seleccione un tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Gerente">Gerente</SelectItem>
                                <SelectItem value="SubGenerente">Subgerente</SelectItem>
                                <SelectItem value="Inspector">Inspector</SelectItem>
                                <SelectItem value="Operario">Operario</SelectItem>
                                <SelectItem value="Todos">Todos</SelectItem>
                            </SelectContent>
                            </Select>

                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                    <FormField
                    control={form.control}
                    name="tipo_turnos"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-md'>Turnos Rotativos</FormLabel>
                        <FormControl>
                        <Select 
                            onValueChange={field.onChange}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Seleccione un tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Gerente">7x7</SelectItem>
                                <SelectItem value="SubGenerente">4x3</SelectItem>
                                <SelectItem value="Inspector">VIP</SelectItem>
                            </SelectContent>
                            </Select>

                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />


</div>
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
          <Habitaciones columns={columns} data={habitaciones}/> 
        </CardContent>
      </Card>
    </div>
  );
};

export default HabitacionesPage;
