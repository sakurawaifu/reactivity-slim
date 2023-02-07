import depCenter from '../depCenter.js'
import { observable } from './index.js'

const observableObject = (obj, options = {}) => {
  const {
    deep = true,
    compare = true
  } = options

  const objDeps = {}
  depCenter.set(obj, objDeps)

  for (const objKey in obj) {
    let value = obj[objKey]

    const deps = new Set()
    objDeps[objKey] = deps

    Object.defineProperty(obj, objKey, {
      configurable: true,
      enumerable: true,
      get() {
        return value
      },
      set(newV) {
        if (compare && value === newV) return

        const oldV = value
        value = newV

        // deep
        if (deep && newV !== oldV) {
          observable(newV, options)
        }

        deps.forEach(dep => dep(newV, oldV))
      }
    })

    // deep
    if (deep) {
      observable(value, options)
    }
  }
}

export default observableObject
