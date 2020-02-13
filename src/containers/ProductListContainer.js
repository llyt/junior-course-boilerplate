import { connect } from 'react-redux'
import ProductList from '../components/ProductList/ProductList'
import { getPaginationLinks, getProductsList} from '../store/modules/productList'

const mapStateToProps = (state) => ({
  productsPerPage: getProductsList(state),
  pagination: getPaginationLinks(state)
})

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