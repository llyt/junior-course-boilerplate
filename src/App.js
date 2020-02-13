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
    const paramsFromUrl = getParamsFromUrl()
    if (!paramsFromUrl.category) {
      paramsFromUrl['category'] = []
    }

    if (!paramsFromUrl.page) {
      paramsFromUrl['page'] = 1
    }

    this.props.syncStateFromUrl(paramsFromUrl)
  }

  pushStateToBrowser = () => {
    let params = this.props.params
    let url = '/'

    const isEmptyParams = (params) => {
      let flag = true
      params.forEach((param) => {
        if (param.length > 0 || typeof param === 'number') {
          flag = false
        }
      })

      return flag
    }

    if (params.page === 1) {
      params = {...Object.keys(params).reduce((acc, param) => {
          if (param !== 'page') {
            acc[param] = params[param]
          }
          return acc
        }, {})}
    }

    if (!isEmptyParams(Object.values(params))) {
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
  const { params } = state.filters
  return {
    params
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    syncStateFromUrl: (params) => dispatch({type: 'SYNC_STATE_FROM_URL', payload: {params} }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)