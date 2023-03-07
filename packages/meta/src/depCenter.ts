import { Deps, Key, Observable } from './types.js'

const depCenterKey = new WeakMap<object, Record<Key, Deps>>()
const depCenterSelf = new WeakMap<Observable, Deps>()

export {
  depCenterKey,
  depCenterSelf
}
