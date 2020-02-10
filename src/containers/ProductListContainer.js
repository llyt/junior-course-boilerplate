import { connect } from 'react-redux'
import ProductList from '../components/ProductList/ProductList'
import tagGenerator from '../utils/tagGenerator'
import { getParamsFromUrl } from '../App'
import queryString from 'query-string'

const getPaginationLinks = (products, currentPage, perPage) => {
  const totalPages = Math.ceil(products.length / perPage)
  let paginationLinks = []

  for (let i = 0; i <= totalPages + 1; i += 1) {
    const paramsFromUrl = getParamsFromUrl()
    let currentLink = {}
    let url = '/'

    if (i === 0 && currentPage > 1) {
      paramsFromUrl['page'] = currentPage - 1
      url = queryString.stringify(paramsFromUrl, {arrayFormat: 'comma'})
      currentLink = tagGenerator('a', `/?${url}`, 'Назад', 'prevPage')
    }

    if (i > 0 && i <= totalPages) {
      paramsFromUrl['page'] = i
      url = queryString.stringify(paramsFromUrl, {arrayFormat: 'comma'})
      if (i === currentPage) {
        currentLink = tagGenerator('span', url, i, 'active')
      } else {
        currentLink = tagGenerator('a', url, i)
      }
    }

    if (i === totalPages + 1 && currentPage !== totalPages) {
      paramsFromUrl['page'] = currentPage + 1
      url = queryString.stringify(paramsFromUrl, {arrayFormat: 'comma'})
      currentLink = tagGenerator('a', `/?${url}`, 'Вперед', 'nextPage')
    }

    if (Object.entries(currentLink).length !== 0 && currentLink.constructor === Object) {
      paginationLinks.push(currentLink)
    }
  }

  return paginationLinks
}

const getFilteredProducts = (products, categories, minPrice, maxPrice, discount) => {

  let resultProducts = products

  if (categories && categories.length !== 0) {
    resultProducts = resultProducts.filter(({ category }) => categories.includes(category))
  }

  return resultProducts.filter(({ price }) => {
    return price >= minPrice && price <= maxPrice * (1 - discount / 100)
  })
}

const getProductsPerPage = (products, perPage, currentPage) => {
  const startIndex = (currentPage - 1) * perPage 
  const endIndex = currentPage * perPage
  return products.slice(startIndex, endIndex)
}

const mapStateToProps = (state) => {
  const { products, filters } = state
  const { data, perPage, currentPage } = products
  const { categories, minPrice, maxPrice, discount } = filters

  const filteredProducts = getFilteredProducts(data, categories, minPrice, maxPrice, discount)
  const productsPerPage =  getProductsPerPage(filteredProducts, perPage, currentPage)
  const pagination = getPaginationLinks(filteredProducts, currentPage, perPage)

  return {
    productsPerPage,
    pagination
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handlePaginationClick: (event) => {
      event.preventDefault()
      const nextNumberOfPage = event.target.innerHTML
      dispatch({ type: 'PAGINATION_CLICK', payload: { nextNumberOfPage } })
    },
  }
}

export const ProductListContainer = connect(mapStateToProps, mapDispatchToProps)(ProductList)