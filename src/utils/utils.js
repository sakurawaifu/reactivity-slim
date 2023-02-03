const isPlainObject = value => (
  typeof value === 'object'
  && value !== null
  && Object.getPrototypeOf(value) === Object.prototype
)

export {
  isPlainObject
}
