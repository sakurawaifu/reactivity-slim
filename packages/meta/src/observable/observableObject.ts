import { isObservable } from '../utils/utils.js'
import { depCenterKey, depCenterSelf } from '../depCenter.js'
import { Deps } from '../types.js'

const observableObject = (obj: Object) => {
  if (isObservable(obj)) return

  const depsSelf = []
  depCenterSelf.set(obj, depsSelf)
  const depsKey = {}
  depCenterKey.set(obj, depsKey)

  for (const objKey in obj) {
    const deps: Deps = []
    depsKey[objKey] = deps

    let value = obj[objKey]
    Object.defineProperty(obj, objKey, {
      configurable: true,
      enumerable: true,
      get() {
        return value
      },
      set(v: any) {
        const newV = v
        const oldV = value
        if (oldV === newV) return

        value = v
        // trigger
        deps.forEach(dep => dep(newV, oldV))
        depsSelf.forEach(dep => dep(this, this))
      }
    })
  }
}

export default observableObject
