<<<<<<< HEAD
import React from 'react';
import styles from './Filters.module.css'
import FilterPrice from '../Filters/FilterPrice/FilterPrice'

const Filters = props => {
	return ( 
		<div className={styles.Filters}>
			<FilterPrice 
				handlePrice={props.handlePrice}
				defaultPrices={props.defaultPrices}
			/>
		</div>
	 );
}
 
=======
import React from 'react';
import styles from './Filters.module.css'
import FilterPrice from '../Filters/FilterPrice/FilterPrice'

const Filters = props => {
	return ( 
		<div className={styles.Filters}>
			<FilterPrice 
<<<<<<< HEAD
				defaultPrices={props.defaultPrices}
=======
				prices={props.prices}
<<<<<<< HEAD
				changeFilterPrice={props.changeFilterPrice}
>>>>>>> Made controlled inputs and instant reloading
=======
				handlePriceInput={props.handlePriceInput}
				onBlurHandleInput={props.onBlurHandleInput}
>>>>>>> Added number mask for price filter
			/>
		</div>
	 )
}
 
>>>>>>> Merge prev task
export default Filters;