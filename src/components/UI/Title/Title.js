import React from 'react'
import styles from './Title.module.css'
import logRender from '../../../hoc/logRender/logRender'

const Title = props => {
  const Level = `h${props.level}`
  return <Level className={styles.h1}>{props.children}</Level>
}

export default logRender(Title)