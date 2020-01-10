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

	handleFilterForm = (name, value) => {
		return this.state[name] !== value
			? this.setState(state => ({...state, [name]: value}))
			: ''
	}

	getProducts = () => data.filter(product => (
		product.price >= this.state.minPrice && product.price <= this.state.maxPrice * (1 - this.state.discount / 100)))

	render() {
		const productList = this.getProducts()
		return (
			<div className="ProductPage">
				<Filters 
					prices={this.state.prices}
					minPrice={this.state.minPrice}
					maxPrice={this.state.maxPrice}
					discount={this.state.discount}
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