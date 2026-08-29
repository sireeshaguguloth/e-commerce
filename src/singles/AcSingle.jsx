import React from 'react'
import { acData } from '../stores/data/ac'
import ProductSingle from './ProductSingle'

const AcSingle = () => {
    return <ProductSingle dataSource={acData} />
}

export default AcSingle
