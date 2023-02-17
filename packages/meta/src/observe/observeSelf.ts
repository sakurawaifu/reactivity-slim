import { Dep, Observable } from '../types.js'
import { depCenterSelf } from '../depCenter.js'

const observeSelf = (value: Observable, callback: Dep) => {
  depCenterSelf.get(value)?.add(callback)
}

export default observeSelf
