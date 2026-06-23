export type Property = {
  id: string
  created_at: string
  title: string
  description: string
  type: string
  condition: string | null
  city: string
  neighborhood: string
  address: string
  complement: string | null
  reference_point: string | null
  zip_code: string
  price: number
  area_total: number
  area_built: number | null
  bedrooms: number
  bathrooms: number
  suites: number | null
  other_rooms: number | null
  garage_covered: number | null
  garage_uncovered: number | null
  sun_position: string | null
  year_built: number | null
  profile: string | null
  image_url?: string
}
