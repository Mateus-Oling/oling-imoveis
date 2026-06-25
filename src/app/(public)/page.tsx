import { createClient } from "@/lib/supabase/server"
import PropertyCard from "@/components/property/PropertyCard"
import FeaturedDevelopments from "@/components/home/FeaturedDevelopments"
import Link from "next/link"
import Image from "next/image"

export default async function Home() {
  const supabase = await createClient()

  const { data: propertiesFromDatabase, error } = await supabase
    .from("properties")
    .select(
      `
    *,
    property_images (
      image_url,
      is_cover
    )
  `,
    )
    .limit(6)

  const properties =
    propertiesFromDatabase?.map((property) => ({
      id: property.id,
      image:
        property.property_images.find((image) => image.is_cover)?.image_url ??
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

  return (
    <main className="bg-gray-50">
      <section className="relative h-[60vh] min-h-[400px]">
        <Image
          src="/hero.jpg"
          alt="Cidade"
          fill
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-3xl md:text-5xl font-semibold mb-6">
            Encontre seu imóvel em Ijuí
          </h1>

          <div className="w-full max-w-xl mt-6">
            <div className="max-w-2xl mt-6">
              <div className="flex  rounded-xl shadow-xl overflow-hidden">
                <input
                  type="search"
                  placeholder="Busque por bairro ou tipo de imóvel"
                  className="flex-1 px-5 py-4 outline-none text-gray-800"
                />

                <button className="bg-green-700 text-white px-6 font-medium hover:bg-green-800 transition rounded-r-xl">
                  Buscar
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Imóveis à venda</h2>

          <Link href="/properties" className="font-medium hover:underline">
            Ver todos
          </Link>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        </div>
      </section>

      <FeaturedDevelopments />
    </main>
  )
}
