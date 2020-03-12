import mainReducer from './reducers'

import * as catalogSelectors from './selectors'
import * as catalogOperations from './operations'
import * as catalogActions from './actions'

export const initialState = {
  isLoading: false,
  error: null,
  products: {
    data: [],
    perPage: 6,
  },
  basket: {
    addedItems: [],
    savedItems: [],
    isSaving: false
  }
}

export {
  catalogSelectors,
  catalogOperations,
  catalogActions
}

export default mainReducer
