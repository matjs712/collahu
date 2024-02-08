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
import EditCampamento from "./edit_campamento"

export type Campamento = {
    id:                string
    nombre:            string
    descripcion?:       string
    img?:               string
}


export const columns: ColumnDef<Campamento>[] = [
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
      accessorKey: "img",
      header: "Imagen",
    },
    {
      header: "",
      id: "Configuración",
      cell: ({ row }) => {
        const campamento = row.original
   
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
              <EditCampamento campamento={campamento} id={campamento.id}/>
              <DropdownMenuSeparator />
              <Delete id={campamento.id}/>

            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    },
  ];
