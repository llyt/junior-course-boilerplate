import Basket from '../components/Basket/Basket'
import {
  basketActions,
  basketOperations,
  basketSelectors
} from '../store/basket'
import { catalogSelectors } from '../store/catalog'
import { connect } from 'react-redux'

const mapStateToProps = (state) => (
  {
    error: basketSelectors.getError(state),
    allProducts: catalogSelectors.getAllProducts(state),
    addedItems: basketSelectors.getAddedItems(state),
    savedItems: basketSelectors.getSavedItems(state),
    totalAmount: basketSelectors.getTotalAmount(state),
    isBasketSaving: basketSelectors.getSavingStatus(state),
    isBasketSaved: basketSelectors.getSaveState(state)
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    addToBasket: (productId) => dispatch(basketActions.addToBasket(productId)),
    removeFromBasket: (productId) => dispatch(basketActions.removeFromBasket(productId)),
    saveBasketHandle: (basketData) => dispatch(basketOperations.saveBasket(basketData)),
    cleanBasketHandle: () => dispatch(basketActions.cleanBasket())
  }
)

const BasketContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Basket)

export default BasketContainer
