import {z} from "zod"

export const registerSchema = z.object({
  name: z.string().min(2, {message: "Name is requeired and must be at least 2 characters"}).max(50, {message: "Name cannot be longer than 50 characters"}),
  sector: z.string().min(1, {message: "Sector is requeired"}),
  terms: z.literal(true, {
    errorMap: () => ({message: "You must accept the terms and conditions"})
  }),
})
