export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="flex flex-col items-center w-64 xl:w-[320px] 2xl:w-[520px]  bg-gradient-to-b from-green-400 to-green-500 text-white p-6">
        <div className="w-full">
          <h1 className="text-center text-3xl xl:text-4xl 2xl:text-5xl font-bold mt-10">
            Guido Imóveis
          </h1>

          <nav className="flex flex-col gap-8 xl:gap-10 2xl:gap-14 mt-20 xl:mt-24 2xl:mt-46 items-center">
            <button className="w-full rounded-2xl px-6 py-4 xl:px-8 xl:py-5 2xl:px-10 2xl:py-10 text-center text-lg xl:text-xl 2xl:text-3xl 2xl:mb-14 font-semibold transition hover:bg-white/20">
              Gerenciar Imóveis
            </button>

            <button className="w-full rounded-2xl px-6 py-4 xl:px-8 xl:py-5 2xl:px-10 2xl:py-10 text-center text-lg xl:text-xl 2xl:text-3xl 2xl:mb-14 font-semibold transition hover:bg-white/20">
              Gerenciar Empreendimentos
            </button>
          </nav>
        </div>

        <div className="mt-auto">
          <button className="w-full rounded-2xl  px-6 py-4 xl:px-8 xl:py-5 2xl:px-10 2xl:py-6 text-center text-lg xl:text-xl 2xl:text-3xl font-semibold transition hover:bg-white/10">
            Sair
          </button>
        </div>
      </aside>

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
