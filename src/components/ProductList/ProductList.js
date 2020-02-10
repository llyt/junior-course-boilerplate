import React from 'react'
import styles from './ProductList.module.css'
<<<<<<< HEAD
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
=======
import Title from '../UI/Title/Title'
<<<<<<< HEAD
import { PaginationContainer } from '../../containers/PaginationContainer'
>>>>>>> start
=======
import Pagination from '../UI/Pagination/Pagination'
>>>>>>> Added pagination
import ProductItem from 'csssr-school-product-card'
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import data from '../../products'
>>>>>>> Fixes after marks
=======
import Title from '../UI/Title/Title'
>>>>>>> Merge prev task
=======
import logRender from '../../hoc/logRender'
>>>>>>> Fixes after marks
=======
import logRender from '../logRender'
>>>>>>> Using logRender via inheritance
=======
import logRender from '../../hoc/logRender/logRender'
<<<<<<< HEAD
>>>>>>> Added shallow compare

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

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
const ProductList = props => (
	<ul className={styles.ProductList}>
		<Title>Список товаров</Title>
		{ props.products.map((item, index) => {
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
)
>>>>>>> Merge prev task
export default ProductList
=======
class ProductList extends React.Component {
=======
class ProductList extends logRender {
>>>>>>> Using logRender via inheritance
=======
const ProductItemHOC = logRender(ProductItem)

<<<<<<< HEAD
class ProductList extends React.PureComponent {
>>>>>>> Added shallow compare
=======
class ProductList extends React.Component {
>>>>>>> Added sort for category
=======
class ProductList extends React.PureComponent {
<<<<<<< HEAD

	getFilteredProducts = (products, categories, minPrice, maxPrice, discount) => {

		let resultProducts = products
	
		if (categories && categories.length !== 0) {
			resultProducts = resultProducts.filter(({category}) => categories.includes(category))
		}
	
		return resultProducts.filter(({price}) => {
			return price >= minPrice && price <= maxPrice * (1 - discount / 100)
		})
	}
>>>>>>> Let's start to Reduxing

=======
>>>>>>> Fixes after marks
	render() {
		return (
			<div className={styles.ProductList}>
				<Title level="1">Список товаров</Title>
				<ul>
					{this.props.listOfProducts.map((item, index) => {
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
				<PaginationContainer />
			</div>
		)
	}
=======
import priceWithSpaces from '../../utils/priceWithSpaces'

const ratingStarStyles = { display: 'inline-block', marginRight: 6 }

const ratingComponent = ({ isFilled }) => isFilled ? <div style={ratingStarStyles}>&#9733;</div> : <div style={ratingStarStyles}>&#9734;</div>

class ProductList extends React.PureComponent {
  render() {
    return (
      <div className={styles.ProductList}>
        <Title level="1">Список товаров</Title>
        <ul>
          {this.props.productsPerPage.map((item, index) => {
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
        <Pagination content={this.props.pagination} handleClick={this.props.handlePaginationClick} />
      </div>
    )
  }
>>>>>>> Added pagination
}

<<<<<<< HEAD
<<<<<<< HEAD
export default logRender(ProductList)
>>>>>>> Fixes after marks
=======
export default ProductList
>>>>>>> Using logRender via inheritance
=======
export default logRender(ProductList)
>>>>>>> Added shallow compare
