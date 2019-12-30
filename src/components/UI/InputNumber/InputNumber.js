import React from 'react';
import styles from './InputNumber.module.css'

const InputNumber = props => (
	<input className={styles.input}
			type={props.type || "text"} 
			name={props.name} 
			placeholder={props.value}
			onChange={props.changePrice}
			onBlur={props.onBlurHandleInput}>
	</input>
)
 
export default InputNumber;