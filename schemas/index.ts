import * as z from 'zod';

export const LoginSchema = z.object({
    email: z.string().email({
      message: "El correo es requerido",
    }),
    password: z.string().min(1, {
      message: "La contraseña es requerida",
    }),
});

export const UserSchema = z.object({
    name: z.string().min(1,{
      message: "El nombre es requerido",
    }),
    email:z.optional(z.string()),
    telefono: z.optional(z.string()),
    cargo: z.optional(z.string()),
    rol: z.optional(z.string()),
    rut: z.optional(z.string()),

});
export const CampamentoSchema = z.object({
    nombre: z.string().min(1,{
      message: "El nombre es requerido",
    }),
    descripcion: z.optional(z.string()),
    img: z.optional(z.string()),
});
export const WingSchema = z.object({
    nombre: z.string().min(1,{
      message: "El nombre es requerido",
    }),
    campamentoId: z.string().min(1,{
      message: "Selecciona un campamento",
    }),
    descripcion: z.optional(z.string()), 
    n_habitaciones: z.optional(z.number()), 
});
export const EspacioSchema = z.object({
    nombre: z.string().min(1,{
      message: "El nombre es requerido",
    }),
    descripcion: z.optional(z.string()), 
    campamentoId: z.string().min(1,{
      message: "Selecciona un campamento",
    }),
    wingId: z.string().min(1,{
      message: "Selecciona un ala",
    }),
});
export const MotivoSchema = z.object({
  nombre: z.string().min(1,{
    message: "El nombre es requerido",
  }),
  descripcion: z.string().min(1,{
    message: "La descripción es requerida"
  }),
  prioridad: z.number().min(0,{
    message: "La prioridad es requerida"
  }),
});
export const HabitacionSchema = z.object({
  campamentoId:z.optional(z.string()),
  wingId: z.optional(z.string()),
  numero: z.optional(z.number()),
  descripcion: z.optional(z.string()),
  n_camas: z.optional(z.number()),
  tipo_huesped: z.optional(z.string()),
  tipo_cargos: z.optional(z.string()),
  tipo_banio: z.optional(z.string()),
  tipo_turnos: z.optional(z.string()),
});