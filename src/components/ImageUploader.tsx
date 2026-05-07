import React from "react"
import { useDropzone } from "react-dropzone"

type Props = {
  images: File[]
  setImages: (images: File[]) => void
}

export default function ImageUploader({ images, setImages }: Props) {
  const { getRootProps, getInputProps } = useDropzone()

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
    </section>
  )
}
