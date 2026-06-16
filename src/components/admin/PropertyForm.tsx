"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { propertySchema } from "@/schemas/propertySchema"
import { z } from "zod"
import FormField from "@/components/form/FormField"
import FeatureSelector from "@/components/FeatureSelector"
import ImageUploader from "@/components/ImageUploader"
import { supabase } from "@/lib/supabase"
import { Property } from "@/types/property"
import { PropertyImage } from "@/types/property-image"

type FormData = z.infer<typeof propertySchema>

type PropertyFormProps = {
  initialData?: Property
  initialFeatures?: string[]
  initialImages?: PropertyImage[]
}

function buildImageRows(
  propertyId: string,
  uploadedImages: unknown[],
  coverIndex: number,
) {
  return uploadedImages.map((uploadedImage, index) => ({
    property_id: propertyId,
    image_url: uploadedImage.url,
    image_path: uploadedImage.path,
    is_cover: index === coverIndex,
  }))
  console.log("IMAGE ROWS", JSON.stringify(imageRows, null, 2))
}

async function uploadImages(files: File[]) {
  return await Promise.all(
    files.map(async (file) => {
      const fileName = `${Date.now()}-${file.name}`

      const { data: imageData, error: imageError } = await supabase.storage
        .from("property-images")
        .upload(fileName, file)

      if (imageError) {
        throw imageError
      }

      const { data: publicUrlData } = supabase.storage
        .from("property-images")
        .getPublicUrl(imageData.path)

      return {
        path: imageData.path,
        url: publicUrlData.publicUrl,
      }
    }),
  )
}

