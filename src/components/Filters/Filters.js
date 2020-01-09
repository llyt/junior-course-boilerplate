import React from 'react';
import styles from './Filters.module.css'
import Title from '../UI/Title/Title'
import PriceInput from '../UI/PriceInput/PriceInput'
import DiscountForm from 'csssr-school-input-discount'
import withValidateNumber from '../../hoc/withValidateNumber/withValidateNumber'

const DiscountHOC = withValidateNumber(DiscountForm)

const Filters = props => {
	return ( 
		<div className={styles.Filters}>
			<div className={styles.FilterPrice}>
				<Title level="3">Цена</Title>
				<form>
					<label htmlFor="minPrice">от</label>
					<PriceInput 
						name="minPrice" 
						value={props.minPrice}
						inputChange={props.inputChange}
					/>
					<label htmlFor="maxPrice">до</label>
					<PriceInput 
						name="maxPrice" 
						value={props.maxPrice}
						inputChange={props.inputChange}
					/>
				</form>
			</div>
			<DiscountHOC 
				title="Скидка"
				name="discount"
				value={props.discount}
				inputChange={props.inputChange}
			/>
		</div>
	 )
}
 
export default Filters