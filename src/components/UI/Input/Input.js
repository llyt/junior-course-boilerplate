<<<<<<< HEAD
import React from 'react';
import styles from './Input.module.css'

const Input = props => {
	return ( 
		<div className={styles.Input}>
			<label htmlFor={props.htmlFor}>{props.label}</label>
			<input type={props.type || "text"} name={props.htmlFor} defaultValue={props.value} onChange={props.handleInput}/>
		</div>
	 );
}
 
=======
import React from 'react';
import styles from './Input.module.css'

const Input = props => {
	return ( 
		<div className={styles.Input}>
			<label htmlFor={props.htmlFor}>{props.label}</label>
			<input type={props.type || "text"} name={props.htmlFor} defaultValue={props.value}/>
		</div>
	 );
}
 
>>>>>>> Merge prev task
export default Input;