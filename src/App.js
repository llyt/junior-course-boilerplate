import React from 'react'
import './index.css'
import Catalog from './pages/catalog/index'
import ProductPage from './pages/productPage/index'
import NotExistPage from './pages/notExistPage/index'
import { Route, Switch} from 'react-router-dom'

class App extends React.Component {

  render() {
    return (
      <Switch>
        <Route exact path='/' component={Catalog} />
        <Route path='/product/:id' component={ProductPage} />
        <Route component={NotExistPage} />
      </Switch>
    )
  }
}

export default App
