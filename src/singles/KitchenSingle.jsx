import React from 'react'
import { kitchenData } from '../stores/data/kitchen'
import ProductSingle from './ProductSingle'

const KitchenSingle = () => {
    return <ProductSingle dataSource={kitchenData} />
}

export default KitchenSingle
