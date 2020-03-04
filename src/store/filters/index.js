import mainReducer from './reducers'

import * as filtersSelectors from './selectors'
import * as filtersActions from './actions'

export const initialState = {
  allCategories: [],
  minPrice: 0,
  maxPrice: 0,
  discount: 0,
}

export {
  filtersSelectors,
  filtersActions
}

export default mainReducer
