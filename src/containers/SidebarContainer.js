import { connect } from 'react-redux'
import Sidebar from '../components/Sidebar/Sidebar'
import {
  getListOfCategories,
  getActiveCategories,
  getMinPrice,
  getMaxPrice,
  getDiscount
 } from '../store/modules/sidebar'

const mapStateToProps = (state) => (
  {
    listOfCategories: getListOfCategories(state),
    activeCategories: getActiveCategories(state),
    minPrice: getMinPrice(state),
    maxPrice: getMaxPrice(state),
    discount: getDiscount(state)
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    inputChange: (name, value) => dispatch({ type: 'INPUT_CHANGE', payload: { name, value } }),
    handleCategoryFilter: (event) => {
      const categoryName = event.target.innerHTML
      dispatch({ type: 'CATEGORY_FILTER', payload: { categoryName } })
    },
    handleReset: () => dispatch({ type: 'RESET_FILTERS' })
  }
)

export const SidebarContainer = connect(mapStateToProps, mapDispatchToProps)(Sidebar)
