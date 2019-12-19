import React from 'react'
import './index.css'
import Title from './components/UI/Title/Title'
import ProductList from './components/ProductList/ProductList'

class App extends React.Component {
	render() {
		return (
			<div className="ProductPage">
				<Title>Список товаров</Title>
				<ProductList />
			</div>
		) 
	}
}

export default App