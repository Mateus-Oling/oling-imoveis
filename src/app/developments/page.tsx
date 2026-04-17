import React from "react"
import { developments } from "@/data/developments"
import DevelopmentCard from "@/components/development/DevelopmentCard"

export default function Developments() {
  return (
    <main className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 pt-14 pb-14">
        <h1 className="text-3xl font-semibold ">Empreendimentos</h1>
        <p className="text-gray-500 text-sm">
          Confira os empreendimentos disponíveis na região
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-16 ">
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-12">
          {developments.map((development) => (
            <div key={development.id} className="w-full max-w-md">
              <DevelopmentCard {...development} />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
