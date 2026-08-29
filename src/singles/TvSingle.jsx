import React from 'react'
import { tvData } from '../stores/data/tv'
import ProductSingle from './ProductSingle'

const TvSingle = () => {
    return <ProductSingle dataSource={tvData} />
}

export default TvSingle
