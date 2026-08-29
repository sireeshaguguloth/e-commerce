import React from 'react'
import { fridgeData } from '../data/fridge'
import Navbar from '../components/Navbar'
import ProductBrowser from '../components/ProductBrowser'

const FridgePage = () => {
  return (
    <>
      <Navbar />
      <ProductBrowser
        title="Fridges"
        items={fridgeData}
        linkFor={(item) => `/fridge/${item.id}`}
        brandLabel="Brand"
      />
    </>
  )
}

export default FridgePage
