export default function mapPropertyToCard(property: any) {
  return {
    id: property.id,
    image:
      property.property_images.find((image: any) => image.is_cover)
        ?.image_url ?? "",
    type: property.type,
    neighborhood: property.neighborhood,
    address: property.address,
    area: property.area_total,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    garageSpaces: property.garage_covered + property.garage_uncovered,
    price: new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(property.price),
  }
}
