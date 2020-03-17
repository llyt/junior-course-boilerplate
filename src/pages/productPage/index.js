import React from 'react'
import styles from './ProductPage.module.css'
import priceWithSpaces from '../../utils/priceWithSpaces'
import ProductItem from 'csssr-school-product-card'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import EmptyProductPage from '../emptyProductPage'
import Loader from '../../components/UI/Loader/Loader'
import Button from '../../components/UI/Button/Button'
import BasketContainer from '../../containers/basketContainer'
import { catalogOperations, catalogSelectors } from '../../store/catalog'
import { basketSelectors, basketActions } from '../../store/basket'
import Price from '../../components/UI/Price/Price'

const ratingStarStyles = { display: 'inline-block', marginRight: 6 }

const ratingComponent = ({ isFilled }) => isFilled ? <div style={ratingStarStyles}>&#9733;</div> : <div style={ratingStarStyles}>&#9734;</div>

class ProductPage extends React.PureComponent  {

  componentDidMount = () => {
    const { products } = this.props
    if (products.length === 0) {
      this.props.fetchProducts()
    }
  }

  goToHomeWithHistory = (event) => {
    event.preventDefault()
    this.props.history.goBack()
  }

  getProductItem = () => {
    const productId = Number(this.props.match.params.id)

    return this.props.products.flat().find((product) => product.id === productId)
  }

  addProductToBasket = (event) => {
    this.props.addToBasket(Number(event.target.dataset.tag))
  }

  removeProductFromBasket = (event) => {
    this.props.removeFromBasket(Number(event.target.dataset.tag))
  }

  render() {
    const {
      error,
      isLoading,
      history,
    } = this.props
    const productItem = this.getProductItem()
    const { addedItems, isSaving} = this.props.basket
    const productId = parseInt(this.props.match.params.id)
    const inBasket = addedItems.includes(productId)

    if (error) {
      return <div className={styles.Error}>{error}</div>
    }

    if (isLoading) {
      return <Loader />
    }

    return (
      productItem
        ? <div className={styles.ProductPage}>
            <div className={styles.Product}>
              <div className={styles.ProductHeader}>
                {history.action === 'POP'
                  ? (<NavLink className={styles.BackToHomePage} to='/' title='Перейти в каталог' >&#8592;</NavLink>)
                  : (<NavLink className={styles.BackToHomePage} to='/' title='Вернуться назад' onClick={this.goToHomeWithHistory}>&#8592;</NavLink>)
                }
                <h1>{productItem.name}</h1>
              </div>
              <ProductItem
                isInStock={productItem.status === 'IN_STOCK'}
                img={`../img${productItem.img}`}
                title={productItem.name}
                price={<Price price={priceWithSpaces(productItem.price)}/>}
                subPriceContent={<Price type='sub' price={priceWithSpaces(productItem.price)}/>}
                maxRating={5}
                rating={productItem.stars}
                ratingComponent={ratingComponent}
              />
              { productItem.status === 'IN_STOCK'
              && <div className={styles.BusketButton}>
                  <Button
                    data={productId}
                    disabled={isSaving}
                    clickHandle={inBasket ? this.removeProductFromBasket : this.addProductToBasket}
                  >
                    {inBasket ? 'Удалить из корзины' : 'Добавить в корзину'}
                  </Button>
                </div>
              }
            </div>
            <BasketContainer />
          </div>
        : <EmptyProductPage />
    )
  }
}

const mapStateToProps = (state) => (
  {
    isLoading: catalogSelectors.getLoadingState(state),
    error: catalogSelectors.getError(state),
    products: catalogSelectors.getFilteredProductsList(state),
    basket: {
      addedItems: basketSelectors.getAddedItems(state),
      savedItems: basketSelectors.getSavedItems(state),
      totalAmount: basketSelectors.getTotalAmount(state),
      isSaving: basketSelectors.getSavingStatus(state)
    },
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    fetchProducts: () => dispatch(catalogOperations.getProducts()),
    addToBasket: (productId) => dispatch(basketActions.addToBasket(productId)),
    removeFromBasket: (productId) => dispatch(basketActions.removeFromBasket(productId)),
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductPage)
