import React from "react"

import { FieldError, UseFormRegister, FieldValues, Path } from "react-hook-form"

type Props<T extends FieldValues> = {
  label: string
  name: Path<T>
  register: UseFormRegister<T>
  error?: FieldError
  placeholder?: string
  type?: string
}

export default function FormField<T extends FieldValues>({
  label,
  name,
  register,
  error,
  placeholder,
  type = "text",
}: Props<T>) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>

      <input
        type={type}
        {...register(name)}
        placeholder={placeholder}
        className={`w-full border rounded-md px-3 py-2 text-sm
        ${error ? "border-red-500" : "border-gray-300"}
        focus:outline-none focus:ring-2 focus:ring-black/20`}
      />

      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  )
}
