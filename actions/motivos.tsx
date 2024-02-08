'use server'
import * as z from 'zod';
import { db } from "@/lib/db"
import { MotivoSchema } from "@/schemas"
import { revalidatePath } from 'next/cache';

export const addMotivo = async (values: z.infer<typeof MotivoSchema> ) => {
    const validatedFields = MotivoSchema.safeParse(values);
    if(!validatedFields.success) return { error: "Campos incorrectos" }

    await db.motivos.create({
        data: {
            ...values
        }
    })

    revalidatePath('/motivos');

    return { success: "Motivo añadido éxitosamente!." }
}
export const deleteMotivo = async ({id}:{id:string} ) => {

    const motivo = await db.motivos.findUnique({
        where: { id }
    }) 

    if(!motivo) return { error: "No se ha encontrado el motivo!." }

    await db.motivos.delete({
        where: { id }
    })

    revalidatePath('/motivos');

    return { success: "Motivo eliminado éxitosamente!." }
}