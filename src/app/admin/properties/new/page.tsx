"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { propertySchema } from "@/schemas/propertySchema"
import { z } from "zod"
import FormField from "@/components/form/FormField"
import { supabase } from "@/lib/supabase"

type FormData = z.infer<typeof propertySchema>

export default function NewPropertyPage() {
  const [feedback, setFeedback] = useState<{
    type: "success" | "error" | null
    message: string
  }>({
    type: null,
    message: "",
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {},
  })

  async function onSubmit(data: FormData) {
    try {
      setFeedback({ type: null, message: "" })

      const { error } = await supabase.from("properties").insert(data)

      if (error) {
        throw error
      }

      setFeedback({
        type: "success",
        message: "Imóvel cadastrado com sucesso!",
      })
      reset()
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch (err) {
      console.error(err)

      setFeedback({
        type: "error",
        message: "Erro ao salvar imóvel.",
      })
    }
  }

  return (
    <main className="p-10 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Cadastrar Imóvel</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Informações Básicas</h3>

          <FormField
            label="Título do imóvel"
            name="title"
            register={register}
            error={errors.title}
            placeholder="Ex: Casa moderna no centro"
          />

          <div>
            <label>Tipo do imóvel *</label>
            <select
              {...register("type")}
              className={`w-full border rounded-md px-3 py-2 text-sm ${
                errors.type ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Selecione o tipo</option>
              <option value="casa">Casa</option>
              <option value="apartamento">Apartamento</option>
              <option value="terreno">Terreno</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
            )}
          </div>

          <FormField
            label="Endereço"
            name="address"
            register={register}
            error={errors.address}
            placeholder="Rua Exemplo, 123"
          />

          <FormField
            label="Complemento"
            name="complement"
            register={register}
            error={errors.complement}
            placeholder="Apto 302, Bloco B"
          />

          <FormField
            label="Ponto de referência"
            name="reference_point"
            register={register}
            error={errors.reference_point}
            placeholder="Próximo ao mercado X"
          />

          <FormField
            label="Bairro"
            name="neighborhood"
            register={register}
            error={errors.neighborhood}
            placeholder="Centro"
          />

          <FormField
            label="Cidade"
            name="city"
            register={register}
            error={errors.city}
            placeholder="Ijui"
          />

          <FormField
            label="CEP"
            name="zip_code"
            register={register}
            error={errors.zip_code}
            placeholder="98700-000"
          />

          <div>
            <label>Condição do imóvel</label>
            <select
              {...register("condition")}
              className={`w-full border rounded-md px-3 py-2 text-sm ${
                errors.type ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Selecione a condição</option>
              <option value="pessimo">Péssimo</option>
              <option value="ruim">Ruim</option>
              <option value="bom">Bom</option>
              <option value="novo">Novo</option>
            </select>
            {errors.condition && (
              <p className="text-red-500 text-sm mt-1">
                {errors.condition.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Dimensões e Valores</h3>

          <FormField
            label="Área total (m²)"
            name="area_total"
            type="number"
            register={register}
            error={errors.area_total}
            placeholder="Ex: 300"
          />

          <FormField
            label="Área construída (m²)"
            name="area_built"
            type="number"
            register={register}
            error={errors.area_built}
            placeholder="Ex: 180"
          />

          <FormField
            label="Preço *"
            name="price"
            type="number"
            register={register}
            error={errors.price}
            placeholder="Ex: 450000"
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Ambientes</h3>

          <FormField
            label="Quartos"
            name="bedrooms"
            type="number"
            register={register}
            error={errors.bedrooms}
            placeholder="Ex: 3"
          />

          <FormField
            label="Suítes"
            name="suites"
            type="number"
            register={register}
            error={errors.suites}
            placeholder="Ex: 1"
          />

          <FormField
            label="Banheiros"
            name="bathrooms"
            type="number"
            register={register}
            error={errors.bathrooms}
            placeholder="Ex: 2"
          />

          <FormField
            label="Outros cômodos"
            name="other_rooms"
            type="number"
            register={register}
            error={errors.other_rooms}
            placeholder="Ex: 2"
          />

          <FormField
            label="Vagas cobertas"
            name="garage_covered"
            type="number"
            register={register}
            error={errors.garage_covered}
            placeholder="Ex: 1"
          />

          <FormField
            label="Vagas descobertas"
            name="garage_uncovered"
            type="number"
            register={register}
            error={errors.garage_uncovered}
            placeholder="Ex: 1"
          />

          <div>
            <label>Posição do sol</label>
            <select
              {...register("sun_position")}
              className={`w-full border rounded-md px-3 py-2 text-sm ${
                errors.type ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Selecione a posição</option>
              <option value="norte">Norte</option>
              <option value="sul">Sul</option>
              <option value="leste">Leste</option>
              <option value="oeste">Oeste</option>
            </select>
            {errors.sun_position && (
              <p className="text-red-500 text-sm mt-1">
                {errors.sun_position.message}
              </p>
            )}
          </div>

          <FormField
            label="Ano de construção"
            name="year_built"
            type="number"
            register={register}
            error={errors.year_built}
            placeholder="Ex: 2015"
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Descrição</h3>

          <div>
            <label>Descrição do imóvel</label>
            <textarea
              {...register("description")}
              placeholder="Descreva o imóvel, diferenciais, localização, etc..."
              className={`w-full border rounded-md px-3 py-2 text-sm min-h-[120px] ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {isSubmitting ? "Salvando..." : "Salvar"}
        </button>
        {feedback.type && (
          <div
            className={`p-3 rounded-md text-sm font-medium ${
              feedback.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {feedback.message}
          </div>
        )}

        {Object.keys(errors).length > 0 && (
          <p className="text-red-600 font-medium">
            Corrija os campos obrigatórios antes de continuar.
          </p>
        )}
      </form>
    </main>
  )
}
