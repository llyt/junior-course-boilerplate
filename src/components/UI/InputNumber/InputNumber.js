import React from 'react';
import styles from './InputNumber.module.css'

const InputNumber = props => (
	<input className={styles.input}
		type={props.type || "text"} 
		name={props.name} 
		value={props.value}
		onChange={props.changePrice}
	/>
)
 
export default InputNumber