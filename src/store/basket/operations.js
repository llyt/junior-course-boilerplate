import * as actions from './actions'

export const saveBasket = (basketData) => (dispatch) => {
  const API_URL = 'https://course-api.csssr.school/save'
  dispatch(actions.onSaving())
  fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(basketData),
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(`Ошибка ${response.status}`)
      }
  })
    .then(data => {
      if (data.result === 'OK') {
        dispatch(actions.saveBasket())
        dispatch(actions.offSaving())
      } else {
        throw new Error(data.message)
      }
  })
    .catch(error => {
      dispatch(actions.catchError(error))
      dispatch(actions.offSaving())
    })
}
