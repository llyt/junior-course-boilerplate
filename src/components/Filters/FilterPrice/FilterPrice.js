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

	render() {
		return (
			<div className={styles.FilterPrice}>
			<Title level="3">Цена</Title>
				<form onSubmit={this.handleInputPrices}>
					<div>
						<label htmlFor='from'>от</label>
						<input 
							ref={this.minPrice} 
							type="text" 
							name="from" 
							defaultValue={this.props.prices.min}
						/>
						<label htmlFor='to'>до</label>
						<input 
							ref={this.maxPrice} 
							type="text" 
							name="to" 
							defaultValue={this.props.prices.max}
						/>
					</div>
					<input type='submit' value="Применить" />
				</form>
>>>>>>> Fixes after marks
		</div>
	 );
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
