import React from 'react'
import './index.css'
import Filters from './components/Filters/Filters'
import Title from './components/UI/Title/Title'
import ProductList from './components/ProductList/ProductList'
import data from './products'
import { maxBy } from 'csssr-school-utils'

const defaultMaxPrice = maxBy(product => product.price, data).price

class App extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			products: data, // [{}, {}, {}]
			minPrice: 0,
			maxPrice: defaultMaxPrice,
			discount: 0
		}
	}
	

	handleFilterForm = (name, value) => this.setState(state => ({...state, [name]: value}))

	getProducts = () => {
		const { minPrice, maxPrice, discount } = this.state
		return data.filter(product => (
			product.price >= minPrice && product.price <= maxPrice * (1 - discount / 100)))
	}

	render() {
		const { minPrice, maxPrice, discount } = this.state
		const productList = this.getProducts()
		return (
			<div className="ProductPage">
				<Filters 
					minPrice={minPrice}
					maxPrice={maxPrice}
					discount={discount}
					inputChange={this.handleFilterForm}
				/>
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