import Image from "next/image"
import React from "react"
import { useDropzone } from "react-dropzone"

type Props = {
  images: File[]
  setImages: (images: File[]) => void
  coverIndex: number
  setCoverIndex: (index: number) => void
  imageError: string
  setImageError: (message: string) => void
}

export default function ImageUploader({
  images,
  setImages,
  coverIndex,
  setCoverIndex,
  imageError,
  setImageError,
}: Props) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setImages((prevImages) => {
        const remainingSlots = 20 - prevImages.length

        const filesToAdd = acceptedFiles.slice(0, remainingSlots)

        const rejectedCount = acceptedFiles.length - filesToAdd.length

        if (rejectedCount > 0) {
          setImageError(
            `${rejectedCount} imagem(ns) não foram adicionadas porque o limite máximo é 20.`,
          )
        } else {
          setImageError("")
        }

        return [...prevImages, ...filesToAdd]
      })
    },
  })

  function removeImage(indexToRemove: number) {
    setImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove),
    )

    if (coverIndex === indexToRemove) {
      setCoverIndex(0)
    }
  }

  return (
    <section className="relative isolate mt-10 border border-gray-200 rounded-2xl p-6 bg-white">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Fotos do Imóvel</h2>
        <p className="text-sm text-gray-500 mt-1">
          Você pode enviar até 20 fotos. A primeira será a foto de capa.
        </p>
      </div>
      <div className="relative border-2 border-dashed border-gray-300 rounded-2xl px-6 py-14 text-center hover:border-green-500 transition ">
        <div
          {...getRootProps()}
          className="absolute inset-0 z-50 cursor-pointer pointer-events-auto"
        >
          <input {...getInputProps()} />
        </div>

        <div className="flex flex-col items-center pointer-events-none">
          <div className="text-5xl mb-6">🖼️</div>

          <p className="text-lg font-semibold text-gray-800 mb-4">
            Selecione fotos do imóvel
          </p>

          <button
            type="button"
            className="border border-green-600 text-green-600 px-5 py-2 rounded-lg font-medium hover:bg-green-50 transition"
          >
            Selecionar fotos
          </button>

          <div className="flex items-center w-full max-w-xl my-8">
            <div className="flex-1 h-px bg-gray-200" />

            <span className="px-4 text-sm text-gray-400">ou</span>

            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <p className="text-base font-semibold text-gray-700">
            Arraste e solte imagens aqui
          </p>

          <p className="text-sm text-gray-400 mt-2">
            PNG, JPG ou WEBP até 10MB
          </p>
        </div>
      </div>

      <div className="mt-14">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-semibold text-gray-800">
            Fotos adicionadas
          </h3>

          <span className="text-sm text-gray-500">{images.length}/20</span>
        </div>

        {images.length === 0 ? (
          <div className="border border-gray-200 rounded-2xl bg-white py-16 px-6 flex flex-col items-center justify-center text-center">
            <div className="text-5xl mb-5 opacity-60">🖼️</div>

            <p className="text-xl font-semibold text-gray-700">
              Nenhuma foto adicionada ainda
            </p>

            <p className="text-sm text-gray-500 mt-2">
              As imagens que você selecionar aparecerão aqui.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-xl border border-gray-200 bg-gray-100"
              >
                {coverIndex === index && (
                  <div className="absolute top-2 left-2 z-10 bg-green-600 text-white text-xs px-2 py-1 rounded-md font-medium">
                    Capa
                  </div>
                )}
                <button
                  type="button"
                  className="absolute top-2 right-2 z-10 bg-black/50 text-white w-5 h-5 rounded-full text-sm hover:bg-black transition"
                  onClick={() => removeImage(index)}
                >
                  X
                </button>
                {coverIndex !== index && (
                  <button
                    type="button"
                    onClick={() => setCoverIndex(index)}
                    className="absolute top-2 left-2 z-10 bg-white/70 text-black text-xs px-2 py-1 rounded-md font-medium hover:bg-white transition"
                  >
                    Definir capa
                  </button>
                )}
                <Image
                  src={URL.createObjectURL(image)}
                  alt={image.name}
                  className="w-full h-full object-cover"
                  fill
                />
              </div>
            ))}
          </div>
        )}
        {imageError && (
          <div className="mt-4 border border-red-200 bg-red-50 text-red-700 rounded-xl px-4 py-3">
            <p className="font-medium">Limite de imagens atingido</p>

            <p className="text-sm mt-1">{imageError}</p>
          </div>
        )}
      </div>
    </section>
  )
}
