import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Property } from "@/types/property"
import { supabase } from "@/lib/supabase"
import DeleteButton from "@/components/admin/DeleteButton"

type PropertyCardProps = {
  property: Property
}

export default function PropertyCard({
  property: propertyData,
}: PropertyCardProps) {
  return (
    <div className="mb-8 flex items-start justify-between rounded-3xl bg-white p-4 shadow-sm lg:p-5 xl:mb-10 xl:p-8 2xl:mb-12">
      <div className="flex items-center gap-4 lg:gap-6 xl:gap-5">
        {propertyData.image_url ? (
          <Image
            src={propertyData.image_url}
            alt={propertyData.title}
            width={400}
            height={260}
            className="h-20 w-36 rounded-3xl object-cover lg:h-32 lg:w-56 xl:h-40 xl:w-72  2xl:h-50 2xl:w-360px"
          />
        ) : (
          <div className="h-20 w-36 rounded-3xl bg-gray-200 lg:h-32 lg:w-56 xl:h-42 xl:w-72 2xl:h-52 2xl:w-440px" />
        )}

        <div className="flex min-h-96px flex-col justify-between lg:min-h-128px xl:min-h-160px 2xl:min-h-200px ">
          <div className="flex items-center gap-3 lg:gap-4 xl:gap-5">
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 lg:px-4 lg:py-1.5 lg:text-sm xl:px-5 xl:py-2 xl:text-base">
              {propertyData.type}
            </span>

            <h2 className="text-sm font-semibold text-gray-900 lg:text-xl xl:text-2xl 2xl:text-3xl">
              {propertyData.title}
            </h2>
          </div>

          <p className="text-base text-gray-500 lg:text-lg xl:text-xl 2xl:text-2xl">
            {propertyData.neighborhood}, {propertyData.city}
          </p>

          <div className="flex items-center gap-4 text-base text-gray-600 lg:gap-6 lg:text-lg xl:gap-8 xl:text-xl 2xl:gap-12 2xl:text-2xl">
            <span>{propertyData.area_total} m²</span>

            {(propertyData.type === "casa" ||
              propertyData.type === "apartamento") && (
              <span>{propertyData.bedrooms} quartos</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start gap-3 lg:gap-4 xl:gap-8 2xl:gap-10">
        <span className="text-base font-bold text-gray-900 lg:text-base xl:text-xl  xl:mt-2.5 2xl:text-2xl ">
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(propertyData.price)}
        </span>

        <div className="flex gap-2 lg:gap-3 xl:gap-4">
          <Link
            href={`/admin/properties/${propertyData.id}/edit`}
            className="rounded-xl border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 lg:px-5 lg:py-2.5 lg:text-base xl:px-6 xl:py-3 xl:text-lg 2xl:text-2xl"
          >
            Editar
          </Link>

          <DeleteButton propertyId={propertyData.id}>Excluir</DeleteButton>
        </div>
      </div>
    </div>
  )
}
