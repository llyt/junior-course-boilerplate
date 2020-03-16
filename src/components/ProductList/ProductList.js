import React from 'react'
import styles from './ProductList.module.css'
import Title from '../UI/Title/Title'
import Pagination from '../UI/Pagination/Pagination'
import ProductItem from 'csssr-school-product-card'
import logRender from '../../hoc/logRender/logRender'
import priceWithSpaces from '../../utils/priceWithSpaces'
import { NavLink } from 'react-router-dom'
import Button from '../UI/Button/Button'

const ratingStarStyles = { display: 'inline-block', marginRight: 6 }

const ratingComponent = ({ isFilled }) => isFilled ? <div style={ratingStarStyles}>&#9733;</div> : <div style={ratingStarStyles}>&#9734;</div>

class ProductList extends React.PureComponent {

  addProductToBasket = (event) => {
    this.props.addToBasketHandle(Number(event.target.dataset.tag))
  }

  removeProductFromBasket = (event) => {
    this.props.removeFromBasketHandle(Number(event.target.dataset.tag))
  }

  render() {
    const {list, params, pagination} = this.props
    const page = params.page || '1'

    return (
      <div className={styles.ProductList}>
        <Title level="1">Список товаров</Title>
        { list.length !== 0
            ? <ul>
                {(list[page - 1] || []).map((item) => {
                  const inBasket = this.props.productsInBasket.includes(item.id)

                  return (
                    <li key={item.id}>
                      <NavLink to={`/product/${item.id}`}>
                        <ProductItem
                          isInStock={item.status === 'IN_STOCK'}
                          img={`../img${item.img}`}
                          title={item.name}
                          price={priceWithSpaces(item.price)}
                          subPriceContent={priceWithSpaces(item.price)}
                          maxRating={5}
                          rating={item.stars}
                          ratingComponent={ratingComponent}
                        />
                      </NavLink>
                      { item.status === 'IN_STOCK'
                          && <div className={styles.BusketButton}>
                               <Button
                                 data={item.id}
                                 disabled={this.props.isBasketSaving}
                                 clickHandle={inBasket ? this.removeProductFromBasket : this.addProductToBasket}
                                >
                                  {inBasket ? 'Удалить из корзины' : 'Добавить в корзину'}
                                </Button>
                             </div>
                      }
                    </li>
                  )
                })}
              </ul>
            : 'Список пуст'}

        <Pagination
          pagination={pagination}
          stateParams={params}
        />
      </div>
    )
  }
}

export default logRender(ProductList)
