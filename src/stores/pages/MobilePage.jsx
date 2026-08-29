import React from 'react'
import { mobileData } from '../data/mobiles'
import Navbar from '../components/Navbar'
import ProductBrowser from '../components/ProductBrowser'

const MobilePage = () => {
  return (
    <>
      <Navbar />
      <ProductBrowser
        title="Mobiles"
        items={mobileData}
        linkFor={(item) => `/mobiles/${item.id}`}
        brandLabel="Company"
      />
    </>
  )
}

export default MobilePage
