import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { nameOf, brandOf, typeOf } from '../data/allProducts'

const SORTS = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' },
]

const unique = (values) => [...new Set(values.filter(Boolean))]

const toggle = (list, value) =>
    list.includes(value) ? list.filter((entry) => entry !== value) : [...list, value]

/**
 * Shared listing used by every category page and by the search results page.
 * Remount it with a `key` when the item set changes so filters reset.
 */
const ProductBrowser = ({ title, subtitle, items, linkFor, brandLabel = 'Brand' }) => {
    const navigate = useNavigate()

    const brands = useMemo(() => unique(items.map(brandOf)).sort(), [items])
    const types = useMemo(() => unique(items.map(typeOf)).sort(), [items])
    const categories = useMemo(() => unique(items.map((item) => item.categoryLabel)).sort(), [items])

    const prices = items.map((item) => Number(item.price)).filter((n) => !Number.isNaN(n))
    const minPrice = prices.length ? Math.floor(Math.min(...prices)) : 0
    const maxPrice = prices.length ? Math.ceil(Math.max(...prices)) : 0

    const [selectedBrands, setSelectedBrands] = useState([])
    const [selectedTypes, setSelectedTypes] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [priceCap, setPriceCap] = useState(maxPrice)
    const [sort, setSort] = useState('featured')
    const [showFilters, setShowFilters] = useState(false)

    const activeCount =
        selectedBrands.length +
        selectedTypes.length +
        selectedCategories.length +
        (priceCap < maxPrice ? 1 : 0)

    const hasFilters =
        categories.length > 1 || brands.length > 1 || types.length > 1 || maxPrice > minPrice

    const filtersActive =
        selectedBrands.length > 0 ||
        selectedTypes.length > 0 ||
        selectedCategories.length > 0 ||
        priceCap < maxPrice ||
        sort !== 'featured'

    const clearAll = () => {
        setSelectedBrands([])
        setSelectedTypes([])
        setSelectedCategories([])
        setPriceCap(maxPrice)
        setSort('featured')
    }

    const visible = useMemo(() => {
        const filtered = items.filter((item) => {
            if (selectedBrands.length && !selectedBrands.includes(brandOf(item))) return false
            if (selectedTypes.length && !selectedTypes.includes(typeOf(item))) return false
            if (selectedCategories.length && !selectedCategories.includes(item.categoryLabel))
                return false
            if (Number(item.price) > priceCap) return false
            return true
        })

        const sorted = [...filtered]
        if (sort === 'price-asc') sorted.sort((a, b) => Number(a.price) - Number(b.price))
        if (sort === 'price-desc') sorted.sort((a, b) => Number(b.price) - Number(a.price))
        if (sort === 'name-asc') sorted.sort((a, b) => nameOf(a).localeCompare(nameOf(b)))
        if (sort === 'name-desc') sorted.sort((a, b) => nameOf(b).localeCompare(nameOf(a)))
        return sorted
    }, [items, selectedBrands, selectedTypes, selectedCategories, priceCap, sort])

    return (
        <div className="page-container">
            <div className="browse-header">
                <div>
                    <h1 className="browse-title">{title}</h1>
                    {subtitle && <p className="browse-subtitle">{subtitle}</p>}
                </div>
                <label className="sort-box">
                    <span>Sort by</span>
                    <select
                        className="sort-select"
                        value={sort}
                        onChange={(event) => setSort(event.target.value)}
                    >
                        {SORTS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <div className="fullpage">
                {hasFilters && (
                <aside className={showFilters ? 'pro-selected open' : 'pro-selected'}>
                    {/* only shown on small screens, see App.css */}
                    <button
                        type="button"
                        className="filter-toggle"
                        aria-expanded={showFilters}
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <span>Filters{activeCount > 0 ? ` (${activeCount})` : ''}</span>
                        <span aria-hidden="true">{showFilters ? '−' : '+'}</span>
                    </button>

                    <div className="filter-body">
                    <div className="filter-head">
                        <h3>Filters</h3>
                        {filtersActive && (
                            <button type="button" className="clear-filters" onClick={clearAll}>
                                Clear all
                            </button>
                        )}
                    </div>

                    {categories.length > 1 && (
                        <div className="filter-group">
                            <h4>Category</h4>
                            {categories.map((category) => (
                                <div key={category}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(category)}
                                            onChange={() =>
                                                setSelectedCategories(
                                                    toggle(selectedCategories, category)
                                                )
                                            }
                                        />
                                        {category}
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}

                    {brands.length > 1 && (
                        <div className="filter-group">
                            <h4>{brandLabel}</h4>
                            {brands.map((brand) => (
                                <div key={brand}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={selectedBrands.includes(brand)}
                                            onChange={() =>
                                                setSelectedBrands(toggle(selectedBrands, brand))
                                            }
                                        />
                                        {brand}
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}

                    {types.length > 1 && (
                        <div className="filter-group">
                            <h4>Type</h4>
                            {types.map((type) => (
                                <div key={type}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={selectedTypes.includes(type)}
                                            onChange={() =>
                                                setSelectedTypes(toggle(selectedTypes, type))
                                            }
                                        />
                                        {type}
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}

                    {maxPrice > minPrice && (
                        <div className="filter-group price-group">
                            <h4>Max price</h4>
                            <input
                                type="range"
                                min={minPrice}
                                max={maxPrice}
                                step="1"
                                value={priceCap}
                                onChange={(event) => setPriceCap(Number(event.target.value))}
                            />
                            <p className="price-range-value">
                                ₹{minPrice} — ₹{priceCap}
                            </p>
                        </div>
                    )}
                    </div>
                </aside>
                )}

                <div className="product-listing-area">
                    <p className="result-count">
                        Showing {visible.length} of {items.length} products
                    </p>

                    {visible.length === 0 ? (
                        <div className="no-results">
                            <h2>No products match these filters</h2>
                            <button type="button" className="btn-add-cart" onClick={clearAll}>
                                Clear filters
                            </button>
                        </div>
                    ) : (
                        <div className="pageSection">
                            {visible.map((item) => (
                                <div
                                    key={linkFor(item)}
                                    className="pro-input"
                                    onClick={() => navigate(linkFor(item))}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="pageImg">
                                        <img src={item.image} alt={nameOf(item)} />
                                    </div>
                                    <div className="proModel">
                                        {brandOf(item) && (
                                            <span className="pro-brand">{brandOf(item)}</span>
                                        )}
                                        <span className="pro-name">{nameOf(item)}</span>
                                        <span className="pro-price">₹{item.price}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProductBrowser
