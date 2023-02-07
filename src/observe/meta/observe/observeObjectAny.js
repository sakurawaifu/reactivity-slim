import observeObject from './observeObject.js'

const observeObjectAny = (obj, callback, options) => {
  for (const objKey in obj) {
    observeObject(obj, objKey, callback, options)
  }
}
export default observeObjectAny
