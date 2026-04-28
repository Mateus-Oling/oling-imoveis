import { z } from "zod"

export const propertySchema = z.object({
  title: z.string().trim().min(4, "Título deve ter pelo menos 4 caracteres"),
  type: z.string().trim().min(1, "Selecione um tipo de imóvel"),

  address: z.string().trim().min(5, "Endereço obrigatório"),
  complement: z.string().trim().optional(),
  reference_point: z.string().trim().optional(),
  neighborhood: z.string().trim().min(2, "Bairro obrigatório"),
  city: z.string().trim().min(2, "Cidade inválida"),
  zip_code: z.string().trim().min(8, "CEP inválido"),

  condition: z.string().trim().optional(),

  price: z.coerce.number().min(5, "Preço obrigatório"),
  area_total: z.coerce.number().min(1, "Área obrigatória"),
  area_built: z.coerce.number().optional(),

  bedrooms: z.coerce.number().optional(),
  suites: z.coerce.number().optional(),
  bathrooms: z.coerce.number().optional(),
  other_rooms: z.coerce.number().optional(),

  garage_covered: z.coerce.number().optional(),
  garage_uncovered: z.coerce.number().optional(),

  sun_position: z.string().trim().optional(),
  year_built: z.coerce.number().optional(),

  description: z.string(),
})
