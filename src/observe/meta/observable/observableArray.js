import depCenter from '../depCenter.js'
import { observable } from './index.js'
import { def } from '../../../utils/utils.js'

const observeElem = (ary, options = {}) => {
  ary.forEach(v => observable(v, options))
}

const methods = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

const proxyProto = methods.reduce((proto, methodName) =>
  def(proto, methodName, function(...args) {
    const result = Array.prototype[methodName].apply(this, args)

    // deep
    if (this.__options__.deep) {
      let newElem = null
      switch (methodName) {
        case 'push':
        case 'unshift':
          newElem = args
          break
        case 'splice':
          newElem = args.slice(2)
          break
      }
      newElem && observeElem(newElem, this.__options__)
    }

    depCenter.get(this).forEach(dep => dep(this, this))
    return result
  }), Object.create(Array.prototype))


const observableArray = (ary, options = {}) => {
  const {
    deep = true
  } = options

  const deps = new Set()
  depCenter.set(ary, deps)

  def(ary, '__options__', deep, false)
  Object.setPrototypeOf(ary, proxyProto)

  if (deep) {
    observeElem(ary, options)
  }
}

export default observableArray
