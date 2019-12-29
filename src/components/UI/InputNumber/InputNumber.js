import React from 'react';
import styles from './InputNumber.module.css'


const InputNumber = props => {
	return ( 
		<input className={styles.input}
			type={props.type} 
			name={props.name} 
			placeholder={props.value}
			onChange={props.changePrice}>
		</input>
	 );
}
 
export default InputNumber;