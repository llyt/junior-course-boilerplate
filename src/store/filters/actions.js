import * as types from './types'

const inputChange = (name, value) => (
  {
    type: types.INPUT_CHANGE,
    payload: {
      name,
      value
    }
  }
)

const resetInputs = (allProducts) => (
  {
    type: types.RESET_INPUTS,
    payload: {
      allProducts
    }
  }
)

export {
  inputChange,
  resetInputs
}

