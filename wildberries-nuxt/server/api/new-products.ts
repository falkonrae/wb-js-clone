import { Product } from '~/models/products.model'

const getNewProducts = (products: Product[]) => {
    return products.filter(c => c.label.toLowerCase() === 'new').splice(0, 4)
}

export default defineEventHandler(async (event) => {
    const products = await useStorage('assets:server').getItem('db.json') as Product[]
    if (!products) return []
    return getNewProducts(products)
})