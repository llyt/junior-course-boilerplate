import dataJSON from '../../products'
import { splitEvery } from 'csssr-school-utils'
import queryString from 'query-string'

const initialState = {
  data: dataJSON,
  perPage: 6
}

// Reducer

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

// Selectors

export const getPaginatedProductList = (state) => {
  const { perPage } = state.products

  const getProductsList = (state) => {
    const { products, filters } = state
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
    const newParams = {
      ...params,
      page: i + 1
    }
    const url = decodeURIComponent(queryString.stringify(newParams, {arrayFormat: 'comma'}))
    paginationSource.push([i + 1, `/?${url}`])
  }

  return paginationSource.length > 1 ? paginationSource : []
}
