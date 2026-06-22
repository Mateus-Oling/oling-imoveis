"use client"

import React from "react"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setError("")
    setLoading(true)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError("E-mail ou senha inválidos")
      setLoading(false)
      return
    }

    router.push("/admin/properties")
  }

  return (
    <main className="min-h-screen bg-[#F5F5F7] flex flex-col items-center lg:pt-12 xl:pt-14">
      <Image
        src="/assets/logo-guido-imoveis.png"
        alt="Guido Imóveis"
        width={500}
        height={220}
        priority
        className="w-64 lg:w-140 xl:w-[500px] 2xl:w-[660px]"
      />

      <h1 className="text-xl lg:text-2xl xl:text-3xl  font-semibold text-[#4a5855]">
        Área de login administrativo
      </h1>

      <form
        onSubmit={handleLogin}
        className="mt-16 lg:mt-20 xl:mt-28 2xl:mt-28 w-full max-w-[420px] lg:max-w-[500px] xl:max-w-[650px] 2xl:max-w-[800px] rounded-3xl bg-white p-12 shadow-sm"
      >
        <h2 className="mb-8 text-base lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold text-[#4B5A57]">
          Acesse sua conta
        </h2>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="mb-4 block text-sm lg:text-base xl:text-lg 2xl:text-2xl font-medium text-gray-700"
          >
            E-mail
          </label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Digite seu e-mail"
            className="w-full rounded-xl border border-gray-200 px-3 py-2 lg:px-4 lg:py-3 xl:px-5 xl:py-6 2xl:px-7 2xl:py-5 text-sm lg:text-base xl:text-lg 2xl:text-2xl placeholder:text-gray-400 outline-none"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="mb-4 block text-sm lg:text-base xl:text-xl 2xl:text-2xl font-medium text-gray-700"
          >
            Senha
          </label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Digite sua senha"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 lg:px-5 lg:py-4 xl:px-6 xl:py-5 2xl:px-8 2xl:py-6 text-sm lg:text-base xl:text-lg 2xl:text-2xl placeholder:text-gray-400 outline-none"
          />
        </div>

        <button
          type="button"
          className="mb-8 text-sm lg:text-base xl:text-lg 2xl:text-xl text-gray-500"
        >
          Esqueceu sua senha?
        </button>

        {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-[#46ab8e] py-3 lg:py-4 xl:py-5 2xl:py-6 text-base lg:text-lg xl:text-xl 2xl:text-2xl font-medium text-white transition hover:opacity-90"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </main>
  )
}
