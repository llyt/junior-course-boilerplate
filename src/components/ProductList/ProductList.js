import React from 'react'
import styles from './ProductList.module.css'
import Title from '../UI/Title/Title'
import Pagination from '../UI/Pagination/Pagination'
import ProductItem from 'csssr-school-product-card'
import logRender from '../../hoc/logRender/logRender'
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
}

export default logRender(ProductList)