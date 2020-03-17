import React from 'react'
import styles from './BasketPage.module.css'
import { basketActions, basketSelectors } from '../../store/basket'
import { connect } from 'react-redux'
import BasketContainer from '../../containers/basketContainer'
import ProductList from '../../components/ProductList/ProductList'

class BasketPage extends React.PureComponent {

  backToPrevPage = (event) => {
    event.preventDefault()
    this.props.history.goBack()
  }

  render() {
    const {productsInBasket, addedItems, isSaving, addToBasket, removeFromBasket } = this.props
    return (
      <div className={styles.BasketPage}>
        <div className={styles.Products}>
          <ProductList
            backToPageHandle={this.backToPrevPage}
            list={productsInBasket}
            productsInBasket={addedItems}
            isBasketSaving={isSaving}
            addToBasketHandle={addToBasket}
            removeFromBasketHandle={removeFromBasket}
          >
            Корзина
          </ProductList>
        </div>
        <BasketContainer/>
      </div>
    )
  }
}

const mapStateToProps = (state) => (
  {
    addedItems: basketSelectors.getAddedItems(state),
    isSaving: basketSelectors.getSavingStatus(state),
    productsInBasket: basketSelectors.getProductsInBasket(state)
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    addToBasket: (productId) => dispatch(basketActions.addToBasket(productId)),
    removeFromBasket: (productId) => dispatch(basketActions.removeFromBasket(productId)),
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BasketPage)
