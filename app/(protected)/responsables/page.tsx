'use client'
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getUserData } from "@/data/usuarios";
import { cn } from "@/lib/utils";
import { ArrowDownIcon, CheckIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Toaster, toast } from "sonner"
  

const ResponsablesPage = () => {

    const [usuarios, setUsuarios] = useState<any>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string>("");
    const [id, setId] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [motivo, setMotivo] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
          try {
            const usuariosData = await getUserData();
            setUsuarios(usuariosData);
          } catch (error) {
            console.error('Error al traer la información de los usuarios:', error);
          }
        };
    
        fetchData();
    }, []);



  return (
    <div className="flex items-center justify-between flex-wrap">
      <div className="flex w-full justify-between flex-wrap flex-col">
        <h1 className="text-3xl mb-5">Responables</h1>
        <div className="flex items-center gap-2 flex-wrap flex-row">
            <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={open}
                                        className="w-full justify-between"
                                        >
                                        {value
                                            ? usuarios.find((usuario:any) => usuario.name === value)?.name
                                            : "Selecciona un usuario..."}
                                        <ArrowDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0">
                                        <Command>
                                        <CommandInput placeholder="Busca un usuario..." />
                                        <CommandEmpty>No hay usuarios registrados.</CommandEmpty>
                                        <CommandGroup>
                                            {usuarios.map((usuario:any) => (
                                            <CommandItem
                                                key={usuario.name}
                                                value={usuario.name}
                                                onSelect={(currentValue) => {
                                                    console.log(currentValue);
                                                    setValue(currentValue === value ? "" : usuario.name);
                                                    setId(usuario.id);
                                                    setEmail(usuario.email)
                                                    setOpen(false);
                                                }}
                                            >
                                                <CheckIcon
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    value === usuario.name ? "opacity-100" : "opacity-0"
                                                )}
                                                />
                                                {usuario.name}
                                            </CommandItem>
                                            ))}
                                        </CommandGroup>
                                        </Command>
                                    </PopoverContent>
                                    </Popover>
            <Select onValueChange={(value)=>setMotivo(value)}>
                <SelectTrigger>
                    <SelectValue placeholder="Motivo" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Aprobación modificación reserva">Aprobación modificación reserva</SelectItem>
                    <SelectItem value="Problema técnico">Problema técnico</SelectItem>
                    <SelectItem value="Creación nuevo usuario">Creación nuevo usuario</SelectItem>
                    <SelectItem value="Reclamo registrado">Reclamo registrado</SelectItem>
                </SelectContent>
            </Select>
        </div>
        { !!email && !!motivo ? <Dialog>
            <DialogTrigger>
                <Button className="w-1/2 mt-4">Enviar correo</Button>
            </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Enviarás una notificación a <span className="p-2 rounded-md bg-slate-200 text-black">{email}</span> </DialogTitle>
                    <DialogDescription>
                        Motivo: {motivo}
                    </DialogDescription>
                    <DialogFooter>
                        <Button type="submit"
                            onClick={() => {
                                toast('Correo enviado!');
                              }}>Enviar Correo
                        </Button>
                    </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog> : <div className="w-full flex justify-center">
                    <Button disabled className="w-1/2 mt-4 align-middle">Enviar correo</Button> 
            </div>}

      </div>
      <Toaster />
    </div>
  )
}

export default ResponsablesPage