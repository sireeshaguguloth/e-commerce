import React from 'react'
import { menData } from '../data/men'
import Navbar from '../components/Navbar'
import ProductBrowser from '../components/ProductBrowser'

const MenPage = () => {
  return (
    <>
      <Navbar />
      <ProductBrowser
        title="Mens"
        items={menData}
        linkFor={(item) => `/men/${item.id}`}
        brandLabel="Brand"
      />
    </>
  )
}

export default MenPage
