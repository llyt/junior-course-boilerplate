import dataJSON from '../../products'
import { splitEvery } from 'csssr-school-utils'
import queryString from 'query-string';

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

// Product List
export const getPaginatedProductList = (state) => {
  const { perPage } = state.products

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

  const filteredProducts = getProductsList(state)

  return splitEvery(perPage, filteredProducts)
}

// Pagination
export const makePagination = (state) => {
  const {category, page} = state.filters.params
  const currentPage = parseInt(page)
  const paginationLength = getPaginatedProductList(state).length
  const paginationSource = []

  for (let i = 0; i < paginationLength; i += 1) {
    const newParams = {
      category,
      page: i + 1
    }
    const url = queryString.stringify(newParams, {arrayFormat: 'comma'});
    const cls = currentPage === i + 1 ? 'active' : null
    paginationSource.push([i + 1, `/?${url}`, cls])
  }


  return paginationSource.length > 1 ? paginationSource : []
}
