import React from 'react'
import { speakerData } from '../stores/data/speaker'
import ProductSingle from './ProductSingle'

const SpeakerSingle = () => {
    return <ProductSingle dataSource={speakerData} />
}

export default SpeakerSingle
