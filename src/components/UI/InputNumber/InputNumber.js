import React from 'react';
import styles from './InputNumber.module.css'
import logRender from '../../../hoc/logRender/logRender'

const InputNumber = props => (
	<input className={styles.input}
		type={props.type || 'text'} 
		name={props.name} 
		value={props.value}
		onChange={props.onChange}
	/>
)

export default logRender(InputNumber)