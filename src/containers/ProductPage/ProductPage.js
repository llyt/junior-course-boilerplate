import React from 'react'
import styles from './ProductPage.module.css'
import Filters from '../../components/Filters/Filters'
import ProductList from '../../components/ProductList/ProductList'
import data from '../../products'

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

class ProductPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			products // [{}, {}, {}]
		};
	}

	handleInputFrom = event => {
		// console.log('Changed From', event.target.value)
		const filteredItems = products.filter(product => product.price > event.target.value)
		this.setState({
			products: filteredItems
		})
	}

	handleInputTo = event => {
		// console.log('Changed To', event.target.value)
		const filteredItems = products.filter(product => product.price < event.target.value)
		this.setState({
			products: filteredItems
		})
	}

	render() {
		return (
			<div className={styles.ProductPage}>
				<Filters 
					handlePrice={{
						from: this.handleInputFrom, 
						to: this.handleInputTo
					}}
					defaultPrices={defaultPrices}
					/>
				<ProductList products={this.state.products}/>
			</div>
		) 
	}
}

export default ProductPage