import React from 'react'
import styles from './ProductPage.module.css'
import EmptyProductPage from '../emptyProductPage'
import Loader from '../../components/UI/Loader/Loader'
import priceWithSpaces from '../../utils/priceWithSpaces'
import ProductItem from 'csssr-school-product-card'
import { NavLink } from 'react-router-dom'
import { catalogActions, catalogOperations, catalogSelectors } from '../../store/catalog'
import { connect } from 'react-redux'
import Button from '../../components/UI/Button/Button'
import Basket from '../../components/Basket/Basket'
import compareArrays from '../../utils/compareArrays'

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
    const productId = parseInt(this.props.match.params.id)

    return this.props.products.flat().find((product) => product.id === productId)
  }

  render() {
    const { error,
      isLoading,
      history,
      addToBasket,
      removeFromBasket,
      saveBasket,
      cleanBasket
    } = this.props
    const productItem = this.getProductItem()
    const { addedItems, savedItems, totalAmount, isSaving} = this.props.basket
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
                price={priceWithSpaces(productItem.price)}
                subPriceContent={priceWithSpaces(productItem.price)}
                maxRating={5}
                rating={productItem.stars}
                ratingComponent={ratingComponent}
              />
              <div className={styles.BusketButton}>
                <Button
                  disabled={isSaving}
                  text={inBasket ? 'Удалить из корзины' : 'Добавить в корзину'}
                  clickHandle={inBasket ? (() => removeFromBasket(productId)) : (() => addToBasket(productId))}
                />
              </div>
            </div>
            <div className={styles.Basket}>
              <Basket
                addedItems={addedItems}
                totalAmount={totalAmount}
                isBasketSaving={isSaving}
                isBasketSaved={compareArrays(addedItems, savedItems)}
                saveBasketHandle={saveBasket}
                cleanBasketHandle={cleanBasket}
              />
            </div>
          </div>
        : <EmptyProductPage />
    )
  }
}

const mapStateToProps = (state) => (
  {
    isLoading: catalogSelectors.getLoadingState(state),
    error: catalogSelectors.getError(state),
    products: catalogSelectors.getPaginatedProductList(state),
    basket: {
      addedItems: catalogSelectors.getAddedItems(state),
      savedItems: catalogSelectors.getSavedItems(state),
      totalAmount: catalogSelectors.getTotalAmount(state),
      isSaving: catalogSelectors.getSavingStatus(state)
    },
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    fetchProducts: () => dispatch(catalogOperations.getProducts()),
    addToBasket: (productId) => dispatch(catalogActions.addToBasket(productId)),
    removeFromBasket: (productId) => dispatch(catalogActions.removeFromBasket(productId)),
    saveBasket: (basketData) => dispatch(catalogOperations.saveBasket(basketData)),
    cleanBasket: () => dispatch(catalogActions.cleanBasket())
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductPage)
