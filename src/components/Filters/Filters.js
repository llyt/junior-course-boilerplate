import React from 'react';
import styles from './Filters.module.css'
import Title from '../UI/Title/Title'
import PriceInput from '../UI/PriceInput/PriceInput'
import DiscountForm from 'csssr-school-input-discount'
import FilterCategory from '../UI/FilterCategory/FilterCategory'
import withValidateNumber from '../../hoc/withValidateNumber/withValidateNumber'
import logRender from '../../hoc/logRender/logRender'
import { AppContext } from '../../AppContext'

const DiscountHOC = withValidateNumber(logRender(DiscountForm))

class Filters extends React.Component {
	render() {
		return (
			<AppContext.Consumer>
				{({minPrice, maxPrice, discount, inputChange, resetFoo}) => (
					<div className={styles.Filters}>
						<div className={styles.FilterPrice}>
							<Title level="3">Цена</Title>
							<form>
								<label htmlFor="minPrice">от</label>
								<PriceInput 
									name="minPrice" 
									value={minPrice}
									inputChange={inputChange}
								/>
								<label htmlFor="maxPrice">до</label>
								<PriceInput 
									name="maxPrice" 
									value={maxPrice}
									inputChange={inputChange}
								/>
							</form>
						</div>
						<DiscountHOC 
							title="Скидка"
							name="discount"
							value={discount}
							inputChange={inputChange}
						/>
						<FilterCategory title="Категории" />
						<button 
							className={styles.ResetButton} 
							onClick={resetFoo}>
								Сбросить фильтры
						</button>
					</div>
				)}
			</AppContext.Consumer> 
		 )
	}
}

export default logRender(Filters)