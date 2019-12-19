import React from 'react'
import styles from './ProductList.module.css'
<<<<<<< HEAD
import ProductItem from '../../containers/ProductItem/ProductItem'
import H1Item from '../../components/UI/H1Item/H1Item'
import pic1 from '../../img/1.jpg'
import pic2 from '../../img/2.jpg'
import pic3 from '../../img/3.jpg'
import pic4 from '../../img/4.jpg'
import pic5 from '../../img/5.jpg'
import pic6 from '../../img/6.jpg'
=======
import ProductItem from 'csssr-school-product-card'
import data from '../../products'
>>>>>>> Fixes after marks

const ratingStarStyles = {display: "inline-block", marginRight: 6}

const ratingComponent = ({ isFilled }) => isFilled ? <div style={ratingStarStyles}>&#9733;</div> : <div style={ratingStarStyles}>&#9734;</div>

<<<<<<< HEAD
const ProductList = props => {
	const goodsList = props.products.map((item, index) => {
		return (
			<li key={index}>
				<ProductItem 
					isInStock={item.isInStock}
					img={pictures[index]}
					title={item.title}
					price={item.price}
					subPriceContent={item.subPriceContent}
					maxRating={item.maxRating}
					rating={item.rating}
					ratingComponent={ratingComponent}
				/>
			</li>
		)
	})
	return (
		<div className={styles.ProductList}>
			<H1Item content='Список товаров'/>
			{ goodsList === undefined || goodsList.length === 0
				? <div style={{margin: "40px 0 0 20px"}}>Товары не найдены</div>
				: <ul>
						{ goodsList }
					</ul>
			 }
		</div>
	)
}
	
=======
const priceWithSpaces = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")

const ProductList = props => <ul className={styles.ProductList}>{ data.map((item, index) => {
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
		</ul>
>>>>>>> Fixes after marks
export default ProductList