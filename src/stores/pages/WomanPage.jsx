import React from 'react'
import { womanData } from '../data/woman'
import Navbar from '../components/Navbar'
import ProductBrowser from '../components/ProductBrowser'

const WomanPage = () => {
  return (
    <>
      <Navbar />
      <ProductBrowser
        title="Women"
        items={womanData}
        linkFor={(item) => `/woman/${item.id}`}
        brandLabel="Brand"
      />
    </>
  )
}

export default WomanPage
