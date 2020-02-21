import queryString from 'query-string'

export const getParamsFromUrl = () => {
  const params = queryString.parse(window.location.search, { arrayFormat: 'comma' })
  const categoriesFromParams = params.category

  if (typeof categoriesFromParams === 'string') {
    params.category = [categoriesFromParams]
  }

  if (!params.category) {
    params.category = []
  }

  if (!params.page) {
    params.page = '1'
  }

  return {
    category: params.category,
    page: params.page
  }
}
