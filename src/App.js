import React from 'react'
import './index.css'
import { SidebarContainer } from './containers/SidebarContainer'
import { ProductListContainer } from './containers/ProductListContainer'
import { getParamsFromUrl } from './utils/getParamsFromUrl'
import { getParamsFromState } from './store/modules/sidebar'
import { connect } from 'react-redux'
import queryString from 'query-string'

class App extends React.Component {

  componentDidMount() {
    this.initStoreState()
    window.addEventListener('popstate', this.initStoreState)
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.initStoreState)
  }

  componentDidUpdate() {
    this.stateParamsToUrl()
  }

  initStoreState = () => {
    const paramsFromUrl = getParamsFromUrl()
    this.props.pushToStoreParamsFromUrl(paramsFromUrl)
  }

  stateParamsToUrl = () => {
    const paramsFromUrl = getParamsFromUrl()
    let paramsFromState = {...this.props.params}

    if (JSON.stringify(paramsFromUrl) !== JSON.stringify(paramsFromState)) {
      if (paramsFromState.page === '1') {
        paramsFromState = Object.keys(paramsFromState).reduce((acc, param) => {
          if (param !== 'page') {
            acc[param] = paramsFromState[param]
          }
          return acc
        }, {})
      }

      const params = queryString.stringify(paramsFromState, {arrayFormat: 'comma'})
      const url = params ? `/?${params}` : '/'

      window.history.pushState({}, '', url)
    }
  };

  render() {
    return (
      <div className="ProductPage">
        <SidebarContainer />
        <ProductListContainer />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    params: getParamsFromState(state)
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    pushToStoreParamsFromUrl: (params) => dispatch({type: 'INIT_STORE_STATE', payload: {params} }),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(App)
