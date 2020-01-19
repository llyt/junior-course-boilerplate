import React from 'react'
import { maxBy } from 'csssr-school-utils'
import dataJSON from './products'

export const getInitialState = (data) => {
	return {
		categories: [],
		minPrice: 0,
		maxPrice: maxBy(product => product.price, data).price,
		discount: 0
	}
}

const initState = getInitialState(dataJSON)

export const AppContext = React.createContext(initState)

