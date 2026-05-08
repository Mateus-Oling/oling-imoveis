import Image from "next/image"
import React from "react"
import { useDropzone } from "react-dropzone"

type Props = {
  images: File[]
  setImages: (images: File[]) => void
}

export default function ImageUploader({ images, setImages }: Props) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setImages(acceptedFiles)
      console.log(images)
    },
  })

  return (
    <section className="mt-10 border border-gray-200 rounded-2xl p-6 bg-white">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Fotos do Imóvel</h2>
        <p className="text-sm text-gray-500 mt-1">
          Você pode enviar até 20 fotos. A primeira será a foto de capa.
        </p>
      </div>

      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-300 rounded-2xl px-6 py-14 text-center cursor-pointer hover:border-green-500 transition"
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center">
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
      </div>
    </section>
  )
}
