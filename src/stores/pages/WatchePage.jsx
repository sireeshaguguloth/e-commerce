import React from 'react'
import { watchData } from '../data/watch'
import Navbar from '../components/Navbar'
import ProductBrowser from '../components/ProductBrowser'

const WatchePage = () => {
  return (
    <>
      <Navbar />
      <ProductBrowser
        title="Watches"
        items={watchData}
        linkFor={(item) => `/watches/${item.id}`}
        brandLabel="Brand"
      />
    </>
  )
}

export default WatchePage
