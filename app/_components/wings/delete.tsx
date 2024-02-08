'use client'
import { deleteCampamento } from "@/actions/campamentos"
import { deleteWing } from "@/actions/wings"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useState, useTransition } from "react"
import { BarLoader } from "react-spinners"
import { toast } from "sonner"

  
const Delete = ({ id }:{ id: string }) => {

    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState<string | undefined>("");
    const [error, setError] = useState<string | undefined>("");

    const onClick = () => {
        startTransition(async()=>{
            deleteWing({id})
            .then(resp=> {
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
    <Dialog>
  <DialogTrigger className="w-full text-start px-2">Eliminar</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Estas seguro de eliminar el registro?</DialogTitle>
      <DialogDescription>
        Esta acción es irreversible
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
        <Button variant="destructive" disabled={isPending} className="w-full text-white" size="lg" onClick={onClick}>{isPending ? <BarLoader color="white"/> :'Eliminar'}</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

  )
}

export default Delete