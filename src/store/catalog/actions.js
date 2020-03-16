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

export {
  fetchProducts,
  onLoader,
  offLoader,
  catchError,
}

