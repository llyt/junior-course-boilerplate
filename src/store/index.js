import { createStore, combineReducers, applyMiddleware} from 'redux'
import sidebarReducer from './modules/sidebar'
import productListReducer from './modules/productList'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { composeWithDevTools } from 'redux-devtools-extension'

const history = createBrowserHistory()

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  filters: sidebarReducer,
  products: productListReducer,
})

const configureStore = (preloaderState) => {
  const store = createStore(
    createRootReducer(history),
    preloaderState,
    composeWithDevTools(
      applyMiddleware(
        routerMiddleware(history)
      )
    )
  )

  return store
}

export { configureStore, history }
