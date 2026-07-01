import PropertyCard from "@/components/admin/PropertyCard"
import Link from "next/link"
import { supabase } from "@/lib/supabase/client"
import { createPagination, getTotalPages } from "@/lib/pagination"
import Pagination from "@/components/common/Pagination"

type Props = {
  searchParams: Promise<{
    page?: string
  }>
}

export default async function PropertiesPage({ searchParams }: Props) {
  const { page } = await searchParams

  const PAGE_SIZE = 4

  const pagination = createPagination({
    page,
    pageSize: PAGE_SIZE,
  })

  const {
    data: propertiesFromDatabase,
    count,
    error,
  } = await supabase
    .from("properties")
    .select(
      `
      *,
      property_images (
        image_url,
        is_cover
      )
      `,
      {
        count: "exact",
      },
    )
    .range(pagination.from, pagination.to)

  if (error) {
    console.error(error)

    return <p>Erro ao carregar imóveis.</p>
  }

  const totalPages = getTotalPages(count ?? 0, pagination.pageSize)

  const properties =
    propertiesFromDatabase?.map((property) => ({
      ...property,
      image_url: property.property_images?.find((image) => image.is_cover)
        ?.image_url,
    })) ?? []

  return (
    <div className="mx-auto w-full max-w-1200px xl:max-w-1400px 2xl:max-w-1600px">
      <header className="mb-8 xl:mb-10 2xl:mb-16 flex items-center justify-between">
        <div>
          <h1 className="text-3xl xl:text-4xl 2xl:text-5xl font-bold">
            Gerenciar Imóveis
          </h1>

          <p className="mt-2 text-sm xl:text-lg 2xl:text-xl text-gray-500">
            Visualize, edite ou remova os imóveis cadastrados.
          </p>
        </div>

        <Link
          href="/admin/properties/new"
          className="rounded-2xl bg-green-600 px-6 py-3 xl:px-8 xl:py-4 2xl:px-10 2xl:py-5 text-white text-lg xl:text-xl 2xl:text-2xl font-semibold transition hover:bg-green-700"
        >
          + Novo Imóvel
        </Link>
      </header>

      <section aria-label="Lista de imóveis">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}

        <Pagination
          currentPage={pagination.currentPage}
          totalPages={totalPages}
          basePath="/admin/properties"
        />
      </section>
    </div>
  )
}
