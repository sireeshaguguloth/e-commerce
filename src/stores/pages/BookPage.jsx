import React from 'react'
import { booksData } from '../data/books'
import Navbar from '../components/Navbar'
import ProductBrowser from '../components/ProductBrowser'

const BookPage = () => {
  return (
    <>
      <Navbar />
      <ProductBrowser
        title="Books"
        items={booksData}
        linkFor={(item) => `/books/${item.id}`}
        brandLabel="Author"
      />
    </>
  )
}

export default BookPage
