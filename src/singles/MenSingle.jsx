import React from 'react'
import { menData } from '../stores/data/men'
import ProductSingle from './ProductSingle'

const MenSingle = () => {
    return <ProductSingle dataSource={menData} />
}

export default MenSingle
