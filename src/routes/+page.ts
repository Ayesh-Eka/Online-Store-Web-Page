
export async function load({ params }) {

    const response = await fetch('https://fakestoreapi.com/products?sort=desc')
const product = await response.json()
    const response1 = await fetch("https://fakestoreapi.com/products/categories")
const categories = await response1.json()
const totalProduct = product.length
    return {
        product,categories,totalProduct
    };

}