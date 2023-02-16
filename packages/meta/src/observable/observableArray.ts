import { depCenterSelf } from '../depCenter.js'

const methods = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'reverse',
  'sort',
  'fill',
  'copyWithin'
]

const proxyProto = methods.reduce((proto, methodName) => {
  proto[methodName] = function (...args) {
    Array.prototype[methodName].apply(this, args)
    // trigger
    depCenterSelf.get(this).forEach(dep => dep(this, this))
  }
  return proto
}, Object.create(Array.prototype))

const observableArray = (ary: any[]) => {
  Object.setPrototypeOf(ary, proxyProto)
  depCenterSelf.set(ary, [])
}

export default observableArray
