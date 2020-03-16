import React from 'react'
import styles from './EmptyCatalogPage.module.css'
import island from '../../static/island.png'

export default (props) => (
  <div className={styles.EmptyCatalogPage}>
    <img src={island} alt='NotFound' />
    <h1>404</h1>
  </div>
)
