import React from 'react'
import { furnitureData } from '../data/furniture'
import Navbar from '../components/Navbar'
import ProductBrowser from '../components/ProductBrowser'

const FurniturePage = () => {
  return (
    <>
      <Navbar />
      <ProductBrowser
        title="Furniture"
        items={furnitureData}
        linkFor={(item) => `/furnitures/${item.id}`}
        brandLabel="Brand"
      />
    </>
  )
}

export default FurniturePage
