import React from 'react'
import './index.css'
import { SidebarContainer } from './containers/SidebarContainer'
import { ProductListContainer } from './containers/ProductListContainer'
import { connect } from 'react-redux'
import queryString from 'query-string'

export const getParamsFromUrl = () => {
  const params = queryString.parse(window.location.search, { arrayFormat: 'comma' })
  const categoriesFromParams = params.category

  if (typeof categoriesFromParams === 'string') {
    params.category = [categoriesFromParams]
  }

  return params
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
    const params = getParamsFromUrl()
    this.props.pushRoutingState(params)
  }

  pushStateToBrowser = () => {
    const params = this.props.params
    let url = '/'
    if (Object.entries(params).length !== 0) {
      const path = queryString.stringify(params, {arrayFormat: 'comma'})
      url = `/?${path}` 
    }
    window.history.pushState({}, '', url)
    
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
  const { params } = state.routing
  return {
    params
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    pushRoutingState: (params) => dispatch({type: 'PUSH_ROUTING_STATE', payload: {params} }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)