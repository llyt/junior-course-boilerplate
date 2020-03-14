import { createStore, combineReducers, applyMiddleware} from 'redux'
import catalogReducer from './catalog'
import filtersReducer from './filters'
import basketReducer from './basket'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const history = createBrowserHistory()

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  catalog: catalogReducer,
  filters: filtersReducer,
  basket: basketReducer
})

const configureStore = (preloaderState) => {
  const store = createStore(
    createRootReducer(history),
    preloaderState,
    composeWithDevTools(
      applyMiddleware(
        routerMiddleware(history),
        thunk
      )
    )
  )

  return store
}

export { configureStore, history }
