import React from 'react'
import './index.css'
import Filters from './components/Filters/Filters'
import ProductList from './components/ProductList/ProductList'
import data from './products'
import { maxBy, minBy } from 'csssr-school-utils'

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
				min: minBy(product => product.price, data).price,
				max: maxBy(product => product.price, data).price
>>>>>>> Fixes after marks
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

	// handleInputFrom = event => {
	// 	// console.log('Changed From', event.target.value)
	// 	const filteredItems = products.filter(product => product.price > event.target.value)
	// 	this.setState({
	// 		products: filteredItems
	// 	})
	// }

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

		this.setState({
			products: filteredItems,
			prices: {
				min: minPrice,
				max: norlmalizeMaxPrice
			}
		})
	}
>>>>>>> Fix state value of max price

	render() {
		return (
			<div className="ProductPage">
				<Filters 
					defaultPrices={defaultPrices}
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
			</div>
		) 
	}
}

export default App