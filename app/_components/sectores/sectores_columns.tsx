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
import EditWing from "./edit_sector"
import EditSector from "./edit_sector"


export type Sector = {
  id:                string
  nombre: string,
  campamentoId?: string,
}


export const columns: ColumnDef<Sector>[] = [
    {
      accessorKey: "nombre",
      header: "Nombre",
    },
    {
      accessorKey: "campamento.nombre",
      header: "Campamento",
    },
    {
      header: "",
      id: "Configuración",
      cell: ({ row }) => {
        const sector = row.original
   
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
              <EditSector sector={sector} id={sector.id}/>
              <DropdownMenuSeparator />
              <Delete id={sector.id}/>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    },
  ];
