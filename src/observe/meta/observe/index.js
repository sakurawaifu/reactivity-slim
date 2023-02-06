import observeArray from './observeArray.js'
import observeObject from './observeObject.js'

const observe = (...args) => {
  if (args.length === 3) {
    observeArray(...args)
  } else if (args.length === 4) {
    observeObject(...args)
  } else {
    throw new Error(`The number of parameters is illegal: expect ${3} or ${4}, get ${args.length}`)
  }
}

export {
  observe
}
