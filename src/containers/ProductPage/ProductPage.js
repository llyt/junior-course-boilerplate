import React from 'react'
import styles from './ProductPage.module.css'
import Filters from '../../components/Filters/Filters'
import ProductList from '../../components/ProductList/ProductList'

class ProductPage extends React.Component {

	

	render() {
		return (
			<div className={styles.ProductPage}>
				<Filters />
				<ProductList />
			</div>
		) 
	}
}

export default ProductPage