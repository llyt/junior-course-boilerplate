import dataJSON from '../../products'
import queryString from 'query-string'
import { splitEvery } from 'csssr-school-utils'

const getProductsList = (state) => {
  const { products, filters } = state
  const { data } = products
  const { params, minPrice, maxPrice, discount } = filters
  const activeCategories = params.category

  let resultProducts = data

  if (activeCategories && activeCategories.length !== 0) {
    resultProducts = resultProducts.filter(({category}) => activeCategories.includes(category))
  }

  return resultProducts.filter(({ price }) => {
    return price >= minPrice && price <= maxPrice * (1 - discount / 100)
  })

}

const initialState = {
  data: dataJSON,
  perPage: 6
}

// Reducers

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

// Selectors

export const makeProductList = (state) => {
  const { perPage } = state.products

  const filteredProducts = getProductsList(state)
  return splitEvery(perPage, filteredProducts)

}

export const makePagination = (state, paginationLength) => {
  const { params } = state.filters
  const { page } = params
  const pagination = []

  // Filling an array with array of links
  for (let i = 1; i <= paginationLength; i += 1) {
    const nextParams = {...params, page: i}
    const url = queryString.stringify(nextParams, {arrayFormat: 'comma'})
    const cls = i === page ? 'active' : ''
    pagination.push([`${i}`, `?${url}`, cls])
  }

  // Insert 'Назад' link
  if (page !== 1) {
    const backParams = {...params, page: page - 1}
    const backUrl = queryString.stringify(backParams, {arrayFormat: 'comma'})
    pagination.unshift(['Назад', backUrl, 'prevPage'])
  }

  // Insert 'Вперед' link
  if (page !== 1 && page !== paginationLength) {
    const nextParams = {...params, page: page + 1}
    const nextUrl = queryString.stringify(nextParams, {arrayFormat: 'comma'})
    pagination.push(['Вперед', nextUrl, 'nextPage'])
  }

  return pagination
}
