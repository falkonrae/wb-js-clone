import { Product } from "~/models/products.model"

export interface Query {
    field: keyof Product;
    name: string
}

const getFilteredProducts = (products: Product[], query: Query) => {
    if (query.field && query.name) {
        return products.filter(c => {
            const key = c[query.field]
            if (typeof key === 'string') {
                return key.toLowerCase() === query.name.toLowerCase()
            } else {
                return c[query.field] === query.name
            }
        })
    } else {
        return products
    }
}

export default defineEventHandler(async (event) => {
    const { field, name }: Query = getQuery(event)
    await new Promise(resolve => setTimeout(resolve, 200))
    const products = await useStorage('assets:server').getItem('db.json') as Product[]
    if (!products) return []
    return getFilteredProducts(products, { field, name })
})