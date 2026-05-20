import React from "react"
import { FieldError, UseFormRegister } from "react-hook-form"

type Props = {
  label: string
  name: string
  register: UseFormRegister<unknown>
  error?: FieldError
  placeholder?: string
  type?: string
  compact?: boolean
}

export default function FormField({
  label,
  name,
  register,
  error,
  placeholder,
  type = "text",
  compact = false,
}: Props) {
  return (
    <div>
      <label className="block text-base font-medium mb-1">{label}</label>

      <input
        type={type}
        {...register(name)}
        placeholder={placeholder}
        className={`${
          compact ? "w-25 text-center" : "w-full"
        } border rounded-md px-3 py-2 text-base
        ${error ? "border-red-500" : "border-gray-300"}
        focus:outline-none focus:ring-2 focus:ring-black/20`}
      />

      {error && <p className="text-red-500 text-base mt-1">{error.message}</p>}
    </div>
  )
}
