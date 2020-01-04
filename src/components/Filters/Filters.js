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
				prices={props.prices}
				inputChange={props.inputChange}
			/>
			<HoccedComponent 
				title="Скидка"
				name="sale"
				value={props.discount}
				inputChange={props.inputChange}
			/>
		</div>
	 )
}
 
export default Filters;