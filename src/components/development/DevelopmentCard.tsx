import Link from "next/link"
import Image from "next/image"

interface DevelopmentCardProps {
  id: number
  title: string
  address: string
  image: string
  type: string
  area: number
}

export default function DevelopmentCard({
  id,
  title,
  address,
  image,
  type,
  area,
}: DevelopmentCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="relative h-52 w-full">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      <div className="p-4 flex flex-col gap-2">
        <span className="text-sm text-gray-400">{type}</span>

        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>

        <p className="text-sm text-gray-500">{address}</p>

        <p className="text-sm text-gray-500">{area} m²</p>

        <div className="mt-4">
          <Link
            href={`/developments/${id}`}
            className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition"
          >
            Saiba mais
          </Link>
        </div>
      </div>
    </div>
  )
}
