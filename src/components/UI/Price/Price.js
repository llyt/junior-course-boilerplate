import React from 'react'
import styles from './Price.module.css'

const Price = (props) => {
  const cls = [styles.Price]
  if (props.type === 'sub') {
    cls.push(styles.SubPrice)
  }
  return (
    <div className={cls.join(' ')}>{props.price}</div>
  )
}

export default Price
