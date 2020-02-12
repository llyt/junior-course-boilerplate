import { createStore, combineReducers } from 'redux'
import sidebarReducer from './modules/sidebar'
import productListReducer from './modules/productList'

const reducers = combineReducers({
  filters: sidebarReducer,
  products: productListReducer,
})

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const store = createStore(reducers, devTools)

export { store }