export default function PropertyForm({
  initialData,
  initialFeatures,
  initialImages,
}: PropertyFormProps) {
  const isEditing = initialData ? true : false

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: initialData?.title ?? "",
      type: initialData?.type ?? "",
      address: initialData?.address ?? "",
      complement: initialData?.complement ?? "",
      neighborhood: initialData?.neighborhood ?? "",
      city: initialData?.city ?? "",
      zip_code: initialData?.zip_code ?? "",
      condition: initialData?.condition ?? "",
      area_total: initialData?.area_total ?? undefined,
      area_built: initialData?.area_built ?? undefined,
      price: initialData?.price ?? undefined,
      bedrooms: initialData?.bedrooms ?? undefined,
      suites: initialData?.suites ?? undefined,
      bathrooms: initialData?.bathrooms ?? undefined,
      other_rooms: initialData?.other_rooms ?? undefined,
      garage_uncovered: initialData?.garage_uncovered ?? undefined,
      garage_covered: initialData?.garage_covered ?? undefined,
      year_built: initialData?.year_built ?? "",
      sun_position: initialData?.sun_position ?? "",
      description: initialData?.description ?? "",
    },
  })

  const [feedback, setFeedback] = useState<{
    type: "success" | "error" | null
    message: string
  }>({
    type: null,
    message: "",
  })

  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(
    initialFeatures ?? [],
  )
  const [savedImages, setSavedImages] = useState<PropertyImage[]>(
    initialImages ?? [],
  )
  const [deletedImages, setDeletedImages] = useState<PropertyImage[]>([])
  const [newImages, setNewImages] = useState<File[]>([])
  const [coverIndex, setCoverIndex] = useState(0)
  const [imageError, setImageError] = useState("")

  useEffect(() => {
    if (savedImages.length === 0) return

    const coverImageIndex = savedImages.findIndex((image) => image.is_cover)

    if (coverImageIndex >= 0) {
      setCoverIndex(coverImageIndex)
    }
  }, [savedImages])

  async function onSubmit(data: FormData) {
    try {
      setFeedback({ type: null, message: "" })

      let property
      let error

      if (isEditing) {
        const response = await supabase
          .from("properties")
          .update(data)
          .eq("id", initialData.id)
          .select()
          .single()

        property = response.data
        error = response.error
      } else {
        const response = await supabase
          .from("properties")
          .insert(data)
          .select()
          .single()

        property = response.data
        error = response.error
      }

      if (error) {
        throw error
      }

      if (deletedImages.length > 0) {
        const imageIds = deletedImages.map((image) => image.id)

        const { error: deleteImagesError } = await supabase
          .from("property_images")
          .delete()
          .in("id", imageIds)

        if (deleteImagesError) {
          throw deleteImagesError
        }

        const imagePaths = deletedImages.map((image) => image.image_path)

        const { error: storageDeleteError } = await supabase.storage
          .from("property-images")
          .remove(imagePaths)

        if (storageDeleteError) {
          throw storageDeleteError
        }
      }

      if (isEditing) {
        const { error: deleteRelationsError } = await supabase
          .from("property_feature_relations")
          .delete()
          .eq("property_id", initialData.id)

        if (deleteRelationsError) {
          throw deleteRelationsError
        }
      }

      const relations = selectedFeatures.map((featureId) => ({
        property_id: property.id,
        feature_id: featureId,
      }))

      const { error: relationError } = await supabase
        .from("property_feature_relations")
        .insert(relations)

      if (relationError) {
        throw relationError
      }

      if (newImages.length > 0) {
        const uploadedImages = await uploadImages(newImages)

        const imageRows = buildImageRows(
          property.id,
          uploadedImages,
          coverIndex,
        )

        const { error: imageInsertError } = await supabase
          .from("property_images")
          .insert(imageRows)

        if (imageInsertError) {
          throw imageInsertError
        }
      }

      const { data: updatedImages, error: updatedImagesError } = await supabase
        .from("property_images")
        .select("id")
        .eq("property_id", property.id)

      if (updatedImagesError) {
        throw updatedImagesError
      }

      await supabase
        .from("property_images")
        .update({ is_cover: false })
        .eq("property_id", property.id)

      const coverImage = updatedImages[coverIndex]

      if (coverImage) {
        const { error: coverUpdateError } = await supabase
          .from("property_images")
          .update({ is_cover: true })
          .eq("id", coverImage.id)

        if (coverUpdateError) {
          throw coverUpdateError
        }
      }

      setFeedback({
        type: "success",
        message: "Imóvel cadastrado com sucesso!",
      })

      if (!isEditing) {
        reset()
        setSelectedFeatures([])
        setNewImages([])
        setCoverIndex(0)
      }
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
    <main>
      <p>{isEditing ? "MODO EDIÇÃO" : "MODO CRIAÇÃO"}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Informações Básicas
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <FormField
              label="Título do imóvel"
              name="title"
              register={register}
              error={errors.title}
              placeholder="Ex: Casa moderna no centro"
            />

            <div>
              <label className="text-base font-medium">Tipo do imóvel*</label>
              <select
                {...register("type")}
                className={`w-full border rounded-md px-3 py-2 text-base ${
                  errors.type ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Selecione o tipo</option>
                <option value="casa">Casa</option>
                <option value="apartamento">Apartamento</option>
                <option value="terreno">Terreno</option>
              </select>
              {errors.type && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.type.message}
                </p>
              )}
            </div>

            <FormField
              label="Endereço*"
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
              label="Bairro*"
              name="neighborhood"
              register={register}
              error={errors.neighborhood}
              placeholder="Centro"
            />

            <FormField
              label="Cidade*"
              name="city"
              register={register}
              error={errors.city}
              placeholder="Ijui"
            />

            <FormField
              label="CEP*"
              name="zip_code"
              register={register}
              error={errors.zip_code}
              placeholder="98700-000"
            />

            <div>
              <label className="text-base font-medium">
                Condição do imóvel
              </label>
              <select
                {...register("condition")}
                className={`w-full border rounded-md px-3 py-2  ${
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
        </div>

        <div className=" bg-white border border-gray-200 rounded-2xl p-6 space-y-6 ">
          <h3 className="text-xl font-semibold text-gray-900">
            Dimensões e Valores
          </h3>
          <div className="flex flex-wrap items-start justify-around gap-6">
            <FormField
              label="Área total (m²)"
              name="area_total"
              type="number"
              register={register}
              error={errors.area_total}
              placeholder="Ex: 300"
              compact
            />

            <FormField
              label="Área construída (m²)"
              name="area_built"
              type="number"
              register={register}
              error={errors.area_built}
              placeholder="Ex: 180"
              compact
            />

            <div className="w-35 flex justify-center">
              <FormField
                label="Preço*"
                name="price"
                type="number"
                register={register}
                error={errors.price}
                placeholder="Ex: 450000"
              />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">Ambientes</h3>
          <div className="flex flex-wrap gap-6 justify-between">
            <FormField
              label="Quartos"
              name="bedrooms"
              type="number"
              register={register}
              error={errors.bedrooms}
              placeholder="Ex: 3"
              compact
            />

            <FormField
              label="Suítes"
              name="suites"
              type="number"
              register={register}
              error={errors.suites}
              placeholder="Ex: 1"
              compact
            />

            <FormField
              label="Banheiros"
              name="bathrooms"
              type="number"
              register={register}
              error={errors.bathrooms}
              placeholder="Ex: 2"
              compact
            />

            <FormField
              label="Outros cômodos"
              name="other_rooms"
              type="number"
              register={register}
              error={errors.other_rooms}
              placeholder="Ex: 2"
              compact
            />

            <FormField
              label="Vagas cobertas"
              name="garage_covered"
              type="number"
              register={register}
              error={errors.garage_covered}
              placeholder="Ex: 1"
              compact
            />

            <FormField
              label="Vagas descobertas"
              name="garage_uncovered"
              type="number"
              register={register}
              error={errors.garage_uncovered}
              placeholder="Ex: 1"
              compact
            />

            <FormField
              label="Ano de construção"
              name="year_built"
              type="number"
              register={register}
              error={errors.year_built}
              placeholder="Ex: 2015"
              compact
            />

            <div>
              <label className="text-base font-medium">Posição do sol</label>
              <select
                {...register("sun_position")}
                className={`w-full border rounded-md px-3 py-2 text-base ${
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
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">Descrição</h3>

          <div>
            <label>Descrição do imóvel</label>
            <textarea
              {...register("description")}
              placeholder="Descreva o imóvel, diferenciais, localização, etc..."
              className={`w-full mt-3 border rounded-xl px-4 py-3 text-base min-h-[140px] resize-none transition ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.description && (
              <p className="text-red-500 text-base mt-1">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>

        {Object.keys(errors).length > 0 && (
          <p className="text-red-600 font-medium">
            Corrija os campos obrigatórios antes de continuar.
          </p>
        )}

        <FeatureSelector
          selectedFeatures={selectedFeatures}
          setSelectedFeatures={setSelectedFeatures}
        />

        <ImageUploader
          savedImages={savedImages}
          setSavedImages={setSavedImages}
          deletedImages={deletedImages}
          setDeletedImages={setDeletedImages}
          newImages={newImages}
          setNewImages={setNewImages}
          coverIndex={coverIndex}
          setCoverIndex={setCoverIndex}
          imageError={imageError}
          setImageError={setImageError}
        />

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className=" bg-emerald-600 hover:bg-emerald-700 text-white text-lg px-9 py-4 rounded-xl font-medium transition shadow-sm mt-6 mb-6"
          >
            {isSubmitting
              ? isEditing
                ? "Salvando alterações..."
                : "Cadastrando imóvel..."
              : isEditing
                ? "Salvar alterações"
                : "Cadastrar imóvel"}
          </button>
        </div>
      </form>
    </main>
  )
}
