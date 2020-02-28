import React from 'react'
import './index.css'
import Catalog from './components/Catalog/Catalog'
import ProductPage from './components/ProductPage/ProductPage'
import NotExistPage from './components/NotExistPage/NotExistPage'
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
