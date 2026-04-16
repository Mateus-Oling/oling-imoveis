import Link from "next/link"

export default function AboutPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-12 space-y-16">
      <section className="grid grid-cols-2 items-center gap-10">
        <div className="space-y-6">
          <h1 className="text-5xl font-bold leading-tight">
            Sobre a <span className="text-green-700">Oling Imóveis</span>
          </h1>

          <p className="text-gray-600 text-lg">
            Conectamos pessoas às melhores oportunidades no mercado imobiliário
            de Ijuí e região.
          </p>

          <div className="flex gap-6 mt-4 text-sm text-gray-600">
            <span>Segurança</span>
            <span>Transparência</span>
            <span>Atendimento próximo</span>
          </div>
        </div>

        <div className="h-[400px] rounded-xl overflow-hidden bg-gray-200" />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-8">O que nos guia</h2>

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white shadow-sm hover:shadow-md transition rounded-xl p-6 space-y-3">
            <h3 className="font-semibold text-lg">Atendimento personalizado</h3>
            <p className="text-gray-600 text-sm">
              Acompanhamos em todas as etapas.
            </p>
          </div>

          <div className="bg-white shadow-sm hover:shadow-md transition rounded-xl p-6 space-y-3">
            <h3 className="font-semibold text-lg">Conhecimento local</h3>
            <p className="text-gray-600 text-sm">
              Sabemos os bairros e oportunidades.
            </p>
          </div>

          <div className="bg-white shadow-sm hover:shadow-md transition rounded-xl p-6 space-y-3">
            <h3 className="font-semibold text-lg">Transparência</h3>
            <p className="text-gray-600 text-sm">
              Clareza e segurança nas negociações.
            </p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-10 items-center">
        <div className="flex items-start gap-4">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-300 flex-shrink-0" />

          <div className="space-y-2">
            <span className="text-sm text-gray-500 uppercase">Sobre</span>

            <h2 className="text-2xl font-semibold">Guido Oling</h2>

            <p className="text-gray-600">
              Corretor de imóveis atuando em Ijuí e região, com foco em um
              atendimento direto e eficiente para compra e venda de imóveis.
            </p>

            <span className="text-sm text-gray-500">CRECI XXXXX</span>
          </div>
        </div>

        <div className="bg-gray-100 flex gap-8 rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-semibold">
            Pronto para encontrar seu imóvel?
          </h3>

          <Link
            href="/properties"
            className="inline-block bg-green-700 text-white px-6 py-3 rounded-md hover:bg-green-800 transition"
          >
            Ver imóveis disponíveis
          </Link>
        </div>
      </section>
    </main>
  )
}
