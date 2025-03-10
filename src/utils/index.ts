/**
 * This function calculate total proce of products selected
 * @param {Array} products listProduct: Array of Objects
 * @returns {number} total Price of products selected
 */
export const totalPrice = (products) => {
    const totalValueProducts = products.reduce((sum, product) => sum +  product.price, 0)
    return totalValueProducts


}

