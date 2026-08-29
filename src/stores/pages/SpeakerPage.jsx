import React from 'react'
import { speakerData } from '../data/speaker'
import Navbar from '../components/Navbar'
import ProductBrowser from '../components/ProductBrowser'

const SpeakerPage = () => {
  return (
    <>
      <Navbar />
      <ProductBrowser
        title="Speakers"
        items={speakerData}
        linkFor={(item) => `/speakers/${item.id}`}
        brandLabel="Brand"
      />
    </>
  )
}

export default SpeakerPage
