"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpIcon, DotsVerticalIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Delete from "./delete"
import EditCampamento from "./edit_motivo"

export type Motivo = {
    id:                 string
    tipo_requerimiento: string
    descripcion?:       string
    prioridad:          string
}


export const columns: ColumnDef<Motivo>[] = [
    // {
    //   accessorKey: "id",
    //   header: "ID",
    // },
    {
      accessorKey: "tipo_requerimiento",
      header: "Tipo de requerimiento",
    },
    {
      accessorKey: "descripcion",
      header: "Descripcion",
    },
    {
      accessorKey: "prioridad",
      header: "Prioridad",
    },
    {
      header: "",
      id: "Configuración",
      cell: ({ row }) => {
        const motivos = row.original
   
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
              {/* <EditMotivos motivos={motivos} id={motivos.id}/> */}
              <DropdownMenuSeparator />
              <Delete id={motivos.id}/>

            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    },
  ];
