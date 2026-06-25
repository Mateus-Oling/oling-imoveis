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
      <main className="mx-auto w-full max-w-[1850px] px-8 py-10 xl:px-10 2xl:px-12">
        <section className="grid grid-cols-4 gap-6 xl:gap-8">
          <div className="relative col-span-3 h-[560px] overflow-hidden rounded-2xl">
            <Image
              src={coverImage}
              alt={property.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex h-[560px] flex-col gap-4">
            {galleryImages.slice(0, 3).map((image) => (
              <div
                key={image.image_url}
                className="relative flex-1 overflow-hidden rounded-xl"
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

        <div className="mt-12 grid grid-cols-[minmax(0,1fr)_380px] gap-14">
          <div>
            <section className="space-y-8">
              <div>
                <h1 className="text-4xl font-semibold">{property.title}</h1>

                <p className="mt-2 text-lg text-gray-500">{property.address}</p>
              </div>

              <div className="flex flex-wrap items-center gap-8 text-lg">
                <span className="rounded-md bg-green-700 px-5 py-2 font-semibold text-white">
                  {formattedPrice}
                </span>

                {property.type?.toLowerCase() !== "terreno" && (
                  <>
                    <span>{property.area_total} m²</span>
                    <span>{property.bedrooms} quartos</span>
                    <span>{property.bathrooms} banheiros</span>
                    <span>{garageSpaces} vagas</span>
                  </>
                )}
              </div>
            </section>

            <section className="mt-14">
              <h2 className="mb-4 text-2xl font-semibold">Descrição</h2>

              <p className="leading-relaxed text-gray-600">
                {property.description}
              </p>
            </section>

            <section className="mt-14">
              {visibleCategories.map((category) => {
                const categoryFeatures = groupedFeatures[category]

                if (!categoryFeatures?.length) {
                  return null
                }

                return (
                  <div key={category} className="mb-14">
                    <h2 className="mb-5 text-2xl font-semibold">
                      {categoryTitles[category]}
                    </h2>

                    <ul className="grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-2 lg:grid-cols-3">
                      {categoryFeatures.map((feature) => (
                        <li key={feature.id}>✔ {feature.name}</li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </section>
          </div>

          <aside className="sticky top-8 h-fit">
            <div className="rounded-2xl bg-white p-8 shadow-md">
              <h3 className="mb-6 text-xl font-semibold">Entrar em contato</h3>

              <div className="space-y-4">
                <input
                  className="w-full rounded-lg border px-4 py-3"
                  placeholder="Nome"
                />

                <input
                  className="w-full rounded-lg border px-4 py-3"
                  placeholder="E-mail"
                />

                <textarea
                  className="h-32 w-full rounded-lg border px-4 py-3"
                  placeholder="Mensagem"
                />

                <button className="w-full rounded-lg bg-green-700 py-3 font-medium text-white">
                  Enviar
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>
    )
  } catch (error) {
    console.error(error)
    notFound()
  }
}
