import { initialState } from './index'
import { maxBy } from 'csssr-school-utils'

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS':
      const products = action.payload.data
      const getListOfCategories = (data) => {
        const allCategoriesSet = new Set(data.map(({ category }) => category));
        const unSortedList = [...allCategoriesSet];

        return unSortedList.sort((a, b) => (a.name > b.name ? 1 : -1) || 0)
      }

      if (products.length === 0) {
        return {
          ...state,
        }
      }
      return {
        ...state,
        products: {
          ...state.products,
          data: products
        },
        filters: {
          ...state.filters,
          allCategories: getListOfCategories(products),
          maxPrice: maxBy(product => product.price, products).price
        }
      }

    case 'CHANGE_LOADER_STATUS':
      return {
        ...state,
        isLoading: !state.isLoading
      }

    case 'CATCH_ERROR':
      return {
        ...state,
        error: action.payload.error
      }

    case 'INPUT_CHANGE':
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.name]: action.payload.value
        }
      }

    case 'RESET_INPUTS':
      return {
        ...initialState,
        products: {
          ...initialState.products,
          data: state.products.data
        },
        filters: {
          ...initialState.filters,
          allCategories: state.filters.allCategories,
          maxPrice: state.filters.maxPrice
        }
      }

    default:
      return state
  }
}

export default mainReducer
