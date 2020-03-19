import compareArrays from '../../utils/compareArrays'

export const getError = (state) => state.basket.error
export const getSavingStatus = (state) => state.basket.isSaving
export const getAddedItems = (state) => state.basket.addedItems
export const getSavedItems = (state) => state.basket.savedItems
export const getSaveState = (state) => {
  const addedItems = getAddedItems(state)
  const savedItems = getSavedItems(state)

  return compareArrays(addedItems, savedItems)
}
export const getTotalAmount = (state) => {
  const { data: allProducts } = state.catalog.products
  const basketProductsId = getAddedItems(state)
  const basketProducts = allProducts.filter(product => basketProductsId.includes(product.id))

  return basketProducts.reduce((acc, product) => {
    acc = acc + product.price
    return acc
  }, 0)

}

export const getProductsInBasket = (state) => {
  const allProducts = state.catalog.products.data
  const productsInBasketIds = state.basket.addedItems

  return allProducts.filter(({id}) => productsInBasketIds.includes(id))
}
