import React from 'react'
import styles from './Title.module.css'

const Title = props => (
	<h1 className={styles.h1}>{props.children}</h1>
)
export default Title