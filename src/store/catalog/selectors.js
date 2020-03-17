import removeObjProperty from '../../utils/removeObjProperty'
import queryString from 'query-string'

export const getFilteredProductsList = (state) => {
  const { catalog, filters } = state
  const { data } = catalog.products
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

export const getProductListByPage = (state) => {
  const page = state.router.location.query.page || '1'
  const { perPage } = state.catalog.products

  const startIndex = (page - 1) * perPage
  const endIndex = ((page - 1) * perPage) + perPage

  const filteredProducts = getFilteredProductsList(state)
  const slicedProducts = filteredProducts.slice(startIndex, endIndex)
  return slicedProducts
}

export const getParamsFromState = (state) => state.router.location.query

export const makePagination = (state) => {
  const { perPage } = state.catalog.products
  const params = state.router.location.query
  const paginationLength = Math.ceil(getFilteredProductsList(state).length / perPage)
  const page = params.page || '1'
  const paginationSource = []

  const makeNavLink = (text, paramsFromState) => {
    const textDispatch = {
      'Назад': parseInt(page) - 1,
      'Вперед': parseInt(page) + 1
    }
    let newParams = {
      ...paramsFromState,
      page: textDispatch[text]
    }

    if (newParams.page === 1) {
      newParams = removeObjProperty(newParams, 'page')
    }

    const url = decodeURIComponent(queryString.stringify(newParams, {arrayFormat: 'comma'}))

    return [text, `/?${url}`]

  }

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

  if (page < paginationSource.length) {
    paginationSource.push(makeNavLink('Вперед', params))
  }

  if (page !== '1') {
    paginationSource.unshift(makeNavLink('Назад', params))
  }

  return paginationSource.length > 1 ? paginationSource : []

}

export const getLoadingState = (state) => state.catalog.isLoading
export const getError = (state) => state.catalog.error
export const getAllProducts = (state) => state.catalog.products.data

export const getAllProductListLength = (state) => {
  const filteredProductsList = getFilteredProductsList(state)
  const perPage = state.catalog.products.perPage

  return Math.ceil(filteredProductsList.length / perPage)
}

