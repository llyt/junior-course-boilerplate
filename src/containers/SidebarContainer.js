import { connect } from 'react-redux'
import Sidebar from '../components/Sidebar/Sidebar'

const mapStateToProps = (state) => {
  const { listOfCategories, categories, minPrice, maxPrice, discount } = state.filters
  return {
    listOfCategories,
    categories,
    minPrice,
    maxPrice,
    discount
  }
}

const mapDispatchToProps = (dispatch) => {
<<<<<<< HEAD
	return {
		inputChange: (name, value) => dispatch({type: "INPUT_CHANGE", payload: {name, value}}),
		handleCategoryFilter: (event) => {
			const categoryName = event.target.innerHTML
			dispatch({type: "CATEGORY_FILTER", payload: {categoryName}})
		},
		handleReset: () => dispatch({type: "RESET_FILTERS"})
	}
=======
  return {
    inputChange: (name, value) => dispatch({ type: 'INPUT_CHANGE', payload: { name, value } }),
    handleCategoryFilter: (event) => {
      const categoryName = event.target.innerHTML
      dispatch({ type: 'CATEGORY_FILTER', payload: { categoryName } })
    },
    handleReset: () => dispatch({ type: 'RESET_FILTERS' })
  }
>>>>>>> Added pagination
}
export const SidebarContainer = connect(mapStateToProps, mapDispatchToProps)(Sidebar)