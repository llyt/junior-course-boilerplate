import React from 'react'
import styles from './Button.module.css'

const Button = (props) => {
  return (
    <button
      data-tag={props.data}
      className={styles.Button}
      type={props.type || 'button'}
      disabled={props.disabled}
      onClick={props.clickHandle}
    >
      {props.children}
    </button>
  )
}

export default Button
