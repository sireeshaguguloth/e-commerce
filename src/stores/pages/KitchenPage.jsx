import React from 'react'
import { kitchenData } from '../data/kitchen'
import Navbar from '../components/Navbar'
import ProductBrowser from '../components/ProductBrowser'

const KitchenPage = () => {
  return (
    <>
      <Navbar />
      <ProductBrowser
        title="Kitchen"
        items={kitchenData}
        linkFor={(item) => `/kitchen/${item.id}`}
        brandLabel="Brand"
      />
    </>
  )
}

export default KitchenPage
