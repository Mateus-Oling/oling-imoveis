import FeatureSelector from "@/components/FeatureSelector"
import { supabase } from "@/lib/supabase"
import PropertyCard from "@/components/admin/PropertyCard"

export default async function Teste() {
  const mockProperty = {
    title: "Casa no Centro",
    type: "casa",
    city: "Ijuí",
    neighborhood: "Centro",
    price: 350000,
    area: 120,
    bedrooms: 3,
    bathrooms: 2,
    image_url:
      "https://agmxrontqhhuqnprhtsc.supabase.co/storage/v1/object/public/property-images/1779468102490-ChatGPT%20Image%2012%20de%20mar.%20de%202026,%2011_30_47.png",
  }

  return (
    <>
      <main className="p-10 bg-gray-100 min-h-screen">
        <PropertyCard property={mockProperty} />
      </main>
    </>
  )
}
