import * as types from './types'

const fetchProducts = (fetchedData) => (
  {
    type: types.FETCHPRODUCTS,
    payload: {
      fetchedData
    }
  }
)

const changeLoaderStatus = (status) => (
  {
    type: types.CHANGELOADERSTATUS,
    payload: {
      status
    }
  }
)

const catchError = (error) => (
  {
    type: types.CATCHERROR,
    payload: {
      error: error.message
    }
  }
)

const inputChange = (name, value) => (
  {
    type: types.INPUTCHANGE,
    payload: {
      name,
      value
    }
  }
)

const resetInputs = () => (
  {
    type: types.RESETINPUTS,
  }
)

export {
  fetchProducts,
  changeLoaderStatus,
  catchError,
  inputChange,
  resetInputs
}

