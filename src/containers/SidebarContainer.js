import { connect } from 'react-redux'
import Sidebar from '../components/Sidebar/Sidebar'
import {
  getListOfSidebarCategories,
  getMinPrice,
  getMaxPrice,
  getDiscount
 } from '../store/modules/sidebar'

const mapStateToProps = (state) => (
  {
    listOfCategories: getListOfSidebarCategories(state),
    minPrice: getMinPrice(state),
    maxPrice: getMaxPrice(state),
    discount: getDiscount(state)
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    inputChange: (name, value) => dispatch({ type: 'INPUT_CHANGE', payload: { name, value } }),
  }
)

export const SidebarContainer = connect(mapStateToProps, mapDispatchToProps)(Sidebar)
