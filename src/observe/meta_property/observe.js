import { isPlainObject } from '../../utils/utils.js'

const depCenter = new WeakMap()

const observable = (obj, options = {}) => {
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
      }
    })

    if (deep) {
      if (isPlainObject(value)) {
        observable(value, options)
      }
    }
  }
}

const shallowObservable = (obj, options = {}) => {
  observable(obj, {
    ...options,
    deep: false
  })
}

const isObservable = obj => Boolean(depCenter.get(obj))

const observe = (obj, key, callback, options = {}) => {
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

export {
  observable,
  shallowObservable,
  isObservable,
  observe
}
