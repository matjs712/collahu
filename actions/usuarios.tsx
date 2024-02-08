'use server'
import * as z from 'zod';
import { db } from "@/lib/db"
import { UserSchema } from "@/schemas"
import { revalidatePath } from 'next/cache';

export const addUsuarios = async (values: any
    // z.infer<typeof UserSchema> 
    ) => {
    const validatedFields = UserSchema.safeParse(values);
    if(!validatedFields.success) return { error: "Campos incorrectos" }

    await db.user.create({
        data: {
            ...values
        }
    })

    revalidatePath('/usuarios');

    return { success: "Usuario añadido éxitosamente!." }
}