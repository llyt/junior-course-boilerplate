import React from 'react';
import styles from './Filters.module.css'
import FilterPrice from '../Filters/FilterPrice/FilterPrice'

const Filters = props => {
	return ( 
		<div className={styles.Filters}>
			<FilterPrice 
				prices={props.prices}
				handleFilterPrice={props.handleFilterPrice}
			/>
		</div>
	 );
}
 
export default Filters;