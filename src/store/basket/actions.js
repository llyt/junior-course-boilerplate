import * as types from './types'

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

const catchError = (error) => (
  {
    type: types.CATCH_ERROR,
    payload: {
      error: error.message
    }
  }
)

export {
  addToBasket,
  removeFromBasket,
  saveBasket,
  onSaving,
  offSaving,
  cleanBasket,
  catchError
}

