import React from 'react'
import styles from './CategoryFilter.module.css'
import Title from '../Title/Title'
import { NavLink } from 'react-router-dom'

const CategoryFilter = props => {
  return (
    <div className={styles.CategoryFilter}>
      <Title level='3'>{props.title}</Title>
        {props.listOfCategories.map(([body = 'NULL', url = '/', active = false], index) => (
          <NavLink
            key={body + index}
            to={url}
            className={active ? styles.isActive : null}
          >
            {body}
          </NavLink>
        ))}
    </div>
  )
}

export default CategoryFilter
