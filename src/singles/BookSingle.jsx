import React from 'react'
import { booksData } from '../stores/data/books'
import ProductSingle from './ProductSingle'

const BookSingle = () => {
    return <ProductSingle dataSource={booksData} />
}

export default BookSingle
