import React from 'react'
import './index.css'
import Filters from './components/Filters/Filters'
import Title from './components/UI/Title/Title'
import ProductList from './components/ProductList/ProductList'
import data from './products'

const prices = data.reduce((acc, item) => {
		acc.max = acc.max < item.price ? item.price : acc.max
		if (!acc.min) {
			acc.min = acc.max
		}
		acc.min = acc.min > item.price ? item.price : acc.min
		return acc
	}, { min: null, max: 0 })

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			products: data, // [{}, {}, {}]
			prices: {
				min: prices.min,
				max: prices.max
			}
		}
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
					handleFilterPrice={this.filterPrice}
					/>
					{
						this.state.products.length === 0 
							? <div style={{width: 800, paddingLeft: 35}}>
									<Title>Список товаров</Title>
									Ничего не найдено
								</div> 
							: <ProductList products={this.state.products}/>
					}
			</div>
		) 
	}
}

export default App