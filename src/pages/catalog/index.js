import React from 'react'
import styles from './Catalog.module.css'
import {
  catalogSelectors,
  catalogOperations,
} from '../../store/catalog/index'
import {
  filtersSelectors,
  filtersActions
} from '../../store/filters/index'
import { connect } from 'react-redux'
import Sidebar from '../../components/Sidebar/Sidebar'
import ProductList from '../../components/ProductList/ProductList'
import Loader from '../../components/UI/Loader/Loader'
import EmptyCatalogPage from '../emptyCatalogPage'

class Catalog extends React.PureComponent {

  componentDidMount = () => {
    const { list } = this.props.productList
    if (list.length === 0) {
      this.props.fetchProducts()
    }
  }

  render() {
    const { listOfCategories, minPrice, maxPrice, discount } = this.props.sidebar
    const { inputChange, resetInputs, error, isLoading } = this.props
    const { list, pagination, params } = this.props.productList

    if (error) {
      return <div className={styles.Error}>{this.props.error}</div>
    }

    if (isLoading) {
      return <Loader />
    }

    return (
      list.length !== 0
        ? <div className={styles.Catalog}>
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
            />
          </div>
        : <EmptyCatalogPage />
    )
  }
}

const mapStateToProps = (state) => (
  {
    isLoading: catalogSelectors.getLoadingState(state),
    error: catalogSelectors.getError(state),
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
    }
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    fetchProducts: () => dispatch(catalogOperations.getProducts()),
    inputChange: (name, value) => dispatch(filtersActions.inputChange(name, value)),
    resetInputs: () => dispatch(filtersActions.resetInputs())
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Catalog)

