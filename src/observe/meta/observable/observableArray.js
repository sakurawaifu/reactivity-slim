import depCenter from '../depCenter.js'

const methods = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

// const proxyPrototype = methods.reduce((proto, methodName) => {
//   const result = Array.prototype[methodName].call(this)
//
//   return proto
// }, Object.create(Array.prototype))


const observableArray = (ary, options = {}) => {
  const {
    deep = true
  } = options

  const objDeps = {}
  depCenter.set(ary, objDeps)
}

export default observableArray
