import Teste from "../../../properties/page"
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
      <h1>Editar imóvel</h1>
      <p>Imóvel n° {resolvedParams.id}</p>
      <p>{propertyBeingEdited?.title}</p>
    </>
  )
}
