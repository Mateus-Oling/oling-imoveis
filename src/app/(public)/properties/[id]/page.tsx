import Image from "next/image"
import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

type Props = {
  params: Promise<{
    id: string
  }>
}

export default async function PropertyDetailsPage({ params }: Props) {
  const { id } = await params

  try {
    const supabase = await createClient()

    const { data: property, error } = await supabase
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
      .eq("id", id)
      .single()

    if (error || !property) {
      notFound()
    }

    const coverImage =
      property.property_images?.find((image) => image.is_cover)?.image_url ?? ""

    const garageSpaces = property.garage_covered + property.garage_uncovered

    const formattedPrice = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(property.price)

    return (
      <main className="max-w-7xl mx-auto px-4 py-6 relative space-y-10">
        <section className="grid grid-cols-4 gap-4">
          <div className="col-span-3 relative h-[400px] rounded-xl overflow-hidden">
            <Image
              src={coverImage}
              alt={property.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="relative h-[120px] rounded-lg overflow-hidden">
              <Image
                src={coverImage}
                alt={property.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="relative h-[120px] rounded-lg overflow-hidden">
              <Image
                src={coverImage}
                alt={property.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="relative h-[120px] rounded-lg overflow-hidden">
              <Image
                src={coverImage}
                alt={property.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section className="mt-6 max-w-4xl space-y-6">
          <div>
            <h1 className="text-3xl font-semibold">
              {property.type} em {property.neighborhood}
            </h1>

            <p className="text-gray-500 mt-1">{property.address}</p>
          </div>

          <div className="flex items-center gap-8">
            <span className="bg-green-700 text-white px-5 py-2 rounded-md font-semibold">
              {formattedPrice}
            </span>

            <span>{property.area_total} m²</span>
            <span>{property.bedrooms} quartos</span>
            <span>{property.bathrooms} banheiros</span>
            <span>{garageSpaces} vagas</span>
          </div>
        </section>

        <div className="absolute top-[440px] right-4 w-[350px] bg-white shadow-md rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-semibold">Entrar em contato</h3>

          <input
            className="w-full border rounded-md px-3 py-2"
            placeholder="Nome"
          />

          <input
            className="w-full border rounded-md px-3 py-2"
            placeholder="E-mail"
          />

          <textarea
            className="w-full border rounded-md px-3 py-2 h-24"
            placeholder="Mensagem"
          />

          <button className="w-full bg-green-700 text-white py-2 rounded-md">
            Enviar
          </button>
        </div>

        <section className="max-w-4xl mt-10">
          <h2 className="text-2xl font-semibold mb-3">Descrição</h2>

          <p className="text-gray-600 leading-relaxed">
            {property.description}
          </p>
        </section>
      </main>
    )
  } catch (error) {
    console.error(error)
    notFound()
  }
}
