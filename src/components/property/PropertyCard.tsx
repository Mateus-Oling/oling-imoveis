import Link from "next/link"

type PropertyCardProps = {
  id: number
  image: string
  type: string
  neighborhood: string
  address: string
  area: number
  bedrooms: number
  bathrooms: number
  garageSpaces: number
  price: string
}

export default function PropertyCard({
  id,
  image,
  type,
  neighborhood,
  address,
  area,
  bedrooms,
  bathrooms,
  garageSpaces,
  price,
}: PropertyCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
      <img src={image} alt="Imóvel" />

      <div className="p-4">
        <p className="text-sm text-gray-500">{type}</p>

        <h2 className="text-lg font-semibold">{neighborhood}</h2>

        <p className="text-sm text-gray-500 mb-3">{address}</p>

        <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-4">
          <span>{area} m²</span>
          <span>{bedrooms} quartos</span>
          <span>{bathrooms} banheiros</span>
          <span>{garageSpaces} vagas</span>
        </div>

        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-500">{price}</h3>

          <Link
            href={`/properties/${id}`}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Ver imóvel
          </Link>
        </div>
      </div>
    </div>
  )
}
