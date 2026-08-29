import React from 'react'
import { useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ProductBrowser from '../components/ProductBrowser'
import { searchProducts } from '../data/allProducts'

const SearchPage = () => {
    const [searchParams] = useSearchParams()
    const query = (searchParams.get('q') || '').trim()
    const results = searchProducts(query)

    return (
        <>
            <Navbar />
            {query === '' ? (
                <div className="page-container">
                    <div className="no-results">
                        <h2>What are you looking for?</h2>
                        <p>Type a brand, product or category in the search box above.</p>
                    </div>
                </div>
            ) : results.length === 0 ? (
                <div className="page-container">
                    <div className="no-results">
                        <h2>No results for “{query}”</h2>
                        <p>Check the spelling or try a different brand, product or category.</p>
                    </div>
                </div>
            ) : (
                <ProductBrowser
                    key={query}
                    title={`Results for “${query}”`}
                    subtitle={`${results.length} product${results.length !== 1 ? 's' : ''} found across the store`}
                    items={results}
                    linkFor={(item) => item.path}
                />
            )}
        </>
    )
}

export default SearchPage
