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
    ),
    property_feature_relations (
      property_features (
        id,
        name,
        category
      )
    )
  `,
      )
      .eq("id", id)
      .single()

    if (error || !property) {
      notFound()
    }

    const propertyImages = property.property_images ?? []

    const coverImage =
      propertyImages.find((image) => image.is_cover)?.image_url ?? ""

    const galleryImages = propertyImages.filter((image) => !image.is_cover)

    const features =
      property.property_feature_relations?.map(
        (relation) => relation.property_features,
      ) ?? []

    const groupedFeatures = features.reduce(
      (acc, feature) => {
        if (!acc[feature.category]) {
          acc[feature.category] = []
        }

        acc[feature.category].push(feature)

        return acc
      },
      {} as Record<string, typeof features>,
    )

    const isHouse = property.type.toLowerCase() === "casa"

    const visibleCategories = isHouse
      ? ["imovel", "area_externa", "acabamento"]
      : ["imovel", "condominio", "acabamento"]

    const categoryTitles = {
      imovel: isHouse ? "Características da casa" : "Características do imóvel",

      area_externa: "Área externa",

      condominio: "Características do condomínio",

      acabamento: "Acabamentos",
    }

    const garageSpaces = property.garage_covered + property.garage_uncovered

    const formattedPrice = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(property.price)

    return (
      <main className="max-w-7xl mx-auto relative px-4 py-10 space-y-10">
        <section className="grid grid-cols-4 gap-4">
          <div className="col-span-3 relative h-[390px] rounded-xl overflow-hidden">
            <Image
              src={coverImage}
              alt={property.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-4 ">
            {galleryImages.slice(0, 3).map((image) => (
              <div
                key={image.image_url}
                className="relative h-[120px] rounded-lg overflow-hidden"
              >
                <Image
                  src={image.image_url}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
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

        <div className="absolute top-[500px] right-4 w-[320px] bg-white shadow-md rounded-xl p-6 space-y-4">
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

        <section className="max-w-4xl mt-12">
          {visibleCategories.map((category) => {
            const categoryFeatures = groupedFeatures[category]

            if (!categoryFeatures?.length) {
              return null
            }

            return (
              <div key={category} className="mb-14">
                <h2 className="text-2xl font-semibold mb-4">
                  {categoryTitles[category]}
                </h2>

                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-2">
                  {categoryFeatures.map((feature) => (
                    <li key={feature.id}>✔ {feature.name}</li>
                  ))}
                </ul>
              </div>
            )
          })}
        </section>
      </main>
    )
  } catch (error) {
    console.error(error)
    notFound()
  }
}
