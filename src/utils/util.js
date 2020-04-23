export function isObject(val) {
  return typeof val === 'object'
}
export function isPlainObject(val) {
  return Object.prototype.toString.call(val) === "[object Object]"
}
export function hasOwn(val, key) {
  const hasOwnProperty = Object.prototype.hasOwnProperty
  return hasOwnProperty.call(val, key)
}