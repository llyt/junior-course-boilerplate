import React from 'react'
import styles from './ProductList.module.css'
import Title from '../UI/Title/Title'
import Pagination from '../UI/Pagination/Pagination'
import ProductItem from 'csssr-school-product-card'
import logRender from '../../hoc/logRender/logRender'
import priceWithSpaces from '../../utils/priceWithSpaces'
import { NavLink } from 'react-router-dom'
import Button from '../UI/Button/Button'
import Price from '../UI/Price/Price'

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
    const { list, urlSearchParams, pagination, children } = this.props

    return (
      <div className={styles.ProductList}>
        <div className={styles.ProductListHeader}>
          {
            this.props.backToPageHandle
            && <NavLink
                className={styles.BackToPrevPage}
                to='/'
                title='Вернуться назад'
                onClick={this.props.backToPageHandle}
                >
                  &#8592;
                </NavLink>
          }
          <Title level="1">{children}</Title>
        </div>
        { list.length !== 0
            ? <ul>
                {list.map((item) => {
                  const inBasket = this.props.productsInBasket.includes(item.id)

                  return (
                    <li key={item.id}>
                      <NavLink to={`/product/${item.id}`}>
                        <ProductItem
                          isInStock={item.status === 'IN_STOCK'}
                          img={`../img${item.img}`}
                          title={item.name}
                          price={<Price price={priceWithSpaces(item.price)}/>}
                          subPriceContent={<Price type='sub' price={priceWithSpaces(item.price)}/>}
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
          urlSearchParams={urlSearchParams}
        />
      </div>
    )
  }
}

export default logRender(ProductList)
