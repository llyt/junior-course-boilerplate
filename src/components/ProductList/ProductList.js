import React from 'react'
import styles from './ProductList.module.css'
import Title from '../UI/Title/Title'
import Pagination from '../UI/Pagination/Pagination'
import ProductItem from 'csssr-school-product-card'
import logRender from '../../hoc/logRender/logRender'
import priceWithSpaces from '../../utils/priceWithSpaces'
import { NavLink } from 'react-router-dom'

const ratingStarStyles = { display: 'inline-block', marginRight: 6 }

const ratingComponent = ({ isFilled }) => isFilled ? <div style={ratingStarStyles}>&#9733;</div> : <div style={ratingStarStyles}>&#9734;</div>

class ProductList extends React.PureComponent {

  render() {
    const {list, params} = this.props
    const page = params.page || '1'

    return (
      <div className={styles.ProductList}>
        <Title level="1">Список товаров</Title>
        <ul>
          {(list[page - 1] || []).map((item, index) => {
            return (
              <NavLink key={index} to={`/product/${item.id}`}>
                <li>
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
              </NavLink>
            )
          })
          }
        </ul>
        <Pagination
          pagination={this.props.pagination}
          stateParams={this.props.params}
        />
      </div>
    )
  }
}

export default logRender(ProductList)
