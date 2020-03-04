import { initialState } from './index'

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS':
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

    case 'ON_LOADER':
      return {
        ...state,
        isLoading: true
      }

    case 'OFF_LOADER':
      return {
        ...state,
        isLoading: false
      }

    case 'CATCH_ERROR':
      return {
        ...state,
        error: action.payload.error
      }

    default:
      return state
  }
}

export default mainReducer
