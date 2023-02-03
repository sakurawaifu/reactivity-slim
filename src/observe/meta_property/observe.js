import { isPlainObject } from '../../utils/utils.js'

const depCenter = new WeakMap()

const observable = (obj, options = {}) => {
  const {
    compare = true,
    deep = true
  } = options

  const keyMap = {}
  depCenter.set(obj, keyMap)

  for (const key in obj) {
    let value = obj[key]
    const deps = new Set()
    keyMap[key] = deps

    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        return value
      },
      set(newV) {
        if (compare && newV === value) return

        newV = value
        deps.forEach(dep => dep(newV, value))
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

const observe = (obj, key, callback, options = {}) => {
  const {
    ancestral = true,
    deep = false
  } = options

  let targetObj = obj
  let targetKey = key
  const keyPath = key.split('.')

  if (keyPath.length === 1) {
    depCenter.get(obj)?.[key].add(callback)
  } else {
    let curObj = obj
    for (const curKey of keyPath) {
      targetObj = curObj
      targetKey = curKey
      ancestral && depCenter.get(curObj)?.[curKey].add(callback)
      curObj = curObj[curKey]
    }
  }

  if (deep) {
    const v = targetObj[targetKey]
    if (isPlainObject(v)) {
      for (const k in v) {
        observe(v, k, callback, options)
      }
    }
  }
}

export {
  observable,
  shallowObservable,
  observe
}
