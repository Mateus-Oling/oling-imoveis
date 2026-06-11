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

    const { error } = await supabase
      .from("properties")
      .delete()
      .eq("id", propertyId)

    if (error) {
      console.error(error)
      alert("Erro ao excluir imóvel.")
      return
    }

    alert("Imóvel excluído com sucesso!")

    window.location.reload()
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
