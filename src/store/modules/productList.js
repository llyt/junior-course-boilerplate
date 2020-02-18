import dataJSON from '../../products'
import { splitEvery } from 'csssr-school-utils'

const getProductsList = (state) => {
  const { products, filters } = state;
  const { data } = products;
  const { params, minPrice, maxPrice, discount } = filters;
  const activeCategories = params.category;

  let resultProducts = data;

  if (activeCategories && activeCategories.length !== 0) {
    resultProducts = resultProducts.filter(({category}) => activeCategories.includes(category))
  }

  return resultProducts.filter(({ price }) => {
    return price >= minPrice && price <= maxPrice * (1 - discount / 100)
  })

};

const initialState = {
  data: dataJSON,
  perPage: 6
};

// Reducers

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

// Selectors

export const makeProductList = (state) => {
  const { perPage } = state.products;

  const filteredProducts = getProductsList(state);
  return splitEvery(perPage, filteredProducts)

};
