import React from 'react';
import styles from './Filters.module.css'
import FilterPrice from '../Filters/FilterPrice/FilterPrice'
import DiscountForm from 'csssr-school-input-discount'

const Filters = props => {
	return ( 
		<div className={styles.Filters}>
			<FilterPrice 
				prices={props.prices}
				handleFilterInput={props.handleFilterInput}
			/>
			<DiscountForm 
				title="Скидка"
				name="sale"
				value={props.discount}
				onChange={props.handleFilterInput}
			/>
		</div>
	 )
}
 
export default Filters;