import React from 'react'
import styles from './Button.module.css'

const Button = (props) => {
  return (
    <button
      className={styles.Button}
      type='button'
      disabled={props.disabled}
      onClick={props.clickHandle}
    >
      {props.text}
    </button>
  )
}

export default Button
