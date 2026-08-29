import React from 'react'
import { womanData } from '../stores/data/woman'
import ProductSingle from './ProductSingle'

const WomanSingle = () => {
    return <ProductSingle dataSource={womanData} />
}

export default WomanSingle
