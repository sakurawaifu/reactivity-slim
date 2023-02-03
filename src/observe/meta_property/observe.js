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
      set(nv) {
        if (compare && nv === value) return

        deps.forEach(dep => dep())
        nv = value
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

const observe = (obj, key, callback) => {
  let targetObj = obj
  let targetKey = key
  if (key.includes('.')) {
    const keyPath = key.split('.')
    targetKey = keyPath.pop()
    targetObj = keyPath.reduce((acc, v) => acc[v], obj)
  }

  depCenter.get(targetObj)?.[targetKey].add(callback)
}

export {
  observable,
  shallowObservable,
  observe
}
