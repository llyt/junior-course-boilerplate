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

const resetInputs = () => (
  {
    type: types.RESET_INPUTS,
  }
)

export {
  inputChange,
  resetInputs
}

