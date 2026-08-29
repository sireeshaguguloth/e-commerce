import React from 'react'
import { tvData } from '../data/tv'
import Navbar from '../components/Navbar'
import ProductBrowser from '../components/ProductBrowser'

const TvPage = () => {
  return (
    <>
      <Navbar />
      <ProductBrowser
        title="Televisions"
        items={tvData}
        linkFor={(item) => `/tv/${item.id}`}
        brandLabel="Brand"
      />
    </>
  )
}

export default TvPage
