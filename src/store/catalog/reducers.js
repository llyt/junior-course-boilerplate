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

    case types.ADD_TO_BASKET:
      return {
        ...state,
        basket: {
          ...state.basket,
          addedItems: [...state.basket.addedItems, action.payload.productId],
        }
      }

    case types.REMOVE_FROM_BASKET:
      const {productId: idToDelete} = action.payload
      const newBasketIds = state.basket.addedItems.filter(productId => productId !== idToDelete)

      return {
        ...state,
        basket: {
          ...state.basket,
          addedItems: newBasketIds,
        }
      }

    case types.SAVE_BASKET:
      return {
        ...state,
        basket: {
          ...state.basket,
          savedItems: [...state.basket.addedItems]
        }
      }

    case types.ON_SAVING:
      return {
        ...state,
        basket: {
          ...state.basket,
          isSaving: true
        }
      }

    case types.OFF_SAVING:
      return {
        ...state,
        basket: {
          ...state.basket,
          isSaving: false
        }
      }

    case types.CLEAN_BASKET:
      return {
        ...state,
        basket: {
          ...initialState.basket,
          savedItems: state.basket.savedItems
        }
      }

    default:
      return state
  }
}

export default mainReducer
