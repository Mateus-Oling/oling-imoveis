import React from "react"
import Image from "next/image"

type Property = {
  title: string
  type: string
  city: string
  neighborhood: string
  price: number
  area: number
  bedrooms: number
  image_url: string
}

type PropertyCardProps = {
  property: Property
}

export default function PropertyCard({
  property: propertyData,
}: PropertyCardProps) {
  return (
    <div className="flex items-start justify-between rounded-2xl border border-gray-200 bg-white p-4">
      <div className="flex items-center gap-4">
        {propertyData.image_url ? (
          <Image
            src={propertyData.image_url}
            alt={propertyData.title}
            className="h-32 w-52 rounded-xl object-cover"
            width={208}
            height={128}
          />
        ) : (
          <div className="h-32 w-52 rounded-xl bg-gray-200" />
        )}

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="rounded-2xl bg-green-100 px-1 py-1 text-sm font-medium text-green-800">
              {propertyData.type}
            </span>

            <h2 className="text-2xl font-semibold text-gray-900">
              {propertyData.title}
            </h2>
          </div>

          <p className="text-base text-gray-500">
            {propertyData.neighborhood}, {propertyData.city}
          </p>

          <div className="flex items-center gap-12 text-gray-600">
            <span>{propertyData.area} m²</span>

            {(propertyData.type === "casa" ||
              propertyData.type === "apartamento") && (
              <span>{propertyData.bedrooms} quartos</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start gap-4 pt-3">
        <span className="text-xl font-bold text-gray-900">
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(propertyData.price)}
        </span>

        <div className="flex items-start gap-3">
          <button className="rounded-xl border border-gray-300 px-5 py-1.5 font-medium text-gray-700 transition hover:bg-gray-100">
            Editar
          </button>

          <button className="rounded-xl border border-red-200 px-4 py-1.5 font-medium text-red-600 transition hover:bg-red-50">
            Excluir
          </button>
        </div>
      </div>
    </div>
  )
}
