import mainReducer from './reducers'

import * as catalogSelectors from './selectors'

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

export {
  catalogSelectors
}

export default mainReducer
