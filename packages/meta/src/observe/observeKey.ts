import { Dep, Key } from '../types.js'
import { depCenterKey } from '../depCenter.js'

const observeKey = (obj: Object, key: Key, callback: Dep) => {
  depCenterKey.get(obj)?.[key].add(callback)
}

export default observeKey
