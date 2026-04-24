"use client"

import React, { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

type Feature = {
  id: string
  name: string
}

export default function FeatureSelector() {
  const [features, setFeatures] = useState<Feature[]>([])
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])

  useEffect(() => {
    async function fetchFeatures() {
      const { data } = await supabase.from("property_features").select("*")

      setFeatures(data || [])
    }
    fetchFeatures()
  }, [])

  function selectFeature(feature: Feature) {
    if (selectedFeatures.includes(feature.id)) {
      setSelectedFeatures(selectedFeatures.filter((id) => id !== feature.id))
    } else {
      setSelectedFeatures([...selectedFeatures, feature.id])
    }
  }

  return (
    <div>
      <div>
        {features.map((feature) => (
          <label key={feature.id} className="flex items-center gap-2 ml-2">
            <input
              type="checkbox"
              checked={selectedFeatures.includes(feature.id)}
              onChange={() => selectFeature(feature)}
            />
            {feature.name}
          </label>
        ))}
      </div>
    </div>
  )
}
