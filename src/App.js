import React from 'react'
import './index.css'
import { SidebarContainer } from './containers/SidebarContainer'
import { ProductListContainer } from './containers/ProductListContainer'
import { connect } from 'react-redux'
import queryString from 'query-string'

export const getParsedUrl = () => {
	const activeCategories = queryString.parse(window.location.search, {arrayFormat: 'comma'}) || []
	return typeof activeCategories === 'string' ? [activeCategories] : activeCategories
}

class App extends React.Component {

	componentDidMount() {
		this.checkUrl()
		console.log(getParsedUrl())
		window.addEventListener('popstate', this.checkUrl)
	}

	componentWillUnmount() {
		window.removeEventListener('popstate', this.checkUrl)
	}

	componentDidUpdate() {
		this.pushStateToBrowser()
	}

	checkUrl = () => {
		const parsedUrl = getParsedUrl()
		const parsedCategory = parsedUrl.category || []
		const parsedPage = parseInt(parsedUrl.page) || 1
	
		if (JSON.stringify(parsedCategory) !== JSON.stringify(this.props.categories)) {
			this.props.changeCategories(parsedCategory)
		}

		if (parsedPage !== this.props.currentPage) {
			this.props.changeCurrentPage(parsedPage)
		}
	}

	pushStateToBrowser = () => {
		const currentParse = getParsedUrl().category || []

		if (JSON.stringify(currentParse) !== JSON.stringify(this.props.categories)) {
			const categories = this.props.categories || []
			const url = categories.length !== 0 ? `?category=${categories.join(',')}` : '/'
			window.history.pushState({}, '', url)
		}
	}

	render() {
		return (
			<div className="ProductPage">
				<SidebarContainer />
				<ProductListContainer />
			</div>
		) 
	}
}

const mapStateToProps = (state) => {
	const {currentPage, filters} = state
	const {categories} = filters
	return {
		categories,
		currentPage
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		changeCategories: (newCategories) => dispatch({type: 'CHANGED_CATEGORIES_IN_URL', payload: {categories: newCategories}}),
		changeCurrentPage: (newPage) => dispatch({type: 'CHANGED_CURRENT_PAGE', payload: {page: newPage}})
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)