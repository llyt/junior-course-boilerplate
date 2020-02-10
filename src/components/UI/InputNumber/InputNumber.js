import React from 'react';
import styles from './InputNumber.module.css'
import logRender from '../../../hoc/logRender/logRender'

const InputNumber = props => (
<<<<<<< HEAD
	<input className={styles.input}
		type={props.type || "text"} 
		name={props.name} 
		value={props.value}
		onChange={props.onChange}
	/>
=======
  <input className={styles.input}
    type={props.type || 'text'}
    name={props.name}
    value={props.value}
    onChange={props.onChange}
  />
>>>>>>> Added pagination
)

export default logRender(InputNumber)