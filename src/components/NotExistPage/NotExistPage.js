import React from 'react'
import styles from './NotExistPage.module.css'
import { NavLink } from 'react-router-dom'

export default (props) => {
  return (
    <div className={styles.NotExist}>
      <div className={styles.NotExistHeader}>
        <NavLink className={styles.BackToHomePage} to={'/'} title='На главную'>&#8592;</NavLink>
        <h1>Товар не найден</h1>
      </div>
    </div>
  )
}
