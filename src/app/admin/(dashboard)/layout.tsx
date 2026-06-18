import AdminSidebar from "@/components/admin/AdminSidebar"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  console.log("USER", user)

  if (!user) {
    redirect("/admin/login")
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 px-4 py-4 lg:px-8 lg:py-8 xl:px-10 xl:py-10 2xl:px-16 2xl:py-12">
        <div className="fixed right-4 top-4 block bg-red-500 p-2 text-white lg:hidden">
          MOBILE
        </div>

        <div className="fixed right-4 top-4 hidden bg-blue-500 p-2 text-white lg:block xl:hidden">
          LG
        </div>

        <div className="fixed right-4 top-4 hidden bg-green-500 p-2 text-white xl:block 2xl:hidden">
          XL
        </div>

        <div className="fixed right-4 top-4 hidden bg-purple-500 p-2 text-white 2xl:block">
          2XL
        </div>

        {children}
      </main>
    </div>
  )
}
