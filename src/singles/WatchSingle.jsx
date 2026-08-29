import React from 'react'
import { watchData } from '../stores/data/watch'
import ProductSingle from './ProductSingle'

const WatchSingle = () => {
    return <ProductSingle dataSource={watchData} />
}

export default WatchSingle
