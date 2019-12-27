import React from 'react';
import styles from './FilterPrice.module.css'
import Title from '../../UI/Title/Title'
import logRender from '../../logRender'

class FilterPrice extends logRender {
	constructor(props) {
		super(props)

		this.minPrice = React.createRef()
		this.maxPrice = React.createRef()
	}

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
		</div>
		)
	}
}

export default FilterPrice