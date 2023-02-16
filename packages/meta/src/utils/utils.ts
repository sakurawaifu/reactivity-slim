import { Observable } from '../types.js'
import { depCenterSelf } from '../depCenter.js'

const isObservable = (value: Observable) => depCenterSelf.has(value)

export {
  isObservable
}
