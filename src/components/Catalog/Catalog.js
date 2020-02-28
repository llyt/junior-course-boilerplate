import React from 'react'
import styles from './Catalog.module.css'
import { SidebarContainer } from '../../containers/SidebarContainer'
import { ProductListContainer } from '../../containers/ProductListContainer'

class Catalog extends React.PureComponent {
  render() {
    return (
      <div className={styles.ProductPage}>
        <SidebarContainer />
        <ProductListContainer />
      </div>
    )
  }
}

export default Catalog
