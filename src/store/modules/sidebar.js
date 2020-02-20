import { maxBy } from 'csssr-school-utils'
import dataJSON from '../../products'

const initialState = {
  params: {
    category: [],
    page: '1'
  },
  minPrice: 0,
  maxPrice: maxBy(product => product.price, dataJSON).price,
  discount: 0
};

// Reducer

export default (state = initialState, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      return {
        ...state,
        [action.payload.name]: action.payload.value
      };

    case 'CATEGORY_FILTER':
      const categoryName = action.payload.categoryName;

      const currentCategories = state.params.category;

      let newCategories = [];

      if (currentCategories.includes(categoryName)) {
        newCategories = currentCategories.filter((category) => category !== categoryName)
      } else {
        newCategories = [...currentCategories, categoryName]
      }

      return {
        ...state,
        params: {
          category: newCategories,
          page: '1'
        }
      };

    case 'PAGINATION_CLICK':
      const { nextNumberOfPage } = action.payload;
      const { page } = state.params;
      const currentPage = parseInt(page);
      let nextCurrentPage;

      if (typeof parseInt(nextNumberOfPage) === 'number') {
        nextCurrentPage = parseInt(nextNumberOfPage)
      }
      if (nextNumberOfPage === 'Назад') {
        nextCurrentPage = currentPage - 1
      }
      if (nextNumberOfPage === 'Вперед') {
        nextCurrentPage = currentPage + 1
      }

      return {
        ...state,
        params: {
          ...state.params,
          page: `${nextCurrentPage}`
        }
      };

    case 'RESET_FILTERS':
      return {
        ...initialState
      };

    case 'INIT_STORE_STATE':
      const { category } = action.payload.params;
      const pageFromUrl = action.payload.params.page;

      return {
        ...state,
        params: {
          category,
          page: pageFromUrl
        }
      };

    default:
      return state
  }
}

// Selectors

export const getListOfCategories = (state) => {
  const { data } = state.products;
  const allCategoriesSet = new Set(data.map(({ category }) => category));
  const unSortedList = [...allCategoriesSet];

  return unSortedList.sort((a, b) => (a.name > b.name ? 1 : -1) || 0)
};

export const getActiveCategories = (state) => state.filters.params.category;

export const getMinPrice = (state) => state.filters.minPrice;
export const getMaxPrice = (state) => state.filters.maxPrice;
export const getDiscount = (state) => state.filters.discount;

export const getParamsFromState = (state) => state.filters.params;
