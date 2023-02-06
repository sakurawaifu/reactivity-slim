import depCenter from '../depCenter.js'
import { isPlainObject } from '../../../utils/utils.js'
import observe from './index.js'

const observeObject = (obj, key, callback, options = {}) => {
  const {
    deep = false
  } = options

  depCenter.get(obj)?.[key].add(callback)

  if (deep) {
    const value = obj[key]
    if (isPlainObject(value)) {
      for (const valueKey in value) {
        observe(value, valueKey, callback, options)
      }
    }
  }
}
export default observeObject
