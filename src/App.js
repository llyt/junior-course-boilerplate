import React from 'react'
import './index.css'
import { SidebarContainer } from './containers/SidebarContainer'
import { ProductListContainer } from './containers/ProductListContainer'
import { getParamsFromUrl } from './utils/getParamsFromUrl'
import { connect } from 'react-redux'
import queryString from 'query-string'

class App extends React.Component {

  componentDidMount() {
    this.urlParamsToState();
    window.addEventListener('popstate', this.urlParamsToState)
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.urlParamsToState)
  }

  componentDidUpdate() {
    this.stateParamsToUrl()
  }

  urlParamsToState = () => {
    const paramsFromUrl = getParamsFromUrl();
    this.props.syncStateFromUrl(paramsFromUrl)
  };

  stateParamsToUrl = () => {
    const paramsFromUrl = getParamsFromUrl();
    let paramsFromState = {...this.props.params};

    if (JSON.stringify(paramsFromUrl) !== JSON.stringify(paramsFromState)) {
      if (paramsFromState.page === 1) {
        paramsFromState = Object.keys(paramsFromState).reduce((acc, param) => {
          if (param !== 'page') {
            acc[param] = paramsFromState[param]
          }
          return acc
        }, {})
      }
      const params = queryString.stringify(paramsFromState, {arrayFormat: 'comma'});
      const url = params ? `/?${params}` : '/';
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

const mapStateToProps = (state) => {
  const { params } = state.filters;
  return {
    params
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    syncStateFromUrl: (params) => dispatch({type: 'SYNC_STATE_FROM_URL', payload: {params} }),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
