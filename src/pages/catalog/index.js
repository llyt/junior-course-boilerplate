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
import queryString from 'query-string'
import removeObjProperty from '../../utils/removeObjProperty'

class Catalog extends React.PureComponent {

  componentDidMount = () => {
    const { list } = this.props.productList
    if (list.length === 0) {
      this.props.fetchProducts()
    }
  }

  handleResetInputs = () => {
    const { allProducts } = this.props
    this.props.resetInputs(allProducts)
  }

  handleInputChange = (name, value) => {
    const params = this.props.history.location.search
    if (params !== '') {
      const paramsObj = queryString.parse(params, {arrayFormat: 'comma'})
      const paramsNoPage = removeObjProperty(paramsObj, 'page')
      const urlParams = queryString.stringify(paramsNoPage, {arrayFormat: 'comma'})

      this.props.history.push(urlParams !== '' ? `?${urlParams}` : '/')
    }

    this.props.inputChange(name, value)
  }

  render() {
    const { listOfCategories, minPrice, maxPrice, discount } = this.props.sidebar
    const { error, isLoading } = this.props
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
          inputChange={this.handleInputChange}
          resetInputs={this.handleResetInputs}
        />
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
    }
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    fetchProducts: () => dispatch(catalogOperations.getProducts()),
    inputChange: (name, value) => dispatch(filtersActions.inputChange(name, value)),
    resetInputs: (allProducts) => dispatch(filtersActions.resetInputs(allProducts)),
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Catalog)

