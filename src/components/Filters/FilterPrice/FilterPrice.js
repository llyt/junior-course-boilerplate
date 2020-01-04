import React from 'react';
import styles from './FilterPrice.module.css'
import Title from '../../UI/Title/Title'
import InputNumber from '../../UI/InputNumber/InputNumber'
import logRender from '../../logRender'
import Input from '../../../hoc/Input/Input'

class FilterPrice extends logRender {

	HoccedComponent = Input(InputNumber)

	render() {
		return (
			<div className={styles.FilterPrice}>
				<Title level="3">Цена</Title>
				<form>
					<div>
						<label htmlFor='from'>от</label>
						<this.HoccedComponent
							name="from"
							value={this.props.prices.min}
							inputChange={this.props.inputChange}
						/>

						<label htmlFor='to'>до</label>
						<this.HoccedComponent 
							name="to"
							value={this.props.prices.max}
							inputChange={this.props.inputChange}
						/>
					</div>
				</form>
			</div>
		)
	}
}

export default FilterPrice