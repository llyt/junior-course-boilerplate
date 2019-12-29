import React from 'react';
import styles from './FilterPrice.module.css'
import Title from '../../UI/Title/Title'
import InputNumber from '../../UI/InputNumber/InputNumber'
import logRender from '../../logRender'

class FilterPrice extends logRender {

	render() {
		return (
			<div className={styles.FilterPrice}>
			<Title level="3">Цена</Title>
				<form>
					<div>
						<label htmlFor='from'>от</label>
						<InputNumber 
							type="text"
							name="from"
							value={this.props.prices.min}
							changePrice={this.props.changeFilterPrice}
						/>
						<label htmlFor='to'>до</label>
						<InputNumber 
							type="text"
							name="to"
							value={this.props.prices.max}
							changePrice={this.props.changeFilterPrice}
						/>
					</div>
				</form>
		</div>
		)
	}
}

export default FilterPrice