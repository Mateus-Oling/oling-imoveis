import PropertyCard from "@/components/property/PropertyCard"
import { createClient } from "@/lib/supabase/server"

export default async function PropertiesPage() {
  const supabase = await createClient()

  const { data: propertiesFromDatabase, error } = await supabase.from(
    "properties",
  ).select(`
      *,
      property_images (
        image_url,
        is_cover
      )
    `)

  if (error) {
    console.error(error)

    return (
      <main>
        <section className="py-18 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <p>Erro ao carregar imóveis.</p>
          </div>
        </section>
      </main>
    )
  }

  const properties =
    propertiesFromDatabase?.map((property) => ({
      id: property.id,

      image:
        property.property_images?.find((image) => image.is_cover)?.image_url ??
        "",

      type: property.type,

      neighborhood: property.neighborhood,

      address: property.address,

      area: property.area_total,

      bedrooms: property.bedrooms,

      bathrooms: property.bathrooms,

      garageSpaces: property.garage_covered + property.garage_uncovered,

      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(property.price),
    })) ?? []

  console.log(properties)
  console.log(properties[0].image)
  return (
    <main>
      <section className="py-18 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Imóveis à venda</h1>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {properties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
