import React from 'react';
import styles from './Sidebar.module.css'
import Title from '../UI/Title/Title'
import PriceInput from '../UI/PriceInput/PriceInput'
import DiscountForm from 'csssr-school-input-discount'
import CategoryFilter from '../UI/CategoryFilter/CategoryFilter'
import withValidateNumber from '../../hoc/withValidateNumber/withValidateNumber'
import logRender from '../../hoc/logRender/logRender'

const DiscountHOC = withValidateNumber(logRender(DiscountForm))

class Sidebar extends React.PureComponent {

	componentDidUpdate() {
		const categories = this.props.categories || []
		const url = categories.length !== 0 ? `?category=${categories.join(',')}` : '/'
		window.history.pushState({}, '', url)
	}

	render() {
		return (
		<div className={styles.Sidebar}>
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

			<CategoryFilter 
				title="Категории" 
				listOfCategories={this.props.listOfCategories}
				categories={this.props.categories} 
				handleCategoryFilter={this.props.handleCategoryFilter}
			/>

			<button 
				type="button"
				className={styles.ResetButton} 
				onClick={this.props.handleReset}>
					Сбросить фильтры
			</button>			
		</div>
		)
	}
}

export default logRender(Sidebar)