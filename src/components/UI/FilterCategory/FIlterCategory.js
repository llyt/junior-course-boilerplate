import React from 'react'
import styles from './FilterCategory.module.css'
import Title from '../Title/Title'

const FilterCategory = props => {
	return ( 
		<div className={styles.FilterCategory}>
			<Title level='3'>{props.title}</Title>
			{props.listOfCategories.map((category, index) => {
				const cls = props.categories.includes(category) ? styles.isActive : '' 
				return (
					<button
						type="button"
						className={cls}
						key={category + index} 
						onClick={props.handleCategoryFilter}
					>
						{category}
					</button>
				)
			})}
		</div>
	 )
}
 
export default FilterCategory