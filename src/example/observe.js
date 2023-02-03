import { observable, observe, shallowObservable } from '../observe/meta_property/observe.js'

const data = {
  a: 1,
  b: 2,
  c: {
    c1: {
      c11: {
        c111: 1
      }
    }
  }
}

observable(data)

observe(data, 'c', () => {
  console.log('update c')
}, {
  deep: true
})
// observe(data, 'c.c1', () => {
//   console.log('update c.c1')
// })

data.c.c1 = 2
