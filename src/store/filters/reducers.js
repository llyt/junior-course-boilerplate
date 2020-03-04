import { initialState } from './index'
import getListOfCategories from '../../utils/getListOfCategories'
import maxBy from 'csssr-school-utils/lib/maxBy'

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS':
      const products = action.payload.fetchedData

      if (products.length === 0) {
        return state
      }

      return {
        ...state,
        allCategories: getListOfCategories(products),
        maxPrice: maxBy(product => product.price, products).price
      }

    case 'INPUT_CHANGE':
      return {
        ...state,
        [action.payload.name]: action.payload.value
      }

    case 'RESET_INPUTS':
      return {
        ...initialState,
        allCategories: state.allCategories,
        maxPrice: state.maxPrice
      }

    default:
      return state
  }
}

export default mainReducer
