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
  ]

  return (
    <div className="mx-auto w-full max-w-[1400px] xl:max-w-[1600px] 2xl:max-w-[1900px]">
      {mockProperties.map((propertyItem) => (
        <PropertyCard key={propertyItem.title} property={propertyItem} />
      ))}
    </div>
  )
}
