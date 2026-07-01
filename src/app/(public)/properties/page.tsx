import PropertyCard from "@/components/property/PropertyCard"
import mapPropertyToCard from "@/lib/propertyMapper"
import { createClient } from "@/lib/supabase/server"

export default async function PropertiesPage() {
  try {
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
      throw error
    }

    const properties =
      propertiesFromDatabase?.map((property) => ({ mapPropertyToCard })) ?? []

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
  } catch (error) {
    console.error("Erro ao carregar imóveis:", error)

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
}
