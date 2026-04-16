import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8 flex items-start justify-between gap-8">
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="Oling Imóveis"
            width={140}
            height={40}
            className="object-contain"
          />
        </div>

        <div className="flex flex-col items-center justify-center text-center text-sm leading-7">
          <span className="text-sm font-bold uppercase mb-2">IMÓVEIS</span>

          <nav className="flex gap-15 text-sm">
            <Link href="/properties">Imóveis</Link>
            <Link href="#">Lançamentos</Link>
          </nav>
        </div>

        <div className="flex flex-col items-center justify-center text-center text-sm leading-7">
          <span className="text-sm font-bold uppercase mb-2">Contato</span>

          <span>(55) 98137-1849</span>
          <span className="opacity-80">guiodooling@hotmail.com</span>
        </div>

        <div className="flex flex-col items-center justify-center text-center text-sm leading-7">
          <span className="text-sm font-bold uppercase mb-2">Localização</span>

          <span>Ijuí - RS</span>
          <span className="opacity-80">Atendimento sob agendamento</span>
        </div>
      </div>

      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-center text-xs text-center gap-4 flex-wrap">
          <span>© 2026 Oling Imóveis</span>
          <span>CRECI 11.111-A</span>
        </div>
      </div>
    </footer>
  )
}
