import FeatureSelector from "@/components/FeatureSelector"
import { supabase } from "@/lib/supabase"

export default async function Teste() {
  const { data, error } = await supabase.from("property_features").select("*")

  console.log("DATA:", data)
  console.log("ERROR:", error)

  return <FeatureSelector></FeatureSelector>
}
