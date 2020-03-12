export default (array1, array2) => {
  if (!array1 || !array2) {
    return false
  }

  if (array1.length !== array2.length) {
    return false
  }

  return array1.every((item) => array2.includes(item))
}
