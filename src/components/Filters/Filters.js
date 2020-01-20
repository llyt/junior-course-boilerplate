<<<<<<< HEAD
import React from 'react';
import styles from './Filters.module.css'
import FilterPrice from '../Filters/FilterPrice/FilterPrice'

const Filters = props => {
	return ( 
		<div className={styles.Filters}>
			<FilterPrice 
				handlePrice={props.handlePrice}
				defaultPrices={props.defaultPrices}
			/>
		</div>
	 );
}
 
=======
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

<<<<<<< HEAD
const Filters = props => {
	return ( 
		<div className={styles.Filters}>
<<<<<<< HEAD
			<FilterPrice 
<<<<<<< HEAD
				defaultPrices={props.defaultPrices}
=======
				prices={props.prices}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
				changeFilterPrice={props.changeFilterPrice}
>>>>>>> Made controlled inputs and instant reloading
=======
				handlePriceInput={props.handlePriceInput}
				onBlurHandleInput={props.onBlurHandleInput}
>>>>>>> Added number mask for price filter
=======
				handleFilterInput={props.handleFilterInput}
=======
				inputChange={props.inputChange}
>>>>>>> Added HOC for inputs
			/>
			<HoccedComponent 
=======
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
>>>>>>> Fix after marks
				title="Скидка"
				name="discount"
				value={props.discount}
<<<<<<< HEAD
				onChange={props.handleFilterInput}
>>>>>>> Added discount filter
=======
				inputChange={props.inputChange}
>>>>>>> Added HOC for inputs
			/>
		</div>
	 )
=======
class Filters extends React.Component {
	render() {
		return (
			<AppContext.Consumer>
				{({minPrice, maxPrice, discount, inputChange, handleReset}) => (
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
							type="button"
							className={styles.ResetButton} 
							onClick={handleReset}>
								Сбросить фильтры
						</button>
					</div>
				)}
			</AppContext.Consumer> 
		 )
	}
>>>>>>> Added shallow compare
}

<<<<<<< HEAD


 
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> Merge prev task
export default Filters;
=======
export default Filters
>>>>>>> Fix after marks
=======
export default logRender(Filters)
>>>>>>> Added shallow compare
=======
export default logRender(Filters)
>>>>>>> Made routing for category filter
