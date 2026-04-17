"use client"

import PropertyCard from "@/components/property/PropertyCard"
import React from "react"
import { useState } from "react"
import { properties } from "@/data/properties"

export default function PropertiesPage() {
  const [searchProperty, setSearchProperty] = useState("")
  const search = searchProperty.toLowerCase().trim()

  const filteredProperties = properties.filter((property) => {
    return (
      property.type.toLowerCase().includes(search) ||
      property.neighborhood.toLowerCase().includes(search)
    )
  })
  return (
    <main>
      <section className="py-18 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Imóveis à venda</h1>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {filteredProperties.map((property, index) => (
              <PropertyCard key={index} {...property} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
