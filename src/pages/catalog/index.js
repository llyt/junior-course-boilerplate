import React from 'react'
import styles from './Catalog.module.css'
import { catalogSelectors } from '../../store/modules/catalog/index'
import { connect } from 'react-redux'
import Sidebar from '../../components/Sidebar/Sidebar'
import ProductList from '../../components/ProductList/ProductList'
import Loader from '../../components/UI/Loader/Loader'

const API_URL = 'https://course-api.csssr.school/products'

class Catalog extends React.PureComponent {

  componentDidMount = () => {
    if (this.props.productList.list.length === 0) {
      this.props.changeLoaderStatus(true)

      // setTimeout exist only for showing delay data fetching
      this.demoInterval = setTimeout(() => {
        fetch(API_URL)
          .then(response => {
            if (response.ok) {
              return response.json()
            } else {
              throw new Error(`Ошибка ${response.status}`)
            }
          })
          .then(data => {
            if (data.result === 'OK') {
              this.props.fetchProducts(data.products)
            } else {
              throw new Error(data.message)
            }
            this.props.changeLoaderStatus(false)
          })
          .catch(error => {
            this.props.catchError(error.message)
            this.props.changeLoaderStatus(false)
          })
      }, 800)

    }
  }

  componentWillUnmount = () => {
    clearTimeout(this.demoInterval)
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
    fetchProducts: (data) => dispatch({ type: 'FETCH_PRODUCTS', payload: { data } }),
    changeLoaderStatus: (status) => dispatch( { type: 'CHANGE_LOADER_STATUS', payload: {status} } ),
    catchError: (error) => dispatch( { type: 'CATCH_ERROR', payload: { error } }),
    inputChange: (name, value) => dispatch({ type: 'INPUT_CHANGE', payload: { name, value } }),
    resetInputs: () => dispatch( { type: 'RESET_INPUTS' })
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Catalog)

