import depCenter from '../depCenter.js'
import { observe } from './index.js'

const observeArray = (ary, callback, options = {}) => {
  const {
    deep = false
  } = options

  depCenter.get(ary)?.add(callback)

  if (deep) {
    ary.forEach(v => observe(v, callback, options))
  }
}

export default observeArray
