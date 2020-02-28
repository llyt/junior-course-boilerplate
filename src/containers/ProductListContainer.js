import { connect } from 'react-redux'
import ProductList from '../components/ProductList/ProductList'
import { getPaginatedProductList, makePagination } from '../store/modules/productList'
import { getParamsFromState } from '../store/modules/sidebar'

const mapStateToProps = (state) => (
  {
    list: getPaginatedProductList(state),
    pagination: makePagination(state),
    params: getParamsFromState(state)
  }
)


export const ProductListContainer = connect(mapStateToProps)(ProductList)
