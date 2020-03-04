import removeObjProperty from '../../utils/removeObjProperty'
import queryString from 'query-string'

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

