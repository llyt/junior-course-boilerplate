import mainReducer from './reducers'

import * as basketSelectors from './selectors'
import * as basketOperations from './operations'
import * as basketActions from './actions'

export const initialState = {
  error: null,
  addedItems: [],
  savedItems: [],
  isSaving: false
}

export {
  basketSelectors,
  basketOperations,
  basketActions
}

export default mainReducer
