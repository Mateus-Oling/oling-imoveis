import { supabase } from "@/lib/supabase"

export default async function Teste() {
  const { data, error } = await supabase.from("property_features").select("*")

  console.log("DATA:", data)
  console.log("ERROR:", error)

  return (
    <div className="p-10">
      <h1>Teste Supabase</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
