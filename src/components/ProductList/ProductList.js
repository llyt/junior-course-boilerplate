import React from 'react'
import styles from './ProductList.module.css'
import Title from '../UI/Title/Title'
import ProductItem from 'csssr-school-product-card'
import logger from 'react-logger'

const ratingStarStyles = {display: "inline-block", marginRight: 6}

const ratingComponent = ({ isFilled }) => isFilled ? <div style={ratingStarStyles}>&#9733;</div> : <div style={ratingStarStyles}>&#9734;</div>

const priceWithSpaces = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")

class ProductList extends React.Component {

	shouldComponentUpdate(nextProps, nextState) {
		logger.log(this, this.state, nextProps, nextState);
		return true
	}

	render() {
		return (
		<ul className={styles.ProductList}>
			<Title>Список товаров</Title>
			{ this.props.products.map((item, index) => {
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
			)
			}) 
		}
	</ul>)
	}
}

export default ProductList