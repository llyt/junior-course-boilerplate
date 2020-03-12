export default (data) => {
  const allCategoriesSet = new Set(data.map(({ category }) => category));
  const unSortedList = [...allCategoriesSet];

  return unSortedList.sort((a, b) => (a.name > b.name ? 1 : -1) || 0)
}
