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
					value={100}
				/>
				<Input 
					htmlFor="to"
					label="до"
					value={30000}
				/>
			</div>
		</div>
	 );
}
 
export default FilterPrice;