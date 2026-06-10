import PropertyForm from "@/components/admin/PropertyForm"
import { supabase } from "@/lib/supabase"

type Props = {
  params: {
    id: string
  }
}

export default async function EditPropertyPage({ params }: Props) {
  // const { data: propertyToEdit, error } = await supabase
  //   .from("properties")
  //   .select("*")

  const resolvedParams = await params
  const { data: propertyBeingEdited } = await supabase
    .from("properties")
    .select("*")
    .eq("id", resolvedParams.id)
    .single()

  console.log(propertyBeingEdited)

  return (
    <>
      <PropertyForm initialData={propertyBeingEdited} />
    </>
  )
}
