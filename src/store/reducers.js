import { initialState } from './index'

export const mainReducer = (state = initialState, action) => {

	switch (action.type) {
		case "INPUT_CHANGE":
			return {
				...state,
				[action.payload.name]: action.payload.value
			}
			
		case "CATEGORY_FILTER":
			action.payload.event.persist()
			const categoryName = action.payload.event.target.innerHTML

			let activeCategories = state.categories

			if (activeCategories.includes(categoryName)) {
				activeCategories = activeCategories.filter((category) => category !== categoryName)
			} else {
				activeCategories = [...state.categories, categoryName]
			}

			return {
				...state,
				categories: activeCategories
			}

			case 'RESET_FILTERS':
				return {
					...initialState,
					categories: []
				}

			case 'CHECK_URL':
				return {
					...state,
					categories: action.payload.activeCategories
				}

		default:
			return state
	}
}