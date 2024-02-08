'use server'
import * as z from 'zod';
import { db } from "@/lib/db"
import { CampamentoSchema } from "@/schemas"
import { revalidatePath } from 'next/cache';

export const addCampamentos = async (values: z.infer<typeof CampamentoSchema> ) => {
    const validatedFields = CampamentoSchema.safeParse(values);
    if(!validatedFields.success) return { error: "Campos incorrectos" }

    await db.campamento.create({
        data: {
            ...values
        }
    })

    revalidatePath('/campamentos');

    return { success: "Campamento añadido éxitosamente!." }
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
export const getCampamento = async ({id}:{id:string} ) => {

    const campamento = await db.campamento.findUnique({
        where: { id }
    }) 

    if(!campamento) return { error: "No se ha encontrado el campamento!." }

    return campamento;
}
export const getCampamentos = async () => {

    const campamentos = await db.campamento.findMany({
        include:{
            wings: true
        }
    }) 

    return campamentos;
}