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
 
export default FilterPrice;