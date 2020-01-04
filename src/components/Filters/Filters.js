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
import DiscountForm from 'csssr-school-input-discount'
import Input from '../../hoc/Input/Input'

const HoccedComponent = Input(DiscountForm)

const Filters = props => {
	return ( 
		<div className={styles.Filters}>
			<FilterPrice 
<<<<<<< HEAD
				defaultPrices={props.defaultPrices}
=======
				prices={props.prices}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
				changeFilterPrice={props.changeFilterPrice}
>>>>>>> Made controlled inputs and instant reloading
=======
				handlePriceInput={props.handlePriceInput}
				onBlurHandleInput={props.onBlurHandleInput}
>>>>>>> Added number mask for price filter
=======
				handleFilterInput={props.handleFilterInput}
=======
				inputChange={props.inputChange}
>>>>>>> Added HOC for inputs
			/>
			<HoccedComponent 
				title="Скидка"
				name="sale"
				value={props.discount}
<<<<<<< HEAD
				onChange={props.handleFilterInput}
>>>>>>> Added discount filter
=======
				inputChange={props.inputChange}
>>>>>>> Added HOC for inputs
			/>
		</div>
	 )
}
 
>>>>>>> Merge prev task
export default Filters;