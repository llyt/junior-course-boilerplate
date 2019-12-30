import React from 'react'
import './index.css'
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
import { maxBy } from 'csssr-school-utils'

const maxPriceFromData = maxBy(product => product.price, data).price

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
			prices: {
<<<<<<< HEAD
				min: minBy(product => product.price, data).price,
				max: maxBy(product => product.price, data).price
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> Fixes after marks
=======
				min: 0,
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
		}
	}

	isNumber = value => {
		const numRegExp = /^[0-9\b]+$/
		return numRegExp.test(value)
	}

	filterProducts = (minPrice = 0, maxPrice = maxPriceFromData) => data.filter(product => product.price >= minPrice && product.price <= maxPrice)

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

	onBlurHandleInput = event => {
		const {name, value} = event.target

		if (value === '' || this.isNumber(value)) {
			return
		}

		if (name === 'from') {
			console.log('Need to set min price to 0')
			return this.setState({
				...this.state,
				prices: {
					min: 0,
					max: this.state.prices.max
				}
			})
		} else {
			console.log('Need to set max price to max price')
			return this.setState({
				...this.state,
				prices: {
					min:	this.state.prices.min,
					max: maxPriceFromData
				}
			})
		}
	}

	handlePriceInput = event => {
		event.preventDefault()

		const {name, value} = event.target

		let minPrice = this.state.prices.min
		let maxPrice = this.state.prices.max

		if (name === 'from') {
			minPrice = value > 0 ? parseInt(value) : undefined
		} else {
			maxPrice = value > 0 ? parseInt(value) : undefined
		}

		return (value === '' || this.isNumber(value)) ? this.handleFilterPrice(minPrice, maxPrice) : null
	}

	render() {
		return (
			<div className="ProductPage">
				<Filters 
<<<<<<< HEAD
					defaultPrices={defaultPrices}
=======
					prices={this.state.prices}
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
				/>
				{
					this.state.products.length === 0 
						? <div className='nothing'>
								<Title level="1">Список товаров</Title>
								<p>Ничего не найдено</p>
							</div> 
						: <ProductList products={this.state.products}/>
				}
>>>>>>> Added number mask for price filter
			</div>
		) 
	}
}

export default App