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

      const paramsFromUrl = state.routing.params // {category: [], page: <string>}
      const categoriesFromUrl = paramsFromUrl.category || []

      let newCategories = []
      let newParams = {}

      if (categoriesFromUrl.includes(categoryName)) {
        newCategories = categoriesFromUrl.filter((category) => category !== categoryName)
        if (newCategories.length !== 0) {
          newParams = {...paramsFromUrl, category: newCategories}
        } else {
          newParams = Object.keys(paramsFromUrl).reduce((acc, param) => {
            if (param !== 'category') {
              acc[param] = paramsFromUrl[param]
            }
            return acc
          }, {})
        }
      } else {
        newCategories = [...categoriesFromUrl, categoryName]
        newParams = {...paramsFromUrl, category: newCategories}
      }

      // Reset page number in Url
      newParams = {...Object.keys(newParams).reduce((acc, param) => {
        if (param !== 'page') {
          acc[param] = newParams[param]
        }
        return acc
      }, {})}

      return {
        products: {
          ...state.products,
          currentPage: 1
        },
        filters: {
          ...state.filters,
          categories: newCategories
        },
        routing: {
          params: newParams
        }
      }

    case 'RESET_FILTERS':
      return {
        ...initialState
      }

    case 'PUSH_ROUTING_STATE':
      const { params } = action.payload
      const { category, page } = params

      return {
        ...state,
        products: {
          ...state.products,
          currentPage: parseInt(page) || 1
        },
        filters: {
          ...state.filters,
          categories: category || []
        },
        routing: {
          params
        }
      }

      case 'PAGINATION_CLICK':
        const { nextNumberOfPage } = action.payload
        const { currentPage } = state.products       
        let nextPage

        if (typeof parseInt(nextNumberOfPage) === 'number') {
          nextPage = parseInt(nextNumberOfPage)
        }
        if (nextNumberOfPage === 'Назад') {
          nextPage = currentPage - 1
        }
        if (nextNumberOfPage === 'Вперед') {
          nextPage = currentPage + 1
        }

        const getNextParams = (page) => {
          if (page !== 1) {
            return {...state.routing.params, page}
          }
          return Object.keys(state.routing.params).reduce((acc, param) => {
            if (param !== 'page') {
              acc[param] = state.routing.params[param]
            }
            return acc
          }, {})
        }

        const nextCurrentPage = nextPage
        const nextParams = getNextParams(nextPage)

        return {
          ...state,
          products: {
            ...state.products,
            currentPage: nextCurrentPage // REPAIR THIS SHIT
          },
          routing: {
            params: nextParams
          }
        }

    default:
      return state
  }
}