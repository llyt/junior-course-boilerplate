import React from 'react'
import './index.css'
import Filters from './components/Filters/Filters'
import Title from './components/UI/Title/Title'
import ProductList from './components/ProductList/ProductList'
import data from './products'
import { getInitialState, AppContext } from './AppContext'
import queryString from 'query-string'

class App extends React.Component {

	constructor(props) {
		super(props)
		this.state = getInitialState(data)
	}

	componentDidMount = () => {
		this.checkUrl()
		window.addEventListener('popstate', this.checkUrl);
	}

	componentWillUnmount() {
    window.removeEventListener('popstate', this.checkUrl);
  }

	checkUrl = () => {
		const currentParse = this.getParsedUrl() || []

		if (JSON.stringify(currentParse) !== JSON.stringify(this.state.categories)) {
			const categories = currentParse
			return this.setState({categories})
		}
	}

	getParsedUrl = () => {
		let activeCategories = queryString.parse(window.location.search, {arrayFormat: 'comma'}).category
		if (typeof activeCategories === 'string') {
			activeCategories = [activeCategories]
		}
		return activeCategories
	}

	resetFilters = () => {
		window.history.pushState({}, '', '/')
		return this.setState({...getInitialState(data)})
	}
	
	handleFilterForm = (name, value) => this.setState(state => ({...state, [name]: value}))

	handleFilterCategory = event => {
		const categoryName = event.target.innerHTML.toLowerCase()

		const currentParseCategories = this.state.categories

		let url = '/'

		if (currentParseCategories.includes(categoryName)) {
			if (currentParseCategories.length > 1) {
				const newCategories = currentParseCategories.filter(category => category !== categoryName)
				url = `?category=${newCategories.join(',')}`
			}
		} else {
			const newCategories = currentParseCategories.filter(category => category !== categoryName)
			const params = currentParseCategories.length === 0 ? `${categoryName}` : `${newCategories.join(',')},${categoryName}`
			url = `?category=${params}`
		}

		window.history.pushState({}, '', url)

		return this.checkUrl()

	}

	getListOfCategories = () => {
		const unSortedList = data.reduce((acc, {category}) => {
			if (category && !acc.find(cat => cat === category)) {
				acc.push(category)
			}
			return acc
		}, [])
	
		return unSortedList.sort((a, b) => (a.name > b.name ? 1 : -1) || 0)
	}

	getProducts = () => {
		const {minPrice, maxPrice, discount, categories} = this.state

		const filteredByCategory = categories.length !== 0 ? data.filter(({category}) => categories.includes(category)) : data
		const filteredByPrice = filteredByCategory.filter(({price}) => price >= minPrice && price <= maxPrice)
		const filteredByDiscount = filteredByPrice.filter(({price}) => price <= maxPrice * (1 - discount / 100))

		return filteredByDiscount
	}

	render() {
		const { minPrice, maxPrice, discount, categories } = this.state
		const productList = this.getProducts()
		const listOfCategories = this.getListOfCategories()

		return (
			<div className="ProductPage">
				<AppContext.Provider 
					value={{
						minPrice,
						maxPrice,
						discount,
						listOfCategories,
						categories,
						inputChange: this.handleFilterForm,
						handleCategoryFoo: this.handleFilterCategory,
						resetFoo: this.resetFilters
					}}
				>
					<Filters />
				</AppContext.Provider>
				{
					productList.length !== 0
					? <ProductList products={productList}/>
					: <div className='nothing'>
							<Title level="1">Список товаров</Title>
							<p>Ничего не найдено</p>
						</div>
				}
			</div>
		) 
	}
}

export default App