import { Dep, Key, Observable } from './types.js'

const depCenterKey = new WeakMap<Observable, Record<Key, Dep[]>>()
const depCenterSelf = new WeakMap<Observable, Dep[]>()

export {
  depCenterKey,
  depCenterSelf
}
