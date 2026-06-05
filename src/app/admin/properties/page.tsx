import PropertyCard from "@/components/admin/PropertyCard"
import Link from "next/link"
import { mockProperties } from "@/data/mock-properties"

export default function Teste() {
  return (
    <div className="mx-auto w-full max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1600px] ">
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
          href={`/admin/properties/new`}
          className="rounded-2xl bg-green-600 px-6 py-3 xl:px-8 xl:py-4 2xl:px-10 2xl:py-5 text-white text-lg xl:text-xl 2xl:text-2xl font-semibold transition hover:bg-green-700"
        >
          + Novo Imóvel
        </Link>
      </header>

      <section aria-label="Lista de imóveis">
        {mockProperties.map((propertyItem) => (
          <PropertyCard key={propertyItem.title} property={propertyItem} />
        ))}
      </section>
    </div>
  )
}
