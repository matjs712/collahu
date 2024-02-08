'use server'
import * as z from 'zod';
import { db } from "@/lib/db"
import { CampamentoSchema, WingSchema } from "@/schemas"
import { revalidatePath } from 'next/cache';

export const addWing = async (values: z.infer<typeof WingSchema> ) => {
    const validatedFields = WingSchema.safeParse(values);
    if(!validatedFields.success) return { error: "Campos incorrectos" }

    await db.wing.create({
        data: {
            ...values
        }
    })

    revalidatePath('/wings');

    return { success: "Ala añadida éxitosamente!." }
}
export const deleteWing = async ({id}:{id:string} ) => {

    const wing = await db.wing.findUnique({
        where: { id }
    }) 

    if(!wing) return { error: "No se ha encontrado el wing!." }

    await db.wing.delete({
        where: { id }
    })

    revalidatePath('/wings');

    return { success: "Ala eliminada éxitosamente!." }
}
export const editWing = async ({values, id}:{values:
    //  z.infer<typeof WingSchema>
    any
     , id:string} ) => {
    
    const wing = await db.wing.findUnique({
        where: { id }
    }) 

    if(!wing) return { error: "No se ha encontrado el wing!." }

    await db.wing.update({
        where: {
            id
        },
        data: {
            ...values
        }
    })

    revalidatePath('/wings');

    return { success: "Ala actualizada éxitosamente!." }
}