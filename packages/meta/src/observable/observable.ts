import { Observable } from '../types.js'
import { isPlainObject } from '@reactivity-slim/shared'
import observableObject from './observableObject.js'
import observableArray from './observableArray.js'

const observable = (value: Observable) => {
  if (isPlainObject(value)) {
    observableObject(value)
  } else if (Array.isArray(value)) {
    observableArray(value)
  } else {
    throw new Error('value must be a plain object, or an array')
  }
}

export default observable
