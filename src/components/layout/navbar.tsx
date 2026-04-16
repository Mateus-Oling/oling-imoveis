import Link from "next/link"

export default function Navbar() {
  return (
    <header className="bg-green-900 text-white">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg">
          Oling Imóveis
        </Link>

        <nav className="flex gap-6 text-sm ">
          <Link href="/" className="hover:text-green-600 transition-colors">
            Início
          </Link>
          <Link
            href="/properties"
            className="hover:text-green-600 transition-colors"
          >
            Imóveis
          </Link>
          <Link
            href="/empreendimentos"
            className="hover:text-green-600 transition-colors"
          >
            Empreendimentos
          </Link>
          <Link
            href="/about"
            className="hover:text-green-600 transition-colors"
          >
            Sobre
          </Link>
        </nav>
      </div>
    </header>
  )
}
