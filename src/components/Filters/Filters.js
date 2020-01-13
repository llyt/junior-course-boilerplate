import React from 'react';
import styles from './Filters.module.css'
import Title from '../UI/Title/Title'
import PriceInput from '../UI/PriceInput/PriceInput'
import DiscountForm from 'csssr-school-input-discount'
import withValidateNumber from '../../hoc/withValidateNumber/withValidateNumber'
import logRender from '../../hoc/logRender/logRender'

const DiscountHOC = withValidateNumber(logRender(DiscountForm))

class Filters extends React.Component {
	render() { 
		return ( 
			<div className={styles.Filters}>
				<div className={styles.FilterPrice}>
					<Title level="3">Цена</Title>
					<form>
						<label htmlFor="minPrice">от</label>
						<PriceInput 
							name="minPrice" 
							value={this.props.minPrice}
							inputChange={this.props.inputChange}
						/>
						<label htmlFor="maxPrice">до</label>
						<PriceInput 
							name="maxPrice" 
							value={this.props.maxPrice}
							inputChange={this.props.inputChange}
						/>
					</form>
				</div>
				<DiscountHOC 
					title="Скидка"
					name="discount"
					value={this.props.discount}
					inputChange={this.props.inputChange}
				/>
			</div>
		 )
	}
}



 
export default logRender(Filters)