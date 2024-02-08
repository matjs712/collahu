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

export type User = {
    id:                string
    name:            string
    email:            string
    telefono?:            string
    rut?:            string
    cargo?: string
    rol?: string    
}

export const columns: ColumnDef<User>[] = [
    // {
    //   accessorKey: "id",
    //   header: "ID",
    // },
    {
      accessorKey: "name",
      header: "Nombre",
    },
    {
      accessorKey: "email",
      header: "Correo",
    },
    {
      accessorKey: "telefono",
      header: "Teléfono",
    },
    {
      accessorKey: "rut",
      header: "Rut",
    },
    {
      accessorKey: "cargo",
      header: "Cargo",
    },
    {
      accessorKey: "rol",
      header: "Rol",
    },
    // {
    //   header: "",
    //   id: "Configuración",
    //   cell: ({ row }) => {
    //     const campamento = row.original
   
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
    //           {/* <EditCampamento campamento={campamento} id={campamento.id}/> */}
    //           <DropdownMenuSeparator />
    //           {/* <Delete id={campamento.id}/> */}

    //         </DropdownMenuContent>
    //       </DropdownMenu>
    //     )
    //   }
    // },
  ];
