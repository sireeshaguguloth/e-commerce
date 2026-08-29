import React from 'react'
import { mobileData } from '../stores/data/mobiles'
import ProductSingle from './ProductSingle'

const MobileSingle = () => {
    return <ProductSingle dataSource={mobileData} />
}

export default MobileSingle
