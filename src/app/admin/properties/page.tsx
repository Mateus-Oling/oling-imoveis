import PropertyCard from "@/components/admin/PropertyCard"

export default function Teste() {
  const mockProperties = [
    {
      title: "Casa no Centro",
      type: "casa",
      city: "Ijuí",
      neighborhood: "Centro",
      price: 350000,
      area: 120,
      bedrooms: 3,
      image_url:
        "https://agmxrontqhhuqnprhtsc.supabase.co/storage/v1/object/public/property-images/1779468102490-ChatGPT%20Image%2012%20de%20mar.%20de%202026,%2011_30_47.png",
    },
    {
      title: "Terreno Avenida Brasil",
      type: "terreno",
      city: "Ijuí",
      neighborhood: "Centro",
      price: 180000,
      area: 300,
      bedrooms: 1,
      image_url:
        "https://agmxrontqhhuqnprhtsc.supabase.co/storage/v1/object/public/property-images/1779468102490-ChatGPT%20Image%2012%20de%20mar.%20de%202026,%2011_30_47.png",
    },
    {
      title: "Apartamento Moderno",
      type: "apartamento",
      city: "Ijuí",
      neighborhood: "Pindorama",
      price: 420000,
      area: 90,
      bedrooms: 2,
      image_url:
        "https://agmxrontqhhuqnprhtsc.supabase.co/storage/v1/object/public/property-images/1779468102490-ChatGPT%20Image%2012%20de%20mar.%20de%202026,%2011_30_47.png",
    },
    {
      title: "Terreno no Bairro Universitário",
      type: "terreno",
      city: "Ijuí",
      neighborhood: "Centro",
      price: 1000000,
      area: 500,
      image_url:
        "https://agmxrontqhhuqnprhtsc.supabase.co/storage/v1/object/public/property-images/1779468102490-ChatGPT%20Image%2012%20de%20mar.%20de%202026,%2011_30_47.png",
    },
  ]

  return (
    <div className="mx-auto w-full max-w-[1400px] xl:max-w-[1600px] 2xl:max-w-[1900px] ">
      <header className="mb-8 xl:mb-10 2xl:mb-16 flex items-center justify-between">
        <div>
          <h1 className="text-4xl xl:text-5xl 2xl:text-6xl font-bold">
            Gerenciar Imóveis
          </h1>

          <p className="mt-2 text-base xl:text-lg 2xl:text-xl text-gray-500">
            Visualize, edite ou remova os imóveis cadastrados.
          </p>
        </div>

        <button className="rounded-2xl bg-green-600 px-6 py-3 xl:px-8 xl:py-4 2xl:px-10 2xl:py-5 text-white text-lg xl:text-xl 2xl:text-2xl font-semibold transition hover:bg-green-700">
          + Novo Imóvel
        </button>
      </header>

      <section aria-label="Lista de imóveis">
        {mockProperties.map((propertyItem) => (
          <PropertyCard key={propertyItem.title} property={propertyItem} />
        ))}
      </section>
    </div>
  )
}
