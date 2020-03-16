import { initialState } from './index'
import * as types from './types'

const mainReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.ADD_TO_BASKET:
      return {
        ...state,
        addedItems: [...state.addedItems, action.payload.productId],
      }

    case types.REMOVE_FROM_BASKET:
      const {productId: idToDelete} = action.payload
      const newBasketIds = state.addedItems.filter(productId => productId !== idToDelete)

      return {
        ...state,
        addedItems: newBasketIds,
      }

    case types.SAVE_BASKET:
      return {
        ...state,
        savedItems: [...state.addedItems]
      }

    case types.ON_SAVING:
      return {
        ...state,
        isSaving: true
      }

    case types.OFF_SAVING:
      return {
        ...state,
        isSaving: false
      }

    case types.CLEAN_BASKET:
      return {
        ...initialState,
        savedItems: state.savedItems
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
