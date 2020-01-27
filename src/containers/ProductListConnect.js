import { connect } from 'react-redux'
import ProductList from '../components/ProductList/ProductList'

const getFilteredProducts = (products, categories, minPrice, maxPrice, discount) => {

	let resultProducts = products

	if (categories && categories.length !== 0) {
		resultProducts = resultProducts.filter(({category}) => categories.includes(category))
	}

	return resultProducts.filter(({price}) => {
		return price >= minPrice && price <= maxPrice * (1 - discount / 100)
	})
}

const mapStateToProps = (state) => {
	const {products, filters} = state
	const {categories, minPrice, maxPrice, discount} = filters
	const listOfProducts = getFilteredProducts(products, categories, minPrice, maxPrice, discount)
	console.log(listOfProducts)
	return {
		listOfProducts
	}
}

export const ProductListConnect = connect(mapStateToProps)(ProductList)