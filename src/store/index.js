import { createStore } from 'redux'
import { mainReducer } from './reducers'
import { maxBy } from 'csssr-school-utils'
import queryString from 'query-string'
import dataJSON from '../products'

const getListOfCategories = (data) => {
	const allCategoriesSet = new Set(data.map(({category}) => category))
	const unSortedList = [...allCategoriesSet]

	return unSortedList.sort((a, b) => (a.name > b.name ? 1 : -1) || 0)
}

const getParsedUrl = () => {
	const activeCategories = queryString.parse(window.location.search, {arrayFormat: 'comma'}).category || []
	return typeof activeCategories === 'string' ? [activeCategories] : activeCategories
}

const initialState = {
	products: dataJSON,
	listOfCategories: getListOfCategories(dataJSON),
	categories: getParsedUrl(),
	minPrice: 0,
	maxPrice: maxBy(product => product.price, dataJSON).price,
	discount: 0
}

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const store = createStore(mainReducer, devTools)

const checkUrl = () => {
	const currentParse = getParsedUrl() || []

	console.log('CurrentParse', JSON.stringify(currentParse))
	console.log('store.categories', JSON.stringify(store.getState().categories))

	if (JSON.stringify(currentParse) !== JSON.stringify(store.getState().categories)) {
		store.dispatch({type: "CHECK_URL", payload: {activeCategories: currentParse}})
	}
}

window.addEventListener('popstate', checkUrl)

export {store, initialState, getParsedUrl}