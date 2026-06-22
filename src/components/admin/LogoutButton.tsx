"use client"

import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"

export default function LogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    await supabase.auth.signOut()

    router.push("/admin/login")
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full rounded-2xl px-6 py-4 xl:px-8 xl:py-5 2xl:px-10 2xl:py-6 text-center text-lg xl:text-xl 2xl:text-3xl font-semibold transition hover:bg-white/10"
    >
      Sair
    </button>
  )
}
