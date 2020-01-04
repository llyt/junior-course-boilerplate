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
<<<<<<< HEAD
import Input from '../../UI/Input/Input'
=======
import Title from '../../UI/Title/Title'
<<<<<<< HEAD
<<<<<<< HEAD
import logRender from '../../../hoc/logRender'
>>>>>>> Fixes after marks

const FilterPrice = props => {
=======
import logRender from '../../logRender'

class FilterPrice extends logRender {
	constructor(props) {
		super(props)
>>>>>>> Using logRender via inheritance

	// let currentPrices = {
	// 	from: props.defaultPrices.min,
	// 	to: props.defaultPrices.max
	// }

<<<<<<< HEAD
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
=======
	handleInputPrices = event => {
		event.preventDefault();
		const minPrice = this.minPrice.current.value > 0 ? parseInt(this.minPrice.current.value) : undefined
		const maxPrice = this.maxPrice.current.value > 0 ? parseInt(this.maxPrice.current.value) : undefined

		this.props.handleFilterPrice(minPrice, maxPrice)
	}
=======
import InputNumber from '../../UI/InputNumber/InputNumber'
import logRender from '../../logRender'

class FilterPrice extends logRender {
>>>>>>> Made controlled inputs and instant reloading

	render() {
		return (
			<div className={styles.FilterPrice}>
				<Title level="3">Цена</Title>
				<form>
					<div>
						<label htmlFor='from'>от</label>
						<InputNumber
							name="from"
							value={this.props.prices.min}
							changePrice={this.props.handleFilterInput}
						/>

						<label htmlFor='to'>до</label>
						<InputNumber 
							name="to"
							value={this.props.prices.max}
							changePrice={this.props.handleFilterInput}
						/>
					</div>
				</form>
<<<<<<< HEAD
>>>>>>> Fixes after marks
		</div>
	 );
=======
			</div>
		)
	}
>>>>>>> Added discount filter
}
<<<<<<< HEAD
 
>>>>>>> Merge prev task
export default FilterPrice;
=======

<<<<<<< HEAD
export default logRender(FilterPrice);
>>>>>>> Fixes after marks
=======
export default FilterPrice
>>>>>>> Using logRender via inheritance
