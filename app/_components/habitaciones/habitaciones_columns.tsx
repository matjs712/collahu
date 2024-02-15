"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DotsVerticalIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Delete from "./delete"


export type Habitacion = {
  id:                string,
  campamentoId: string,
  wingId:       string,
  numero?:       number,
  descripcion?:  string,
  n_camas?:      number,
  tipo_huesped?: string,
  tipo_banio?:   string,
  tipo_cargos?:  string,
  tipo_turnos?:  string,
}


export const columns: ColumnDef<Habitacion>[] = [
    // {
    //   accessorKey: "id",
    //   header: "ID",
    // },
    {
      accessorKey: "numero",
      header: "Numero",
    },
    {
      accessorKey: "descripcion",
      header: "Descripcion",
    },
    {
      accessorKey: "piso",
      header: "Piso",
    },
    {
      accessorKey: "campamento.nombre",
      header: "Campamento",
    },
    {
      accessorKey: "wing.nombre",
      header: "Pabellón",
    },
    {
      accessorKey: "n_camas",
      header: "N°Camas",
    },
    {
      accessorKey: "tipo_cama",
      header: "Tipo de cama",
    },
    {
      accessorKey: "tipo_huesped",
      header: "Tipo de huesped",
    },
    {
      accessorKey: "tipo_banio",
      header: "Tipo de baño",
    },
    {
      accessorKey: "tipo_cargos",
      header: "Tipo de cargo",
    },
    {
      accessorKey: "tipo_turnos",
      header: "Tipo de turno",
    },
    // {
    //   header: "",
    //   id: "Configuración",
    //   cell: ({ row }) => {
    //     const espacio = row.original
   
    //     return (
    //       <DropdownMenu>
    //         <DropdownMenuTrigger asChild>
    //           <Button variant="ghost" className="h-8 w-8 p-0">
    //             <span className="sr-only">Abir menú</span>
    //             <DotsVerticalIcon className="h-4 w-4" />
    //           </Button>
    //         </DropdownMenuTrigger>
    //         <DropdownMenuContent align="end">
                            
    //           {/* <SeeMoreMedicine medicine={medicine}/> */}

    //           <DropdownMenuSeparator />
    //           {/* @ts-ignore */}
    //           {/* <EditWing wing={wing} id={wing.id}/> */}
    //           <DropdownMenuSeparator />
    //           <Delete id={espacio.id}/>
    //         </DropdownMenuContent>
    //       </DropdownMenu>
    //     )
    //   }
    // },
  ];
// as