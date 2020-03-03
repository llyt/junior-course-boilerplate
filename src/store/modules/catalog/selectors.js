import removeObjProperty from '../../../utils/removeObjProperty'
import queryString from 'query-string'
import { splitEvery } from 'csssr-school-utils'

export const getListOfSidebarCategories = (state) => {
  const { allCategories } = state.catalog.filters
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

export const getMinPrice = (state) => state.catalog.filters.minPrice
export const getMaxPrice = (state) => state.catalog.filters.maxPrice
export const getDiscount = (state) => state.catalog.filters.discount

export const getParamsFromState = (state) => {
  const params = state.router.location.query

  return params
}

export const getPaginatedProductList = (state) => {
  const { perPage } = state.catalog.products

  const getProductsList = (state) => {
    const { products, filters } = state.catalog
    const { data } = products
    const { minPrice, maxPrice, discount } = filters
    const params = state.router.location.query
    const activeCategories = params.category ? params.category.split(',') : null

    let resultProducts = data

    if (activeCategories && activeCategories.length !== 0) {
      resultProducts = resultProducts.filter(({category}) => activeCategories.includes(category))
    }

    return resultProducts.filter(({ price }) => {
      return price >= minPrice && price <= maxPrice * (1 - discount / 100)
    })

  }

  const filteredProducts = getProductsList(state)

  return splitEvery(perPage, filteredProducts)
}

export const makePagination = (state) => {
  const params = state.router.location.query
  const paginationLength = getPaginatedProductList(state).length
  const paginationSource = []

  for (let i = 0; i < paginationLength; i += 1) {
    let newParams = {
      ...params,
      page: i + 1
    }

    if (newParams.page === 1) {
      newParams = removeObjProperty(newParams, 'page')
    }

    const url = decodeURIComponent(queryString.stringify(newParams, {arrayFormat: 'comma'}))
    paginationSource.push([i + 1, `/?${url}`])
  }

  return paginationSource.length > 1 ? paginationSource : []
}

export const getLoadingState = (state) => state.catalog.isLoading
export const getError = (state) => state.catalog.error