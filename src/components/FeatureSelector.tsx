"use client"

import React, { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

type Feature = {
  id: string
  name: string
  category: string
}

type Props = {
  selectedFeatures: string[]
  setSelectedFeatures: (features: string[]) => void
}

export default function FeatureSelector({
  selectedFeatures,
  setSelectedFeatures,
}: Props) {
  const [features, setFeatures] = useState<Feature[]>([])

  useEffect(() => {
    async function fetchFeatures() {
      const { data } = await supabase
        .from("property_features")
        .select("id, name, category")

      setFeatures((data as Feature[]) || [])
    }

    fetchFeatures()
  }, [])

  function toggleFeature(id: string) {
    if (selectedFeatures.includes(id)) {
      setSelectedFeatures(selectedFeatures.filter((item) => item !== id))
    } else {
      setSelectedFeatures([...selectedFeatures, id])
    }
  }

  const groupedFeatures = features.reduce(
    (acc, feature) => {
      if (!acc[feature.category]) {
        acc[feature.category] = []
      }
      acc[feature.category].push(feature)
      return acc
    },
    {} as Record<string, Feature[]>,
  )

  return (
    <div className="mt-10">
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Características</h2>
        <p className="text-sm text-gray-500 mt-1">
          Selecione as características que se aplicam ao imóvel.
        </p>
      </div>

      {/* GRID DE CATEGORIAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {Object.entries(groupedFeatures).map(([category, items]) => (
          <div
            key={category}
            className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm"
          >
            {/* TÍTULO DA CATEGORIA */}
            <h3 className="text-sm font-semibold text-gray-800 mb-4 capitalize">
              {category.replace("_", " ")}
            </h3>

            {/* LISTA */}
            <div className="space-y-2">
              {items.map((feature) => (
                <label
                  key={feature.id}
                  className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-900"
                >
                  <input
                    type="checkbox"
                    checked={selectedFeatures.includes(feature.id)}
                    onChange={() => toggleFeature(feature.id)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  {feature.name}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
