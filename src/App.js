import React from 'react'
import './index.css'
import Catalog from './pages/catalog/index'
import ProductPage from './pages/productPage'
import EmptyCatalogPage from './pages/emptyCatalogPage'
import { Route, Switch} from 'react-router-dom'
import BasketPage from './pages/basketPage'

class App extends React.Component {

  render() {
    return (
      <Switch>
        <Route exact path='/' component={Catalog} />
        <Route path='/product/:id' component={ProductPage} />
        <Route path='/basket' component={BasketPage} />
        <Route component={EmptyCatalogPage} />
      </Switch>
    )
  }
}

export default App
