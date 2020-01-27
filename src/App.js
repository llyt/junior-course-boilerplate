import React from 'react'
import './index.css'
<<<<<<< HEAD
<<<<<<< HEAD
import Filters from './components/Filters/Filters'
<<<<<<< HEAD
=======
import Title from './components/UI/Title/Title'
<<<<<<< HEAD
import Loader from './components/UI/Loader/Loader'
>>>>>>> Made controlled inputs and instant reloading
=======
>>>>>>> Delete loader and timeout before update state
import ProductList from './components/ProductList/ProductList'
import data from './products'
import { getInitialState, AppContext } from './AppContext'
import queryString from 'query-string'

<<<<<<< HEAD
<<<<<<< HEAD
const defaultMaxPrice = maxBy(product => product.price, data).price

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
const products = data.reduce((acc, product) => [...acc, product], [])

const defaultPrices = products.reduce(
	(acc, item) => {
		acc.max = acc.max < item.price ? item.price : acc.max
		if (!acc.min) {
			acc.min = acc.max
		}
		acc.min = acc.min > item.price ? item.price : acc.min
		return acc
	}, {min: null, max: 0} 
)
=======
// const prices = data.reduce((acc, item) => {
// 		acc.max = acc.max < item.price ? item.price : acc.max
// 		if (!acc.min) {
// 			acc.min = acc.max
// 		}
// 		acc.min = acc.min > item.price ? item.price : acc.min
// 		return acc
// 	}, { min: null, max: 0 })
>>>>>>> Fixes after marks

=======
>>>>>>> Delete comments
class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
<<<<<<< HEAD
			products, // [{}, {}, {}]
			prices: { 
				min: defaultPrices.min,
				max: defaultPrices.max
=======
			products: data, // [{}, {}, {}]
<<<<<<< HEAD
			prices: {
<<<<<<< HEAD
				min: minBy(product => product.price, data).price,
				max: maxBy(product => product.price, data).price
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> Fixes after marks
=======
				min: 0,
<<<<<<< HEAD
				max: maxPriceFromData
>>>>>>> Added number mask for price filter
			}
		};
	}

	// handlePrice = prices => {
	// 	const filteredItems = products.filter(product => product.price > prices.from && product.price < prices.to)
	// 	this.setState({
	// 		products: filteredItems
	// 	})
	// 	return
	// }
=======
			},
			loading: false
=======
			}
>>>>>>> Delete loader and timeout before update state
=======
				max: defaultMaxPrice
			},
=======
			minPrice: 0,
			maxPrice: defaultMaxPrice,
>>>>>>> Fix after marks
			discount: 0
>>>>>>> Added discount filter
		}
