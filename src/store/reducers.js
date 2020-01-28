import { initialState } from './index'

export const mainReducer = (state = initialState, action) => {

	switch (action.type) {
		case 'INPUT_CHANGE':
			return {
				...state,
				filters: {
					...state.filters,
					[action.payload.name]: action.payload.value
				}
			}
			
		case 'CATEGORY_FILTER':
			const categoryName = action.payload.categoryName

			let activeCategories = state.filters.categories

			if (activeCategories.includes(categoryName)) {
				activeCategories = activeCategories.filter((category) => category !== categoryName)
			} else {
				activeCategories = [...state.filters.categories, categoryName]
			}

			return {
				...state,
				filters: {
					...state.filters,
					categories: activeCategories
				}
			}

			case 'RESET_FILTERS':
				return {
					...state,
					filters: {
						...initialState.filters
					}
				}

			case 'CHANGED_CATEGORIES_IN_URL':
				const {categories} = action.payload
				return {
					...state,
					filters: {
						...state.filters,
						categories
					}
				}

			case 'CHANGED_CURRENT_PAGE':
				const {page} = action.payload
				return {
					...state,
					currentPage: page
				}

		default:
			return state
	}
}