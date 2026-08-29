import React from 'react'
import { fridgeData } from '../stores/data/fridge'
import ProductSingle from './ProductSingle'

const FridgeSingle = () => {
    return <ProductSingle dataSource={fridgeData} />
}

export default FridgeSingle
