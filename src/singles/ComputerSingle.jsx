import React from 'react'
import { computerData } from '../stores/data/computers'
import ProductSingle from './ProductSingle'

const ComputerSingle = () => {
    return <ProductSingle dataSource={computerData} />
}

export default ComputerSingle
