import dataJSON from '../../products'
import { splitEvery } from 'csssr-school-utils'
import queryString from 'query-string';

const initialState = {
  data: dataJSON,
  perPage: 6
};

// Reducer

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

// Selectors

// Product List
export const makeProductList = (state, length = false) => {
  const { perPage } = state.products;
  const { page } = state.filters.params;

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

  const filteredProducts = getProductsList(state);

  if (length) {
    return splitEvery(perPage, filteredProducts).length
  }

  const productByPage = splitEvery(perPage, filteredProducts)[page - 1];

  return productByPage || []
};

// Pagination
export const makePagination = (state) => {
  const {category, page} = state.filters.params;
  const currentPage = parseInt(page);
  const paginationLength = makeProductList(state, true); // That's tricky, i know :)
  const paginationSource = [];

  const makeBackLink = () => {
    const newParams = {
      category,
      page: currentPage - 1
    };
    const cls = 'prevLink';
    const url = queryString.stringify(newParams, {arrayFormat: 'comma'});
    return ['Назад', `/?${url}`, cls];
  };

  const makeNextLink = () => {
    const newParams = {
      category,
      page: currentPage + 1
    };
    const cls = 'nextLink';
    const url = queryString.stringify(newParams, {arrayFormat: 'comma'});
    return ['Вперед', `/?${url}`, cls];
  };

  for (let i = 0; i < paginationLength; i += 1) {
    const newParams = {
      category,
      page: i + 1
    };
    const url = queryString.stringify(newParams, {arrayFormat: 'comma'});
    const cls = currentPage === i + 1 ? 'active' : null;
    paginationSource.push([i + 1, `/?${url}`, cls])
  }

  if (currentPage !== 1) {
    paginationSource.unshift(makeBackLink())
  }

  if (currentPage !== paginationLength) {
    paginationSource.push(makeNextLink())
  }

  return paginationSource.length > 1 ? paginationSource : [];
};
