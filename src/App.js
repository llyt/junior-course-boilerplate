import React from 'react'
import './index.css'
import { SidebarContainer } from './containers/SidebarContainer'
import { ProductListContainer } from './containers/ProductListContainer'
import { connect } from 'react-redux'
import queryString from 'query-string'

export const getParsedUrl = () => {
	const activeCategories = queryString.parse(window.location.search, {arrayFormat: 'comma'}).category || []
	return typeof activeCategories === 'string' ? [activeCategories] : activeCategories
}

class App extends React.Component {

	componentDidMount() {
		this.checkUrl()
		window.addEventListener('popstate', this.checkUrl)
	}

	componentWillUnmount() {
		window.removeEventListener('popstate', this.checkUrl)
	}

	componentDidUpdate() {
		this.pushStateToBrowser()
	}

	checkUrl = () => {
		const currentParse = getParsedUrl() || []
	
		if (JSON.stringify(currentParse) !== JSON.stringify(this.props.categories)) {
			this.props.changeCategories(currentParse)
		}
	}

	pushStateToBrowser = () => {
		const currentParse = getParsedUrl() || []

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
	const {categories} = state.filters
	return {
		categories
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		changeCategories: (newCategories) => dispatch({type: 'CHANGED_CATEGORIES_IN_URL', payload: {categories: newCategories}})
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)