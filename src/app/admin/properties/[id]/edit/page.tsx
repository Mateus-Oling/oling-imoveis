import PropertyForm from "@/components/admin/PropertyForm"
import { mockProperties } from "@/data/mock-properties"

type Props = {
  params: {
    id: number
  }
}

export default async function EditPropertyPage({ params }: Props) {
  const resolvedParams = await params
  const propertyBeingEdited = mockProperties.find(
    (currentProperty) => currentProperty.id === Number(resolvedParams.id),
  )
  console.log(propertyBeingEdited)

  return (
    <>
      <PropertyForm initialData={propertyBeingEdited} />
    </>
  )
}
