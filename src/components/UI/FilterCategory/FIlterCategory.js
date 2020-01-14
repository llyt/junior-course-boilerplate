import React from 'react'
import styles from './FilterCategory.module.css'
import Title from '../Title/Title'
import { AppContext } from '../../../App'
import logRender from '../../../hoc/logRender/logRender'

const FilterCategory = props => {

	const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1)

	return ( 
		<div className={styles.FilterCategory}>
		<Title level='3'>{props.title}</Title>
		<AppContext.Consumer>
			{({categories, handleCategoryFoo}) => categories.map((category, index) => {
				const cls = category.isActive ? styles.isActive : ''
				return (
					<button 
						key={category.name + index} 
						className={cls}
						onClick={handleCategoryFoo}>
							{capitalizeFirstLetter(category.name)}
					</button>
				)
			})}
		</AppContext.Consumer>
		</div>
	 )
}
 
export default logRender(FilterCategory)