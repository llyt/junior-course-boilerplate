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
			prices: {
				min: 0,
				max: defaultMaxPrice
			},
			discount: 0
		}
	}

	hocDispatch = {
		"from": value => this.setState({
			prices:{
				min: parseInt(value) || 0, 
				max: this.state.prices.max
			}
		}),
		"to": value => this.setState({
			prices:{
				min: this.state.prices.min,
				max: parseInt(value) || 0
			}
		}),
		"sale": value => this.setState({discount: parseInt(value) || 0})
	}

	handleHOC = (name, value) => {
		this.hocDispatch[name](value)
	}

	filterProducts = () => data.filter(product => product.price >= this.state.prices.min && product.price <= this.state.prices.max * (1 - this.state.discount / 100))

	render() {
		const productList = this.filterProducts()
		return (
			<div className="ProductPage">
				<Filters 
					prices={this.state.prices}
					discount={this.state.discount}
					inputChange={this.handleHOC}
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