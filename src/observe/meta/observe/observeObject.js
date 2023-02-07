import depCenter from '../depCenter.js'
import { observe } from './index.js'

const observeObject = (obj, key, callback, options = {}) => {
  const {
    deep = false
  } = options

  depCenter.get(obj)?.[key].add(callback)

  if (deep) {
    const value = obj[key]
    observe(value, callback, options)
  }
}

export default observeObject
