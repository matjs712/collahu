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
import EditWing from "./edit_wing"


export type Wing = {
  id:                string
  nombre: string,
  campamentoId?: string,
  descripcion?: string,
  habitaciones?: number,
}


export const columns: ColumnDef<Wing>[] = [
    // {
    //   accessorKey: "id",
    //   header: "ID",
    // },
    {
      accessorKey: "nombre",
      header: "Nombre",
    },
    {
      accessorKey: "descripcion",
      header: "Descripcion",
    },
    {
      accessorKey: "n_habitaciones",
      header: "n_habitaciones",
    },
    {
      accessorKey: "campamento.nombre",
      header: "Campamento",
    },
    {
      header: "",
      id: "Configuración",
      cell: ({ row }) => {
        const wing = row.original
   
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abir menú</span>
                <DotsVerticalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                            
              {/* <SeeMoreMedicine medicine={medicine}/> */}

              <DropdownMenuSeparator />
              {/* @ts-ignore */}
              <EditWing wing={wing} id={wing.id}/>
              <DropdownMenuSeparator />
              <Delete id={wing.id}/>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    },
  ];
