import { z } from "zod";

export const clientSchema = z.object({
    id: z.number().optional(), // 'id' es opcional
    name: z.string().min(1, "El nombre es obligatorio"),
    email: z.string().email("Debe ser un correo electrónico válido"),
    phoneNumber: z.string().min(10, "Debe ser un número de teléfono válido"),
    clientType: z.string().min(1, "El tipo de cliente es obligatorio"),
    visitsRemaining: z
        .number()
        .nonnegative("Las visitas restantes deben ser un número positivo")
        .int("Las visitas restantes deben ser un número entero"),
    monthlyFee: z
        .number()
        .nonnegative("El monto del plan debe ser un número positivo"),
});