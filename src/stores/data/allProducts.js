import { mobileData } from './mobiles'
import { computerData } from './computers'
import { watchData } from './watch'
import { menData } from './men'
import { womanData } from './woman'
import { furnitureData } from './furniture'
import { acData } from './ac'
import { fridgeData } from './fridge'
import { kitchenData } from './kitchen'
import { tvData } from './tv'
import { speakerData } from './speaker'
import { booksData } from './books'

// One place that knows every category, its data and its route.
export const catalog = [
    { key: 'mobiles', label: 'Mobiles', path: '/mobiles', data: mobileData },
    { key: 'computers', label: 'Computers', path: '/computers', data: computerData },
    { key: 'watches', label: 'Watches', path: '/watches', data: watchData },
    { key: 'men', label: 'Men', path: '/men', data: menData },
    { key: 'woman', label: 'Women', path: '/woman', data: womanData },
    { key: 'furnitures', label: 'Furniture', path: '/furnitures', data: furnitureData },
    { key: 'ac', label: 'AC', path: '/ac', data: acData },
    { key: 'fridge', label: 'Fridge', path: '/fridge', data: fridgeData },
    { key: 'kitchen', label: 'Kitchen', path: '/kitchen', data: kitchenData },
    { key: 'tv', label: 'TV', path: '/tv', data: tvData },
    { key: 'speakers', label: 'Speakers', path: '/speakers', data: speakerData },
    { key: 'books', label: 'Books', path: '/books', data: booksData },
]

// The data files use different keys for the same idea, so normalise here.
export const nameOf = (item) => item.model || item.title || ''
export const brandOf = (item) => item.company || item.brand || item.author || ''
export const typeOf = (item) => item.type || ''

// Every product with the category it came from and its detail-page link.
export const allProducts = catalog.flatMap((category) =>
    category.data.map((item) => ({
        ...item,
        categoryKey: category.key,
        categoryLabel: category.label,
        path: `${category.path}/${item.id}`,
    }))
)

const primaryText = (item) =>
    [nameOf(item), brandOf(item), typeOf(item), item.product, item.category, item.categoryLabel]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

const fullText = (item) => `${primaryText(item)} ${(item.description || '').toLowerCase()}`

/**
 * Matches every token of the query. Products matching on name/brand/type rank
 * above ones that only mention the word in their description.
 */
export const searchProducts = (query) => {
    const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
    if (tokens.length === 0) return []

    const hits = []
    allProducts.forEach((item) => {
        const primary = primaryText(item)
        const full = fullText(item)
        if (!tokens.every((token) => full.includes(token))) return
        hits.push({ item, rank: tokens.every((token) => primary.includes(token)) ? 0 : 1 })
    })

    return hits.sort((a, b) => a.rank - b.rank).map((hit) => hit.item)
}
