import * as types from './types'

const fetchProducts = (fetchedData) => (
  {
    type: types.FETCH_PRODUCTS,
    payload: {
      fetchedData
    }
  }
)

const onLoader = () => (
  {
    type: types.ON_LOADER,
  }
)

const offLoader = () => (
  {
    type: types.OFF_LOADER,
  }
)

const catchError = (error) => (
  {
    type: types.CATCH_ERROR,
    payload: {
      error: error.message
    }
  }
)

const addToBasket = (productId) => (
  {
    type: types.ADD_TO_BASKET,
    payload: {
      productId
    }
  }
)

const removeFromBasket = (productId) => (
  {
    type: types.REMOVE_FROM_BASKET,
    payload: {
      productId
    }
  }
)

const saveBasket = () => (
  {
    type: types.SAVE_BASKET,
  }
)

const onSaving = () => (
  {
    type: types.ON_SAVING,
  }
)

const offSaving = () => (
  {
    type: types.OFF_SAVING,
  }
)

const cleanBasket = () => (
  {
    type: types.CLEAN_BASKET,
  }
)

export {
  fetchProducts,
  onLoader,
  offLoader,
  catchError,
  addToBasket,
  removeFromBasket,
  saveBasket,
  onSaving,
  offSaving,
  cleanBasket
}

