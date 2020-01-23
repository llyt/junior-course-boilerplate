import React from 'react'
import styles from './FilterCategory.module.css'
import Title from '../Title/Title'
import { AppContext } from '../../../AppContext'
import logRender from '../../../hoc/logRender/logRender'

const FilterCategory = props => {
	return ( 
		<div className={styles.FilterCategory}>
		<Title level='3'>{props.title}</Title>
		<AppContext.Consumer>
			{({categories, listOfCategories, handleCategoryFilter}) => listOfCategories.map((category, index) => {
				const cls = categories.includes(category) ? styles.isActive : '' 
				return (
					<button
						type="button"
						className={cls}
						key={category + index} 
						onClick={handleCategoryFilter}>
							{category}
					</button>
				)
			})}
		</AppContext.Consumer>
		</div>
	 )
}
 
export default logRender(FilterCategory)