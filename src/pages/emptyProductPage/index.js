import React from 'react'
import styles from './EmptyProductPage.module.css'
import { NavLink } from 'react-router-dom'

export default (props) => (
  <div className={styles.EmptyProductPage}>
    <div className={styles.EmptyProductPageHeader}>
      <NavLink className={styles.BackToHomePage} to={'/'} title='На главную'>&#8592;</NavLink>
      <h1>Товар не найден</h1>
    </div>
  </div>
)

