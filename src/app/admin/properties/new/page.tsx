"use client"

import { useForm } from "react-hook-form"

type FormData = {
  title: string
  type: string
  address: string
  complement: string
  reference_point: string
  neighborhood: string
  city: string
  zip_code: string
  condition: string

  area_total: number
  area_built: number
  price: number

  bedrooms: number
  suites: number
  bathrooms: number
  other_rooms: number
  garage_covered: number
  garage_uncovered: number
  sun_position: string
  year_built: number

  description: string
}

export default function NewPropertyPage() {
  const { register, handleSubmit } = useForm<FormData>()

  function onSubmit(data: FormData) {
    console.log(data)
  }

  return (
    <main className="p-10">
      <h1 className="text-2xl font-semibold mb-6">Cadastrar Imóvel</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Informações Básicas</h3>

          <div>
            <label>Título do imóvel *</label>
            <input
              {...register("title")}
              placeholder="Ex: Casa moderna no centro"
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label>Tipo do imóvel *</label>
            <select {...register("type")} className="border p-2 w-full">
              <option value="">Selecione o tipo</option>
              <option value="casa">Casa</option>
              <option value="apartamento">Apartamento</option>
              <option value="terreno">Terreno</option>
            </select>
          </div>

          <div>
            <label>Endereço *</label>
            <input
              {...register("address")}
              placeholder="Rua Exemplo, 123"
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label>Complemento</label>
            <input
              {...register("complement")}
              placeholder="Apto 302, Bloco B"
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label>Ponto de referência</label>
            <input
              {...register("reference_point")}
              placeholder="Próximo ao mercado X"
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label>Bairro *</label>
            <input
              {...register("neighborhood")}
              placeholder="Centro"
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label>Cidade *</label>
            <input
              {...register("city")}
              placeholder="Ijui"
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label>CEP *</label>
            <input
              {...register("zip_code")}
              placeholder="98700-000"
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label>Condição do imóvel *</label>
            <select {...register("condition")} className="border p-2 w-full">
              <option value="">Selecione a condição</option>
              <option value="pessimo">Péssimo</option>
              <option value="ruim">Ruim</option>
              <option value="bom">Bom</option>
              <option value="novo">Novo</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Dimensões e Valores</h3>

          <div>
            <label>Área total (m²) *</label>
            <input
              type="number"
              {...register("area_total", { valueAsNumber: true })}
              placeholder="Ex: 300"
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label>Área construída (m²)</label>
            <input
              type="number"
              {...register("area_built", { valueAsNumber: true })}
              placeholder="Ex: 180"
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label>Preço *</label>
            <input
              type="number"
              {...register("price", { valueAsNumber: true })}
              placeholder="Ex: 450000"
              className="border p-2 w-full"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Ambientes</h3>

          <div>
            <label>Quartos</label>
            <input
              type="number"
              {...register("bedrooms", { valueAsNumber: true })}
              placeholder="Ex: 3"
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label>Suítes</label>
            <input
              type="number"
              {...register("suites", { valueAsNumber: true })}
              placeholder="Ex: 1"
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label>Banheiros</label>
            <input
              type="number"
              {...register("bathrooms", { valueAsNumber: true })}
              placeholder="Ex: 2"
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label>Outros cômodos</label>
            <input
              type="number"
              {...register("other_rooms", { valueAsNumber: true })}
              placeholder="Ex: 2"
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label>Vagas cobertas</label>
            <input
              type="number"
              {...register("garage_covered", { valueAsNumber: true })}
              placeholder="Ex: 1"
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label>Vagas descobertas</label>
            <input
              type="number"
              {...register("garage_uncovered", { valueAsNumber: true })}
              placeholder="Ex: 1"
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label>Posição do sol</label>
            <select {...register("sun_position")} className="border p-2 w-full">
              <option value="">Selecione a posição</option>
              <option value="norte">Norte</option>
              <option value="sul">Sul</option>
              <option value="leste">Leste</option>
              <option value="oeste">Oeste</option>
            </select>
          </div>

          <div>
            <label>Ano de construção</label>
            <input
              type="number"
              {...register("year_built", { valueAsNumber: true })}
              placeholder="Ex: 2015"
              className="border p-2 w-full"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Descrição</h3>

          <div>
            <label>Descrição do imóvel</label>
            <textarea
              {...register("description")}
              placeholder="Descreva o imóvel, diferenciais, localização, etc..."
              className="border p-2 w-full min-h-[120px]"
            />
          </div>
        </div>

        <button type="submit" className="bg-black text-white px-4 py-2">
          Salvar
        </button>
      </form>
    </main>
  )
}
