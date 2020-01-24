import { connect } from 'react-redux'
import ProductList from '../components/ProductList/ProductList'

const mapStateToProps = (state) => {
	const {products, categories, minPrice, maxPrice, discount} = state
	return {
		products,
		categories,
		minPrice,
		maxPrice,
		discount
	}
}

export const ProductListConnect = connect(mapStateToProps)(ProductList)