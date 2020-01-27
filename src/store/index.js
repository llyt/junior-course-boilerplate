import { createStore } from 'redux'
import { mainReducer } from './reducers'
import { maxBy } from 'csssr-school-utils'
import dataJSON from '../products'

const getListOfCategories = (data) => {
	const allCategoriesSet = new Set(data.map(({category}) => category))
	const unSortedList = [...allCategoriesSet]

	return unSortedList.sort((a, b) => (a.name > b.name ? 1 : -1) || 0)
}

const initialState = {
	products: dataJSON,
	listOfCategories: getListOfCategories(dataJSON),
	filters: {
		categories: [],
		minPrice: 0,
		maxPrice: maxBy(product => product.price, dataJSON).price,
		discount: 0
	}
}

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const store = createStore(mainReducer, devTools)

export {store, initialState}