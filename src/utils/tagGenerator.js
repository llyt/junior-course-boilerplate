export default (tagName, url, bodyText, classStyle) => {
  return {
    tag: tagName,
    currentClass: classStyle,
    href: url,
    body: bodyText
  }
}