import depCenter from '../depCenter.js'
import { isPlainObject } from '../../../utils/utils.js'

const observableObject = (obj, options = {}) => {
  const {
    compare = true,
    deep = true
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
        deps.forEach(dep => dep(newV, oldV))

        if (newV === oldV && deep) {
          if (isPlainObject(newV)) {
            observableObject(newV, options)
          }
        }
      }
    })

    if (deep) {
      if (isPlainObject(value)) {
        observableObject(value, options)
      }
    }
  }
}

export default observableObject
