import mainReducer from './reducers'

export const initialState = {
  isLoading: false,
  error: null,
  filters: {
    allCategories: [],
    minPrice: 0,
    maxPrice: 0,
    discount: 0,
  },
  products: {
    data: [],
    perPage: 6,
  }
}

export default mainReducer

export {
  getListOfSidebarCategories,
  getMinPrice,
  getMaxPrice,
  getDiscount,
  getParamsFromState,
  getPaginatedProductList,
  makePagination,
  getLoadingState,
  getError
} from './selectors'
