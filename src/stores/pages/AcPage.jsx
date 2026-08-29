import React from 'react'
import { acData } from '../data/ac'
import Navbar from '../components/Navbar'
import ProductBrowser from '../components/ProductBrowser'

const AcPage = () => {
  return (
    <>
      <Navbar />
      <ProductBrowser
        title="Air Conditioners"
        items={acData}
        linkFor={(item) => `/ac/${item.id}`}
        brandLabel="Company"
      />
    </>
  )
}

export default AcPage