=======
const getDefaultCategories = () => data.reduce((acc, {category}) => {
	if (category && !acc.find(categoryObj => categoryObj.name === category)) {
		const categoryObj = {
			name: category,
			isActive: false
=======
const getTotalCategories = () => {

	const unSortedList = data.reduce((acc, {category}) => {
		if (category && !acc.find(categoryObj => categoryObj.name === category)) {
			const categoryObj = {
				name: category,
				isActive: false
			}
			acc.push(categoryObj)
>>>>>>> Added sort for category
		}
		return acc
	}, [])

	return unSortedList.sort((a, b) => (a.name > b.name ? 1 : -1) || 0)
}
=======
class App extends React.Component {
>>>>>>> Made routing for category filter

	constructor(props) {
		super(props)
		this.state = getInitialState(data)
	}

	componentDidMount = () => {
		this.checkUrl()
		window.addEventListener('popstate', this.checkUrl)
	}

	componentWillUnmount() {
		window.removeEventListener('popstate', this.checkUrl)
	}

	checkUrl = () => {
		const currentParse = this.getParsedUrl() || []

<<<<<<< HEAD
	constructor(props) {
		super(props)
		this.state = INITIAL_STATE
>>>>>>> Added reset state button
=======
		if (JSON.stringify(currentParse) !== JSON.stringify(this.state.categories)) {
			this.setState({categories: currentParse})
		}
>>>>>>> Made routing for category filter
	}

	getParsedUrl = () => {
		const activeCategories = queryString.parse(window.location.search, {arrayFormat: 'comma'}).category
		return typeof activeCategories === 'string' ? [activeCategories] : activeCategories
	}

	resetFilters = () => {
		window.history.pushState({}, '', '/')
		this.setState({...getInitialState(data)})
	}
	
	handleFilterForm = (name, value) => this.setState(state => ({...state, [name]: value}))

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
	filterProducts = (minPrice = 0, maxPrice = defaultMaxPrice, discount = this.state.discount) => {
		return data.filter(product => product.price >= minPrice && product.price <= maxPrice * (1 - discount / 100))
	} 

<<<<<<< HEAD
	handleFilterPrice = (minPrice, maxPrice) => {
		let norlmalizeMaxPrice = maxPrice
>>>>>>> Made controlled inputs and instant reloading

	// handleInputFrom = event => {
	// 	// console.log('Changed From', event.target.value)
	// 	const filteredItems = products.filter(product => product.price > event.target.value)
	// 	this.setState({
	// 		products: filteredItems
	// 	})
	// }

<<<<<<< HEAD
<<<<<<< HEAD
	// handleInputTo = event => {
	// 	// console.log('Changed To', event.target.value)
	// 	const filteredItems = products.filter(product => product.price < event.target.value)
	// 	this.setState({
	// 		products: filteredItems
	// 	})
	// }
=======
		const filteredItems = data.filter(product => product.price >= minPrice && product.price <= norlmalizeMaxPrice)
=======
		const filteredItems = this.filterProducts(minPrice, norlmalizeMaxPrice)
>>>>>>> Added number mask for price filter

		this.setState({
			products: filteredItems,
			prices: {
				min: minPrice,
				max: norlmalizeMaxPrice
			}
		})
	}
>>>>>>> Fix state value of max price
=======
	applyPriceFrom = value => {
		if (value === '' || isNumber(value)) {
			const minPrice = value > 0 ? parseInt(value) : 0
			const maxPrice = this.state.prices.max <= minPrice ? minPrice + 10 : this.state.prices.max

			const filteredItems = this.filterProducts(minPrice, maxPrice)
			return this.setState({
				products: filteredItems,
				prices: {
					min: minPrice,
					max: maxPrice
				}
			})
		}	
}
>>>>>>> Added discount filter

	applyPriceTo = value => {
		if (value === '' || isNumber(value)) {
			const minPrice = this.state.prices.min >= value ? 0 : this.state.prices.min
			const maxPrice = value > 0 ? parseInt(value) : 0

			const filteredItems = this.filterProducts(minPrice, maxPrice)

			return this.setState({
				products: filteredItems,
				prices: {
					min: minPrice,
					max: maxPrice
				}
			})
		}		
	}

	applyPriceSale = value => {
		if (value === '' || isNumber(value)) {
			const filteredItems = this.filterProducts(this.state.prices.min, this.state.prices.max, value)
			return this.setState({
				products: filteredItems,
				discount: parseInt(value) || 0
			})
		}		
=======
	handleHOC = (name, value) => {
		this.hocDispatch[name](value)
>>>>>>> Added HOC for inputs
	}

	filterProducts = () => data.filter(product => product.price >= this.state.prices.min && product.price <= this.state.prices.max * (1 - this.state.discount / 100))
=======
	filterProducts = () => data.filter(product => (
		product.price >= this.state.minPrice && product.price <= this.state.maxPrice * (1 - this.state.discount / 100))
	)
>>>>>>> Fix after marks
=======
	getProducts = () => data.filter(product => (
		product.price >= this.state.minPrice && product.price <= this.state.maxPrice * (1 - this.state.discount / 100)))
>>>>>>> Added shallow compare
=======
=======
	handleFilterCategory = event => {
		const categoryName = event.target.innerHTML

		const currentParseCategories = this.state.categories

		let url = '/'

		if (currentParseCategories.includes(categoryName)) {
			if (currentParseCategories.length > 1) {
				const newCategories = currentParseCategories.filter(category => category !== categoryName)
				url = `?category=${newCategories.join(',')}`
			}
		} else {
			const newCategories = currentParseCategories.filter(category => category !== categoryName)
			const params = currentParseCategories.length === 0 ? categoryName : `${newCategories.join(',')},${categoryName}`
			url = `?category=${params}`
		}

		window.history.pushState({}, '', url)

		this.checkUrl()
	}

	getListOfCategories = (data) => {
		const allCategoriesSet = new Set(data.map(({category}) => category))
		const unSortedList = [...allCategoriesSet]

		return unSortedList.sort((a, b) => (a.name > b.name ? 1 : -1) || 0)
	}

<<<<<<< HEAD
>>>>>>> Added reset state button
	getProducts = () => {
		const {minPrice, maxPrice, discount, categories} = this.state
=======
	getFilteredProducts = (products, categories, minPrice, maxPrice, discount) => {

		let resultProducts = products
>>>>>>> Changes to clean functions

		if (categories && categories.length !== 0) {
			resultProducts = resultProducts.filter(({category}) => categories.includes(category))
		}

		return resultProducts.filter(({price}) => {
			return price >= minPrice && price <= maxPrice * (1 - discount / 100)
		})
	}
>>>>>>> Fixes after 2nd marks
=======
import { SidebarConnect } from './containers/SidebarConnect'
import { ProductListConnect } from './containers/ProductListConnect'
<<<<<<< HEAD
>>>>>>> Let's start to Reduxing
=======
=======
import { SidebarContainer } from './containers/SidebarContainer'
import { ProductListContainer } from './containers/ProductListContainer'
>>>>>>> Fixes after 2nd marks
import { connect } from 'react-redux'
import queryString from 'query-string'

export const getParsedUrl = () => {
	const activeCategories = queryString.parse(window.location.search, {arrayFormat: 'comma'}).category || []
	return typeof activeCategories === 'string' ? [activeCategories] : activeCategories
}

class App extends React.Component {

	componentDidMount() {
		this.checkUrl()
		window.addEventListener('popstate', this.checkUrl)
	}

	componentWillUnmount() {
		window.removeEventListener('popstate', this.checkUrl)
	}

	componentDidUpdate() {
		this.pushStateToBrowser()
	}

	checkUrl = () => {
		const currentParse = getParsedUrl() || []
	
		if (JSON.stringify(currentParse) !== JSON.stringify(this.props.categories)) {
			this.props.changeCategories(currentParse)
		}
	}

	pushStateToBrowser = () => {
		const currentParse = getParsedUrl() || []

		if (JSON.stringify(currentParse) !== JSON.stringify(this.props.categories)) {
			const categories = this.props.categories || []
			const url = categories.length !== 0 ? `?category=${categories.join(',')}` : '/'
			window.history.pushState({}, '', url)
		}
	}
>>>>>>> Fixes after marks

	render() {
		return (
			<div className="ProductPage">
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
				<Filters 
<<<<<<< HEAD
<<<<<<< HEAD
					defaultPrices={defaultPrices}
=======
					prices={this.state.prices}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
					changeFilterPrice={this.changeFilterPrice}
>>>>>>> Made controlled inputs and instant reloading
					/>
<<<<<<< HEAD
				<ProductList products={this.state.products}/>
=======
					{
						this.state.products.length === 0 
							? <div className='nothing'>
									<Title level="1">Список товаров</Title>
									Ничего не найдено
								</div> 
							: <ProductList products={this.state.products}/>
					}
>>>>>>> Fixes after marks
=======
					handlePriceInput={this.handlePriceInput}
					onBlurHandleInput={this.onBlurHandleInput}
=======
					discount={this.state.discount}
<<<<<<< HEAD
					handleFilterInput={this.handleFilterInput}
>>>>>>> Added discount filter
=======
					inputChange={this.handleHOC}
>>>>>>> Added HOC for inputs
=======
					minPrice={this.state.minPrice}
					maxPrice={this.state.maxPrice}
					discount={this.state.discount}
=======
					minPrice={minPrice}
					maxPrice={maxPrice}
					discount={discount}
>>>>>>> Fixes after 2nd marks
					inputChange={this.handleFilterForm}
>>>>>>> Fix after marks
				/>
=======
				<AppContext.Provider 
					value={{
						minPrice,
						maxPrice,
						discount,
						listOfCategories,
						categories,
						inputChange: this.handleFilterForm,
						handleCategoryFilter: this.handleFilterCategory,
						handleReset: this.resetFilters
					}}
				>
					<Filters />
				</AppContext.Provider>
>>>>>>> Added reset state button
				{
					productList.length !== 0
					? <ProductList products={productList}/>
					: <div className="nothing">
							<Title level="1">Список товаров</Title>
							<p>Ничего не найдено</p>
						</div>
				}
>>>>>>> Added number mask for price filter
=======
					<SidebarConnect />
					<ProductListConnect />
>>>>>>> Let's start to Reduxing
=======
				<SidebarConnect />
				<ProductListConnect />
>>>>>>> Fixes after marks
=======
				<SidebarContainer />
				<ProductListContainer />
>>>>>>> Fixes after 2nd marks
			</div>
		) 
	}
}

const mapStateToProps = (state) => {
	const {categories} = state.filters
	return {
		categories
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		changeCategories: (newCategories) => dispatch({type: "CHANGED_CATEGORIES_IN_URL", payload: {categories: newCategories}})
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)