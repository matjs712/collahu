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


export type Espacio = {
  id:                string
  nombre: string,
  campamentoId?: string,
  wingId?: string,
  sectorId?: string,
  descripcion?: string,
}


export const columns: ColumnDef<Espacio>[] = [
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
      accessorKey: "campamento.nombre",
      header: "Campamento",
    },
    {
      accessorKey: "Sector.nombre",
      header: "Sector",
    },
    {
      accessorKey: "tipo",
      header: "Tipo",
    },
    {
      accessorKey: "inventario",
      header: "Inventario",
    },
    {
      accessorKey: "wing.nombre",
      header: "Pabellón",
    },
    {
      header: "",
      id: "Configuración",
      cell: ({ row }) => {
        const espacio = row.original
   
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
              {/* <EditWing wing={wing} id={wing.id}/> */}
              <DropdownMenuSeparator />
              <Delete id={espacio.id}/>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    },
  ];
