import Link from "next/link"
import LogoutButton from "./LogoutButton"

export default function AdminSidebar() {
  return (
    <aside className="flex flex-col items-center w-64 xl:w-[320px] 2xl:w-[520px]  bg-gradient-to-b from-green-400 to-green-500 text-white p-6">
      <div className="w-full">
        <h1 className="text-center text-3xl xl:text-4xl 2xl:text-5xl font-bold mt-10">
          Guido Imóveis
        </h1>

        <nav className="flex flex-col gap-6 xl:gap-10 2xl:gap-14 mt-20 xl:mt-24 2xl:mt-40 items-center">
          <Link
            href="/admin/properties"
            className="w-full rounded-2xl px-6 py-4 xl:px-8 xl:py-5 2xl:px-10 2xl:py-10 text-center text-lg xl:text-xl 2xl:text-3xl 2xl:mb-8 font-semibold transition hover:bg-white/20"
          >
            Gerenciar Imóveis
          </Link>

          <Link
            href="/admin/developments"
            className="w-full rounded-2xl px-6 py-4 xl:px-8 xl:py-5 2xl:px-10 2xl:py-10 text-center text-lg xl:text-xl 2xl:text-3xl 2xl:mb-14 font-semibold transition hover:bg-white/20"
          >
            Gerenciar Empreendimentos
          </Link>
        </nav>
      </div>

      <div className="mt-auto">
        <LogoutButton clasName="mt-auto w-full" />
      </div>
    </aside>
  )
}
