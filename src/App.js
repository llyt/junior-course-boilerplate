import React from 'react'
import './index.css'
import Filters from './components/Filters/Filters'
import Title from './components/UI/Title/Title'
import ProductList from './components/ProductList/ProductList'
import data from './products'
import { maxBy, minBy } from 'csssr-school-utils'

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			products: data, // [{}, {}, {}]
			prices: {
				min: minBy(product => product.price, data).price,
				max: maxBy(product => product.price, data).price
			}
		}
	}

	changeFilterPrice = event => {
		event.preventDefault();

		let minPrice = this.state.prices.min
		let maxPrice = this.state.prices.max

		if (event.target.name === 'from') {
			minPrice = event.target.value > 0 ? parseInt(event.target.value) : undefined
		} else {
			maxPrice = event.target.value > 0 ? parseInt(event.target.value) : undefined
		}

		this.filterPrice(minPrice, maxPrice)

	}

	filterPrice = (minPrice = 0, maxPrice = this.state.prices.max) => {
		let norlmalizeMaxPrice = maxPrice

		if (minPrice > maxPrice) {
			norlmalizeMaxPrice = minPrice + 10
		}

		const filteredItems = data.filter(product => product.price >= minPrice && product.price <= norlmalizeMaxPrice)

		this.setState({
			products: filteredItems,
			prices: {
				min: minPrice,
				max: maxPrice
			}
		})
	}

	render() {
		return (
			<div className="ProductPage">
				<Filters 
					prices={this.state.prices}
					changeFilterPrice={this.changeFilterPrice}
					/>
					{
						this.state.products.length === 0 
							? <div className='nothing'>
									<Title level="1">Список товаров</Title>
									Ничего не найдено
								</div> 
							: <ProductList products={this.state.products}/>
					}
			</div>
		) 
	}
}

export default App