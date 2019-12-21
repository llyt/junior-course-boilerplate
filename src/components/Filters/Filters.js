import React from 'react';
import styles from './Filters.module.css'
import FilterPrice from '../Filters/FilterPrice/FilterPrice'

const Filters = props => {
	return ( 
		<div className={styles.Filters}>
			<FilterPrice 
				defaultPrices={props.defaultPrices}
			/>
		</div>
	 );
}
 
export default Filters;