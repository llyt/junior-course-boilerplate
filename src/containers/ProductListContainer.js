import { connect } from 'react-redux'
import ProductList from '../components/ProductList/ProductList'
import { makeProductList, makePagination } from '../store/modules/productList'

const mapStateToProps = (state) => {
  const { page } = state.filters.params

  const list = makeProductList(state)
  const pagination = makePagination(state, list.length)

  return {
    list: list[page - 1] || [],
    pagination: pagination.length > 1 ? pagination : [] 
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