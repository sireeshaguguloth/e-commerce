import React from 'react'
import { furnitureData } from '../stores/data/furniture'
import ProductSingle from './ProductSingle'

const FurnitureSingle = () => {
    return <ProductSingle dataSource={furnitureData} />
}

export default FurnitureSingle
