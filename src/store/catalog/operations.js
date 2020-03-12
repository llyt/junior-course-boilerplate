import * as actions from './actions'

const API_URL = 'https://course-api.csssr.school/products'

export const getProducts = () => (dispatch) => {
  dispatch(actions.onLoader())

  fetch(API_URL)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(`Ошибка ${response.status}`)
      }
    })
    .then(data => {
      if (data.result === 'OK') {
        const fetchedData = data.products
        dispatch(actions.fetchProducts(fetchedData))
      } else {
        throw new Error(data.message)
      }
      dispatch(actions.offLoader())
    })
    .catch(error => {
      dispatch(actions.catchError(error))
      dispatch(actions.offLoader())
    })
}
