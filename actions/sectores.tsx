'use server'
import * as z from 'zod';
import { db } from "@/lib/db"
import { CampamentoSchema, SectorSchema, WingSchema } from "@/schemas"
import { revalidatePath } from 'next/cache';

export const addSector = async (values: z.infer<typeof SectorSchema> ) => {
    const validatedFields = SectorSchema.safeParse(values);
    if(!validatedFields.success) return { error: "Campos incorrectos" }

    await db.sector.create({
        data: {
            ...values
        }
    })

    revalidatePath('/sectores');

    return { success: "Sector añadido éxitosamente!." }
}
export const deleteSector = async ({id}:{id:string} ) => {

    const sector = await db.sector.findUnique({
        where: { id }
    }) 

    if(!sector) return { error: "No se ha encontrado el sector!." }

    await db.sector.delete({
        where: { id }
    })

    revalidatePath('/sectores');

    return { success: "Sector eliminado éxitosamente!." }
}
export const editSector = async ({values, id}:{values:
    //  z.infer<typeof WingSchema>
    any
     , id:string} ) => {
    
    const wing = await db.sector.findUnique({
        where: { id }
    }) 

    if(!wing) return { error: "No se ha encontrado el sector!." }

    await db.sector.update({
        where: {
            id
        },
        data: {
            ...values
        }
    })

    revalidatePath('/sectores');

    return { success: "Sector actualizado éxitosamente!." }
}
