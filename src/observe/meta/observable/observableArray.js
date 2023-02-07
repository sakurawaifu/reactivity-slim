import depCenter from '../depCenter.js'
import { observable } from './index.js'
import { def } from '../../../utils/utils.js'

const observableElems = (ary, options = {}) => {
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

const arrayProto = Array.prototype
const proxyProto = methods.reduce((proto, methodName) =>
  def(proto, methodName, function(...args) {
    const result = arrayProto[methodName].apply(this, args)

    // deep
    if (this._r_options.deep) {
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
      newElem && observableElems(newElem, this._r_options)
    }

    depCenter.get(this).forEach(dep => dep(this, this))
    return result
  }), Object.create(arrayProto))


const observableArray = (ary, options = {}) => {
  const {
    deep = true
  } = options

  const deps = new Set()
  depCenter.set(ary, deps)

  def(ary, '_r_options', deep, false)
  Object.setPrototypeOf(ary, proxyProto)

  // deep
  if (deep) {
    observableElems(ary, options)
  }
}

export default observableArray
