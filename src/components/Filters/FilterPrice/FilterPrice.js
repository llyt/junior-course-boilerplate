import React from 'react';
import styles from './FilterPrice.module.css'
import logger from 'react-logger'

class FilterPrice extends React.Component {
	constructor(props) {
		super(props)

		this.minPrice = React.createRef()
		this.maxPrice = React.createRef()
	}

	shouldComponentUpdate(nextProps, nextState) {
		logger.log(this, this.state, nextProps, nextState);
		return true
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
			<h3>Цена</h3>
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

export default FilterPrice;