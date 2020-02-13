import dataJSON from '../../products'
import tagGenerator from '../../utils/tagGenerator'
import { getParamsFromUrl } from '../../App'
import queryString from 'query-string'

const initialState = {
  data: dataJSON,
  perPage: 6
}

// Actions

/* What should be here? */

// Reducers

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

// Selectors

export const getPaginationLinks = (state) => {
  const { products, filters } = state
  const { data, perPage } = products
  const { page } = filters.params

  const totalPages = Math.ceil(data.length / perPage)
  let paginationLinks = []

  for (let i = 0; i <= totalPages + 1; i += 1) {
    const paramsFromUrl = getParamsFromUrl()
    let currentLink = {}
    let url = '/'

    if (i === 0 && page > 1) {
      paramsFromUrl['page'] = page - 1
      url = queryString.stringify(paramsFromUrl, {arrayFormat: 'comma'})
      currentLink = tagGenerator('a', `/?${url}`, 'Назад', 'prevPage')
    }

    if (i > 0 && i <= totalPages) {
      paramsFromUrl['page'] = i
      url = queryString.stringify(paramsFromUrl, {arrayFormat: 'comma'})
      if (i === page) {
        currentLink = tagGenerator('span', url, i, 'active')
      } else {
        currentLink = tagGenerator('a', url, i)
      }
    }

    if (i === totalPages + 1 && page !== totalPages) {
      paramsFromUrl['page'] = page + 1
      url = queryString.stringify(paramsFromUrl, {arrayFormat: 'comma'})
      currentLink = tagGenerator('a', `/?${url}`, 'Вперед', 'nextPage')
    }

    if (Object.entries(currentLink).length !== 0 && currentLink.constructor === Object) {
      paginationLinks.push(currentLink)
    }
  }

  return paginationLinks
}

export const getProductsList = (state) => {
  const { products, filters } = state
  const { data, perPage } = products
  const { params, minPrice, maxPrice, discount } = filters
  const { category, page } = params

  const getFilteredProducts = (products, categoryList, minPrice, maxPrice, discount) => {
    let resultProducts = products

    if (categoryList && categoryList.length !== 0) {
      resultProducts = resultProducts.filter(({category}) => categoryList.includes(category))
    }

    return resultProducts.filter(({ price }) => {
      return price >= minPrice && price <= maxPrice * (1 - discount / 100)
    })

  }

  const getProductsPerPage = (products, currentPage, perPage) => {
    const startIndex = (currentPage - 1) * perPage 
    const endIndex = currentPage * perPage

    return products.slice(startIndex, endIndex)
  }

  const filteredProducts = getFilteredProducts(data, category, minPrice, maxPrice, discount)
  return getProductsPerPage(filteredProducts, page, perPage)
}