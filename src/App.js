import React from 'react'
import './index.css'
import Filters from './components/Filters/Filters'
import Title from './components/UI/Title/Title'
import ProductList from './components/ProductList/ProductList'
import data from './products'
import { maxBy } from 'csssr-school-utils'

const defaultMaxPrice = maxBy(product => product.price, data).price
const isNumber = value => (/^[0-9\b]+$/).test(value)

class App extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			products: data, // [{}, {}, {}]
			prices: {
				min: 0,
				max: defaultMaxPrice
			},
			discount: 0
		}
	}

	filterInputMap = {
		"from": value => this.applyPriceFrom(value),
		"to": value => this.applyPriceTo(value),
		"sale": value => this.applyPriceSale(value)
	}

	filterProducts = (minPrice = 0, maxPrice = defaultMaxPrice, discount = this.state.discount) => {
		return data.filter(product => product.price >= minPrice && product.price <= maxPrice * (1 - discount / 100))
	} 

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
	}

	handleFilterInput = event => {
		event.preventDefault()

		const {name, value} = event.target

		this.filterInputMap[name](value)
	}

	render() {
		return (
			<div className="ProductPage">
				<Filters 
					prices={this.state.prices}
					discount={this.state.discount}
					handleFilterInput={this.handleFilterInput}
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