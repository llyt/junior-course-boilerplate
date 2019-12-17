import React from 'react'
import styles from './H1Item.module.css'

const H1Item = props => (
			<h1 className={styles.h1}>{props.content}</h1>
  )
export default H1Item