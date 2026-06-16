"use client"

import { supabase } from "@/lib/supabase"

type DeleteButtonProps = {
  propertyId: string
}

export default function DeleteButton({ propertyId }: DeleteButtonProps) {
  async function handleDelete() {
    const confirmed = window.confirm(
      "Tem certeza que deseja excluir este imóvel?",
    )

    if (!confirmed) {
      return
    }

    try {
      const { data: images, error: imagesError } = await supabase
        .from("property_images")
        .select("image_path")
        .eq("property_id", propertyId)

      if (imagesError) {
        throw imagesError
      }

      const imagePaths = images?.map((image) => image.image_path) ?? []

      if (imagePaths.length > 0) {
        const { error: storageError } = await supabase.storage
          .from("property-images")
          .remove(imagePaths)

        if (storageError) {
          throw storageError
        }
      }

      const { error } = await supabase
        .from("properties")
        .delete()
        .eq("id", propertyId)

      if (error) {
        throw error
      }

      alert("Imóvel excluído com sucesso!")

      window.location.reload()
    } catch (error) {
      console.error(error)

      alert("Erro ao excluir imóvel.")
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded-xl border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50 lg:px-5 lg:py-2.5 lg:text-base xl:px-6 xl:py-3 xl:text-lg 2xl:text-2xl"
    >
      Excluir
    </button>
  )
}
