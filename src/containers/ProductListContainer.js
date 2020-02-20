import { connect } from 'react-redux'
import ProductList from '../components/ProductList/ProductList'
import { makeProductList, makePagination } from '../store/modules/productList'

const mapStateToProps = (state) => ({
  list: makeProductList(state),
  pagination: makePagination(state),
});

const mapDispatchToProps = (dispatch) => {
  return {
    paginationClick: (nextNumberOfPage) => dispatch({ type: 'PAGINATION_CLICK', payload: { nextNumberOfPage } })
  }
};

export const ProductListContainer = connect(mapStateToProps, mapDispatchToProps)(ProductList);
