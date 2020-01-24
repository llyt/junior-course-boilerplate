import React from 'react'
import styles from './ProductList.module.css'
import Title from '../UI/Title/Title'
import ProductItem from 'csssr-school-product-card'
import logRender from '../../hoc/logRender/logRender'

const ratingStarStyles = {display: "inline-block", marginRight: 6}

const ratingComponent = ({ isFilled }) => isFilled ? <div style={ratingStarStyles}>&#9733;</div> : <div style={ratingStarStyles}>&#9734;</div>

const priceWithSpaces = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")

class ProductList extends React.PureComponent {

	getFilteredProducts = (products, categories, minPrice, maxPrice, discount) => {

		let resultProducts = products
	
		if (categories && categories.length !== 0) {
			resultProducts = resultProducts.filter(({category}) => categories.includes(category))
		}
	
		return resultProducts.filter(({price}) => {
			return price >= minPrice && price <= maxPrice * (1 - discount / 100)
		})
	}

	render() {
		const {products, categories, minPrice, maxPrice, discount} = this.props
		const listOfProducs = this.getFilteredProducts(products, categories, minPrice, maxPrice, discount)

		return (
			<div className={styles.ProductList}>
				<Title level="1">Список товаров</Title>
					<ul>
						{listOfProducs.map((item, index) => {
							return (
								<li key={index}>
									<ProductItem 
										isInStock={item.isInStock}
										img={item.img}
										title={item.title}
										price={priceWithSpaces(item.price)}
										subPriceContent={priceWithSpaces(item.subPriceContent)}
										maxRating={item.maxRating}
										rating={item.rating}
										ratingComponent={ratingComponent}
									/>
								</li>
							)})
						}
					</ul>
			</div>
		)
	}
}

export default logRender(ProductList)