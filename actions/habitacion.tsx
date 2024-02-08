'use server'
import * as z from 'zod';
import { db } from "@/lib/db"
import { HabitacionSchema } from "@/schemas"
import { revalidatePath } from 'next/cache';

export const addHabitacion = async (values: any
    // z.infer<typeof UserSchema> 
    ) => {
    const validatedFields = HabitacionSchema.safeParse(values);
    if(!validatedFields.success) return { error: "Campos incorrectos" }

    await db.habitacion.create({
        data: {
            ...values
        }
    })

    revalidatePath('/habitaciones');

    return { success: "Habitacion añadida éxitosamente!." }
}