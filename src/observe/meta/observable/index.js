import { isPlainObject } from '../../../utils/utils.js'
import observableObject from './observableObject.js'
import observableArray from './observableArray.js'
import depCenter from '../depCenter.js'

const observable = (value, options = {}) => {
  if (isObservable(value)) return

  if (isPlainObject(value)) {
    observableObject(value, options)
  } else if (Array.isArray(value)) {
    observableArray(value, options)
  }
}

const shallowObservable = (value, options = {}) => {
  observable(value, {
    ...options,
    deep: false
  })
}

const isObservable = value => Boolean(depCenter.get(value))

export {
  observable,
  shallowObservable,
  isObservable
}
