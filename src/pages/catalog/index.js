import React from 'react'
import styles from './Catalog.module.css'
import {
  getPaginatedProductList,
  makePagination,
  getLoadingState
} from '../../store/modules/productList'
import {
  getDiscount,
  getListOfSidebarCategories,
  getMaxPrice,
  getMinPrice,
  getParamsFromState
} from '../../store/modules/sidebar'
import { connect } from 'react-redux'
import Sidebar from '../../components/Sidebar/Sidebar'
import ProductList from '../../components/ProductList/ProductList'

class Catalog extends React.PureComponent {

  renderSidebar = () => {
    const { listOfCategories, minPrice, maxPrice, discount } = this.props.sidebar
    const { inputChange, resetInputs } = this.props

    return (
      <Sidebar
        listOfCategories={listOfCategories}
        minPrice={minPrice}
        maxPrice={maxPrice}
        discount={discount}
        inputChange={inputChange}
        resetInputs={resetInputs}
      />
    )
  }

  renderProductList = () => {
    const { list, pagination, params } = this.props.productList

    return (
      <ProductList
        list={list}
        pagination={pagination}
        params={params}
      />
    )
  }

  render() {
    return (
      this.props.isLoading
        ? <div className={styles.isLoading}>
            <div />
            <div />
          </div>
        : <div className={styles.Catalog}>
            {this.renderSidebar()}
            {this.renderProductList()}
          </div>

    )
  }
}

const mapStateToProps = (state) => (
  {
    sidebar: {
      listOfCategories: getListOfSidebarCategories(state),
      minPrice: getMinPrice(state),
      maxPrice: getMaxPrice(state),
      discount: getDiscount(state),
    },
    productList: {
      list: getPaginatedProductList(state),
      pagination: makePagination(state),
      params: getParamsFromState(state),
    },
    isLoading: getLoadingState(state)
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    inputChange: (name, value) => dispatch({ type: 'INPUT_CHANGE', payload: { name, value } }),
    resetInputs: () => dispatch( { type: 'RESET_INPUTS' })
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Catalog)

