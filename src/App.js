import React from 'react'
import './index.css'
import Filters from './components/Filters/Filters'
import Title from './components/UI/Title/Title'
import ProductList from './components/ProductList/ProductList'
import data from './products'
import { maxBy } from 'csssr-school-utils'

const maxPriceFromData = maxBy(product => product.price, data).price

class App extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			products: data, // [{}, {}, {}]
			prices: {
				min: 0,
				max: maxPriceFromData
			}
		}
	}

	isNumber = value => {
		const numRegExp = /^[0-9\b]+$/
		return numRegExp.test(value)
	}

	filterProducts = (minPrice = 0, maxPrice = maxPriceFromData) => data.filter(product => product.price >= minPrice && product.price <= maxPrice)

	handleFilterPrice = (minPrice, maxPrice) => {
		let norlmalizeMaxPrice = maxPrice

		if (minPrice > maxPrice) {
			norlmalizeMaxPrice = minPrice + 10
		}

		const filteredItems = this.filterProducts(minPrice, norlmalizeMaxPrice)

		this.setState({
			products: filteredItems,
			prices: {
				min: minPrice,
				max: norlmalizeMaxPrice
			}
		})
	}

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
					prices={this.state.prices}
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
			</div>
		) 
	}
}

export default App