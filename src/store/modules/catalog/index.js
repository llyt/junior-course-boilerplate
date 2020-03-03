import mainReducer from './reducers'

import * as catalogSelectors from './selectors'
import * as catalogOperations from './operations'
import * as catalogActions from './actions'

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
  catalogSelectors,
  catalogOperations,
  catalogActions
}

export default mainReducer
