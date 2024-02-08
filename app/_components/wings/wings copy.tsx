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
export const deleteCampamento = async ({id}:{id:string} ) => {

    const campamento = await db.campamento.findUnique({
        where: { id }
    }) 

    if(!campamento) return { error: "No se ha encontrado el campamento!." }

    await db.campamento.delete({
        where: { id }
    })

    revalidatePath('/campamentos');

    return { success: "Campamento eliminado éxitosamente!." }
}
export const editCampamento = async ({values, id}:{values: z.infer<typeof CampamentoSchema>, id:string} ) => {

    const campamento = await db.campamento.findUnique({
        where: { id }
    }) 

    if(!campamento) return { error: "No se ha encontrado el campamento!." }

    await db.campamento.update({
        where: {
            id
        },
        data: {
            ...values
        }
    })

    revalidatePath('/campamentos');

    return { success: "Campamento actualizado éxitosamente!." }
}