export default (obj, prop) => {
  if (Object.keys(obj).length === 0) {
    return
  }
  const objKeys = Object.keys(obj)
  const filtered = objKeys.reduce((acc, key) => {
    if (key !== prop) {
      acc[key] = obj[key]
    }
    return acc
  }, {})

  return filtered
}
