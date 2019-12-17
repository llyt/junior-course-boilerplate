import React from 'react'
import styles from './ProductPage.module.css'
import H1Item from '../../components/UI/H1Item/H1Item'
import ProductList from '../../components/ProductList/ProductList'

class ProductPage extends React.Component {

	render() {
		return (
			<div className={styles.ProductPage}>
				<H1Item content='Список товаров'/>
				<ProductList />
			</div>
		) 
	}
}

export default ProductPage