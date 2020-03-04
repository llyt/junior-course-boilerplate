import { initialState } from './index'
import * as types  from './types'
import getListOfCategories from '../../utils/getListOfCategories'
import maxBy from 'csssr-school-utils/lib/maxBy'

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PRODUCTS:
      const products = action.payload.fetchedData

      if (products.length === 0) {
        return state
      }

      return {
        ...state,
        allCategories: getListOfCategories(products),
        maxPrice: maxBy(product => product.price, products).price
      }

    case types.INPUT_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value
      }

    case types.RESET_INPUTS:
      const { allProducts } = action.payload
      return {
        ...initialState,
        allCategories: state.allCategories,
        maxPrice: maxBy(product => product.price, allProducts).price
      }

    default:
      return state
  }
}

export default mainReducer
