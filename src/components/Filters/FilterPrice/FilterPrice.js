<<<<<<< HEAD
import React from 'react';
import styles from './FilterPrice.module.css'
import Input from '../../UI/Input/Input'

const FilterPrice = props => {
	return ( 
		<div className={styles.FilterPrice}>
			<h3>Цена</h3>
			<div>
				<Input 
					htmlFor="from"
					label="от"
					value={props.defaultPrices.min}
					handleInput={props.handlePrice.from}
				/>
				<Input 
					htmlFor="to"
					label="до"
					value={props.defaultPrices.max}
					handleInput={props.handlePrice.to}
				/>
			</div>
		</div>
	 );
}
 
=======
import React from 'react';
import styles from './FilterPrice.module.css'
import Input from '../../UI/Input/Input'

const FilterPrice = props => {

	// let currentPrices = {
	// 	from: props.defaultPrices.min,
	// 	to: props.defaultPrices.max
	// }

	// const handleInput = event => {
	// 	console.log('Changed Price', event.target)
	// 	if (event.target.name === 'from') {
	// 		currentPrices = {from: event.target.value}
	// 	} else {
	// 		currentPrices = {to: event.target.value}
	// 	}
	// }

	return ( 
		<div className={styles.FilterPrice}>
			<h3>Цена</h3>
			<div>
				<Input 
					htmlFor="from"
					label="от"
					value={props.defaultPrices.min}
					// handleInput={handleInput}
				/>
				<Input 
					htmlFor="to"
					label="до"
					value={props.defaultPrices.max}
					// handleInput={handleInput}
				/>
			</div>
			<button>Применить</button>
		</div>
	 );
}
 
>>>>>>> Merge prev task
export default FilterPrice;