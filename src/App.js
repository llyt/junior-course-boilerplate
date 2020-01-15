import React from 'react'
import './index.css'
import Filters from './components/Filters/Filters'
import Title from './components/UI/Title/Title'
import ProductList from './components/ProductList/ProductList'
import data from './products'
import { maxBy } from 'csssr-school-utils'

const getTotalCategories = () => {

	const unSortedList = data.reduce((acc, {category}) => {
		if (category && !acc.find(categoryObj => categoryObj.name === category)) {
			const categoryObj = {
				name: category,
				isActive: false
			}
			acc.push(categoryObj)
		}
		return acc
	}, [])

	return unSortedList.sort((a, b) => (a.name > b.name ? 1 : -1) || 0)
}

export const AppContext = React.createContext()

const defaultCategoies = getTotalCategories()

const INITIAL_STATE = {
	categories: defaultCategoies, // [{name, status}, ...]
	minPrice: 0,
	maxPrice: maxBy(product => product.price, data).price,
	discount: 0
}

class App extends React.Component {

	constructor(props) {
		super(props)
		this.state = INITIAL_STATE
	}

	hasFilterCategory = () => this.state.categories.find(categoryObj => categoryObj.isActive)

	resetFilters = () => this.setState({...INITIAL_STATE, categories: getTotalCategories()})
	
	handleFilterForm = (name, value) => this.setState(state => ({...state, [name]: value}))

	handleFilterCategory = event => {
		const categoryName = event.target.innerHTML.toLowerCase()
		let { categories } = this.state

		const targetObj = categories.findIndex((obj => obj.name === categoryName))

		categories[targetObj].isActive = !categories[targetObj].isActive

		return this.setState({
			categories
		})

	}

	getProducts = () => {
		const {minPrice, maxPrice, discount, categories } = this.state

		const filteredByCategory = this.hasFilterCategory()
			? data.filter(({category}) =>
				categories.find(categoryObj => 
						categoryObj.name === category && categoryObj.isActive))
			: data
		const filteredByPrice = filteredByCategory.filter(({price}) => price >= minPrice && price <= maxPrice)
		const filteredByDiscount = filteredByPrice.filter(({price}) => price <= maxPrice * (1 - discount / 100))

		return filteredByDiscount
	}

	render() {
		const { minPrice, maxPrice, discount } = this.state
		const productList = this.getProducts()
		return (
			<div className="ProductPage">
				<AppContext.Provider 
					value={{
						categories: this.state.categories,
						handleCategoryFoo: this.handleFilterCategory,
						resetFoo: this.resetFilters
					}}
				>
					<Filters 
						minPrice={minPrice}
						maxPrice={maxPrice}
						discount={discount}
						inputChange={this.handleFilterForm}
					/>
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