import React from 'react'
import styles from './Catalog.module.css'
import { connect } from 'react-redux'
import queryString from 'query-string'
import {
  catalogSelectors,
  catalogOperations,
} from '../../store/catalog/index'
import {
  filtersSelectors,
  filtersActions
} from '../../store/filters'
import {
  basketSelectors,
  basketActions
} from '../../store/basket'
import Sidebar from '../../components/Sidebar/Sidebar'
import ProductList from '../../components/ProductList/ProductList'
import Loader from '../../components/UI/Loader/Loader'
import BasketContainer from '../../containers/basketContainer'

class Catalog extends React.PureComponent {

  componentDidMount = () => {
    const { list } = this.props.productList
    if (list.length === 0) {
      this.props.fetchProducts()
    }
  }

  componentDidUpdate() {
    const currentProductListLength = this.props.productList.list.length
    const paramsObj = queryString.parse(this.props.history.location.search, {arrayFormat: 'comma'})
    const {page: currentPage, ...otherParams} = paramsObj

    if (currentProductListLength < currentPage) {
      this.resetPage(otherParams)
    }
  }

  resetPage = (paramsNoPage) => {
    const urlParamsStr = queryString.stringify(paramsNoPage, {arrayFormat: 'comma'})
    this.props.history.push(urlParamsStr !== '' ? `?${urlParamsStr}` : '/')
  }

  render() {
    const {
      resetInputs,
      inputChange,
      error,
      isLoading,
      addToBasket,
      removeFromBasket,
    } = this.props
    const { listOfCategories, minPrice, maxPrice, discount } = this.props.sidebar
    const { addedItems, isSaving} = this.props.basket
    const { list, pagination, params } = this.props.productList

    if (error) {
      return <div className={styles.Error}>{this.props.error}</div>
    }

    if (isLoading) {
      return <Loader />
    }

    return (
      <div className={styles.Catalog}>
        <Sidebar
          listOfCategories={listOfCategories}
          minPrice={minPrice}
          maxPrice={maxPrice}
          discount={discount}
          inputChange={inputChange}
          resetInputs={resetInputs}
        />
        <ProductList
          list={list}
          pagination={pagination}
          params={params}
          productsInBasket={addedItems}
          isBasketSaving={isSaving}
          addToBusketHandle={addToBasket}
          removeFromBusketHandle={removeFromBasket}
        />
        <BasketContainer/>
      </div>
    )
  }
}

const mapStateToProps = (state) => (
  {
    isLoading: catalogSelectors.getLoadingState(state),
    error: catalogSelectors.getError(state),
    allProducts: catalogSelectors.getAllProducts(state),
    sidebar: {
      listOfCategories: filtersSelectors.getListOfSidebarCategories(state),
      minPrice: filtersSelectors.getMinPrice(state),
      maxPrice: filtersSelectors.getMaxPrice(state),
      discount: filtersSelectors.getDiscount(state),
    },
    productList: {
      list: catalogSelectors.getPaginatedProductList(state),
      pagination: catalogSelectors.makePagination(state),
      params: catalogSelectors.getParamsFromState(state),
    },
    basket: {
      addedItems: basketSelectors.getAddedItems(state),
      isSaving: basketSelectors.getSavingStatus(state)
    }
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    fetchProducts: () => dispatch(catalogOperations.getProducts()),
    inputChange: (name, value) => dispatch(filtersActions.inputChange(name, value)),
    resetInputs: () => dispatch(filtersActions.resetInputs()),
    addToBasket: (productId) => dispatch(basketActions.addToBasket(productId)),
    removeFromBasket: (productId) => dispatch(basketActions.removeFromBasket(productId)),
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Catalog)

