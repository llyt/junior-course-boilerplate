import { createStore } from 'redux'
import { mainReducer } from './reducers'
import { maxBy } from 'csssr-school-utils'
import dataJSON from '../products'

const productPerPage = 6

const getListOfCategories = (data) => {
  const allCategoriesSet = new Set(data.map(({ category }) => category))
  const unSortedList = [...allCategoriesSet]

  return unSortedList.sort((a, b) => (a.name > b.name ? 1 : -1) || 0)
}

const initialState = {
  products: {
    data: dataJSON,
    currentPage: 1,
    perPage: productPerPage
  },
  filters: {
    listOfCategories: getListOfCategories(dataJSON),
    categories: [],
    minPrice: 0,
    maxPrice: maxBy(product => product.price, dataJSON).price,
    discount: 0
  },
  routing: {
    params: {}
  }
}

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const store = createStore(mainReducer, devTools)

export { store, initialState }