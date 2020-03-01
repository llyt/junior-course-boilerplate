import { maxBy } from 'csssr-school-utils'
import dataJSON from '../../products'
import removeObjProperty from '../../utils/removeObjProperty'
import queryString from 'query-string'

const getListOfCategories = (data) => {
  const allCategoriesSet = new Set(data.map(({ category }) => category));
  const unSortedList = [...allCategoriesSet];

  return unSortedList.sort((a, b) => (a.name > b.name ? 1 : -1) || 0)
}

const initialState = {
  allCategories: getListOfCategories(dataJSON),
  minPrice: 0,
  maxPrice: maxBy(product => product.price, dataJSON).price,
  discount: 0
}

// Reducer

export default (state = initialState, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      return {
        ...state,
        [action.payload.name]: action.payload.value
      }

    case 'RESET_INPUTS':
      return {
        ...initialState
      }

    default:
      return state
  }
}

// Selectors


export const getListOfSidebarCategories = (state) => {
  const { allCategories } = state.filters
  const urlParams = state.router.location.query
  const urlParamsCategories = urlParams.category ? urlParams.category.split(',') : []

  const makeUrl = (prevParams, categoryName) => {
    const prevCategories = prevParams.category ? prevParams.category.split(',') : []
    let newParams = {}
    if (prevCategories && prevCategories.includes(categoryName)) {
      const newCategories = prevCategories.filter((category) => category !== categoryName).join(',')
      if (newCategories !== '') {
        newParams = {
          ...prevParams,
          category: newCategories,
        }
      }
    } else {
      const newCategories = [...prevCategories, categoryName].join(',')
      newParams = {
        ...prevParams,
        category: newCategories,
      }
    }
    const paramsNoPage = removeObjProperty(newParams, 'page')
    const newParamsToString = queryString.stringify({...paramsNoPage}, {arrayFormat: 'comma'})

    return decodeURIComponent(newParamsToString === '' ? '/' : `/?${newParamsToString}`)
  }

  const sidebarCategories = allCategories.map((categoryName) => {
    const active = urlParamsCategories.includes(categoryName)
    const url = makeUrl(urlParams, categoryName)
    return [categoryName, url, active]
  })

  return sidebarCategories
}

export const getMinPrice = (state) => state.filters.minPrice
export const getMaxPrice = (state) => state.filters.maxPrice
export const getDiscount = (state) => state.filters.discount

export const getParamsFromState = (state) => {
  const params = state.router.location.query

  return params
}
