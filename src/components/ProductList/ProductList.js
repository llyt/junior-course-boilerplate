import React from 'react'
import styles from './ProductList.module.css'
import ProductItem from '../../containers/ProductItem/ProductItem'
import H1Item from '../../components/UI/H1Item/H1Item'
import pic1 from '../../img/1.jpg'
import pic2 from '../../img/2.jpg'
import pic3 from '../../img/3.jpg'
import pic4 from '../../img/4.jpg'
import pic5 from '../../img/5.jpg'
import pic6 from '../../img/6.jpg'

const pictures = [pic1, pic2, pic3, pic4, pic5, pic6]

const ratingComponent = ({ isFilled }) => isFilled ? <div>&#9733;</div> : <div>&#9734;</div>

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
	
export default ProductList