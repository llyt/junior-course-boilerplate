import { connect } from 'react-redux'
import Sidebar from '../components/Sidebar/Sidebar'

const mapStateToProps = (state) => {
	const {listOfCategories, categories, minPrice, maxPrice, discount} = state
	return {
		listOfCategories,
		categories,
		minPrice,
		maxPrice,
		discount
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		inputChange: (name, value) => dispatch({type: "INPUT_CHANGE", payload: {name, value}}),
		handleCategoryFilter: (event) => dispatch({type: "CATEGORY_FILTER", payload: {event}}),
		handleReset: () => dispatch({type: "RESET_FILTERS"})
	}
}
export const SidebarConnect = connect(mapStateToProps, mapDispatchToProps)(Sidebar)