import React from 'react'
import styles from './Catalog.module.css'
import {
  catalogSelectors,
  catalogOperations,
  catalogActions
} from '../../store/modules/catalog/index'
import { connect } from 'react-redux'
import Sidebar from '../../components/Sidebar/Sidebar'
import ProductList from '../../components/ProductList/ProductList'
import Loader from '../../components/UI/Loader/Loader'

class Catalog extends React.PureComponent {

  componentDidMount = () => {
    this.props.fetchProducts()
  }

  render() {
    const { listOfCategories, minPrice, maxPrice, discount } = this.props.sidebar
    const { inputChange, resetInputs } = this.props
    const { list, pagination, params } = this.props.productList

    if (this.props.error) {
      return <div className={styles.Error}>{this.props.error}</div>
    }

    return (
      this.props.isLoading
        ? <Loader />
        : <div className={styles.Catalog}>
            { this.props.productList.list.length !== 0
              ? <Sidebar
                listOfCategories={listOfCategories}
                minPrice={minPrice}
                maxPrice={maxPrice}
                discount={discount}
                inputChange={inputChange}
                resetInputs={resetInputs}
              />
              : null }
            <ProductList
              list={list}
              pagination={pagination}
              params={params}
            />
          </div>

    )
  }
}

const mapStateToProps = (state) => (
  {
    isLoading: catalogSelectors.getLoadingState(state),
    error: catalogSelectors.getError(state),
    sidebar: {
      listOfCategories: catalogSelectors.getListOfSidebarCategories(state),
      minPrice: catalogSelectors.getMinPrice(state),
      maxPrice: catalogSelectors.getMaxPrice(state),
      discount: catalogSelectors.getDiscount(state),
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
    inputChange: (name, value) => dispatch(catalogActions.inputChange(name, value)),
    resetInputs: () => dispatch(catalogActions.resetInputs())
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Catalog)

