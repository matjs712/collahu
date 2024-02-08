import * as z from 'zod';

export const LoginSchema = z.object({
    email: z.string().email({
      message: "El correo es requerido",
    }),
    password: z.string().min(1, {
      message: "La contraseña es requerida",
    }),
});

export const CampamentoSchema = z.object({
    nombre: z.string().min(1,{
      message: "El nombre es requerido",
    }),
    descripcion: z.optional(z.string()),
    img: z.optional(z.string()),
});
  