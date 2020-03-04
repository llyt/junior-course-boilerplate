import { initialState } from './index'
import * as types from './types'

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PRODUCTS:
      const products = action.payload.fetchedData

      if (products.length === 0) {
        return state
      }

      return {
        ...state,
        products: {
          ...state.products,
          data: products
        },
      }

    case types.ON_LOADER:
      return {
        ...state,
        isLoading: true
      }

    case types.OFF_LOADER:
      return {
        ...state,
        isLoading: false
      }

    case types.CATCH_ERROR:
      return {
        ...state,
        error: action.payload.error
      }

    default:
      return state
  }
}

export default mainReducer
