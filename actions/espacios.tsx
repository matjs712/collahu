'use server'
import * as z from 'zod';
import { db } from "@/lib/db"
import { EspacioSchema } from "@/schemas"
import { revalidatePath } from 'next/cache';

export const addEspacio = async (values: z.infer<typeof EspacioSchema> ) => {
    const validatedFields = EspacioSchema.safeParse(values);
    if(!validatedFields.success) return { error: "Campos incorrectos" }

    await db.espacio.create({
        data: {
            ...values
        }
    })

    revalidatePath('/espacios');

    return { success: "Espacio añadido éxitosamente!." }
}
export const deleteEspacio = async ({id}:{id:string} ) => {

    const espacio = await db.espacio.findUnique({
        where: { id }
    }) 

    if(!espacio) return { error: "No se ha encontrado el espacio!." }

    await db.espacio.delete({
        where: { id }
    })

    revalidatePath('/espacios');

    return { success: "Espacio eliminado éxitosamente!." }
}
// export const editWing = async ({values, id}:{values:
//     //  z.infer<typeof WingSchema>
//     any
//      , id:string} ) => {
    
//     const wing = await db.wing.findUnique({
//         where: { id }
//     }) 

//     if(!wing) return { error: "No se ha encontrado el wing!." }

//     await db.wing.update({
//         where: {
//             id
//         },
//         data: {
//             ...values
//         }
//     })

//     revalidatePath('/wings');

//     return { success: "Ala actualizada éxitosamente!." }
// }
