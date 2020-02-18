import { connect } from 'react-redux'
import ProductList from '../components/ProductList/ProductList'
import { makeProductList } from '../store/modules/productList'

const mapStateToProps = (state) => {
  const { category, page } = state.filters.params

  const list = makeProductList(state)

  return {
    list: list[page - 1] || [],
    paginationLength: list.length,
    urlParams: {
      category,
      page
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handlePaginationClick: (event) => {
      event.preventDefault()
      const nextNumberOfPage = event.target.innerHTML
      dispatch({ type: 'PAGINATION_CLICK', payload: { nextNumberOfPage } })
    }
  }
}

export const ProductListContainer = connect(mapStateToProps, mapDispatchToProps)(ProductList)
