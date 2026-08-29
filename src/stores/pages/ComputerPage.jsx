import React from 'react'
import { computerData } from '../data/computers'
import Navbar from '../components/Navbar'
import ProductBrowser from '../components/ProductBrowser'

const ComputerPage = () => {
  return (
    <>
      <Navbar />
      <ProductBrowser
        title="Computers"
        items={computerData}
        linkFor={(item) => `/computers/${item.id}`}
        brandLabel="Company"
      />
    </>
  )
}

export default ComputerPage
