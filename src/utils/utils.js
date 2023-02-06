const isPlainObject = value => (
  typeof value === 'object'
  && Object.prototype.toString.call(value) === '[object Object]'
)

const def = (obj, key, value, enumerable = false) =>
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable,
    writable: true,
    value
  })

export {
  isPlainObject,
  def
}
