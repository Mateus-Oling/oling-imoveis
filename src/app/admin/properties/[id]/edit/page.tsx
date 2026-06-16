import PropertyForm from "@/components/admin/PropertyForm"
import { supabase } from "@/lib/supabase"

type Props = {
  params: {
    id: string
  }
}

export default async function EditPropertyPage({ params }: Props) {
  const resolvedParams = await params
  const { data: propertyBeingEdited } = await supabase
    .from("properties")
    .select("*")
    .eq("id", resolvedParams.id)
    .single()

  const { data: propertyFeatures } = await supabase
    .from("property_feature_relations")
    .select("feature_id")
    .eq("property_id", resolvedParams.id)

  const { data: propertyImages, error: propertyImagesError } = await supabase
    .from("property_images")
    .select("*")
    .eq("property_id", resolvedParams.id)

  console.log(JSON.stringify(propertyImages, null, 2))

  const selectedFeaturesIds =
    propertyFeatures?.map((currentFeature) => currentFeature.feature_id) ?? []

  return (
    <>
      <PropertyForm
        initialData={propertyBeingEdited}
        initialFeatures={selectedFeaturesIds}
        initialImages={propertyImages ?? []}
      />
    </>
  )
}
