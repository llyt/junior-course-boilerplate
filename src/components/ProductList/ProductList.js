import React from 'react'
import styles from './ProductList.module.css'
import Title from '../UI/Title/Title'
import Pagination from '../UI/Pagination/Pagination'
import ProductItem from 'csssr-school-product-card'
import logRender from '../../hoc/logRender/logRender'
import priceWithSpaces from '../../utils/priceWithSpaces'

const ratingStarStyles = { display: 'inline-block', marginRight: 6 };

const ratingComponent = ({ isFilled }) => isFilled ? <div style={ratingStarStyles}>&#9733;</div> : <div style={ratingStarStyles}>&#9734;</div>;

class ProductList extends React.PureComponent {

  handlePaginationClick = (event) => {
    event.preventDefault();
    const nextNumberOfPage = event.target.innerHTML;
    this.props.paginationClick(nextNumberOfPage)
  };

  render() {
    return (
      <div className={styles.ProductList}>
        <Title level="1">Список товаров</Title>
        <ul>
          {this.props.list.map((item, index) => {
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
        <Pagination
          pagination={this.props.pagination}
          handleClick={this.handlePaginationClick}
        />
      </div>
    )
  }
}

export default logRender(ProductList)
