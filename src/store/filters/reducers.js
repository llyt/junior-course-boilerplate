import { initialState } from './index'
import * as types  from './types'
import getListOfCategories from '../../utils/getListOfCategories'
import maxBy from 'csssr-school-utils/lib/maxBy'

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PRODUCTS:
      const products = action.payload.fetchedData
      const allCategories = getListOfCategories(products)
      const maxPrice = maxBy(product => product.price, products).price
      if (products.length === 0) {
        return state
      }

      return {
        ...state,
        initialValues: {
          allCategories,
          maxPrice
        },
        allCategories,
        maxPrice
      }

    case types.INPUT_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value
      }

    case types.RESET_INPUTS:
      return {
        ...initialState,
        initialValues: state.initialValues,
        allCategories: state.initialValues.allCategories,
        maxPrice: state.initialValues.maxPrice
      }

    default:
      return state
  }
}

export default mainReducer
