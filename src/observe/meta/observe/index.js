import { isPlainObject } from '../../../utils/utils.js'
import observeObject from './observeObject.js'
import observeArray from './observeArray.js'
import observeObjectAny from './observeObjectAny.js'

const observe = (value, keyOrCb, ...args) => {
  if (isPlainObject(value)) {
    if (typeof keyOrCb === 'string') {
      observeObject(value, keyOrCb, ...args)
    } else {
      observeObjectAny(value, keyOrCb, ...args)
    }
  }

  if (Array.isArray(value)) {
    observeArray(value, keyOrCb, ...args)
  }
}

export {
  observe
}
