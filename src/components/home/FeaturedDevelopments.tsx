import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import { developments } from "@/data/developments"
import Link from "next/link"

export default function FeaturedDevelopments() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-semibold mb-6">
        Empreendimentos em destaque
      </h2>

      <Swiper
        modules={[Navigation]}
        navigation
        className="h-[320px] rounded-2xl"
      >
        {developments.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-[320px] rounded-2xl overflow-hidden">
              <Image
                src={item.image}
                alt="Empreendimento"
                fill
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black-900/80 to-black-700/40" />

              <div className="relative z-10 h-full flex items-center px-8 text-white">
                <div className="max-w-md">
                  <span className="inline-block bg-green-700 px-3 py-1 rounded-full text-sm mb-4">
                    Lançamento
                  </span>

                  <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>

                  <p className="text-sm mb-4 text-gray-200">
                    {item.description}
                  </p>

                  <ul className="text-sm space-y-1 mb-6">
                    <li>Área de {item.area}m²</li>
                  </ul>

                  <Link
                    href={`/developments/${item.id}`}
                    className="bg-green-700 px-5 py-2 rounded-lg font-medium hover:bg-green-800 transition"
                  >
                    Saiba mais
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
