import { observable, observe } from '../observe/meta_property/observe.js'

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

observable(data, {
  compare: false,
  deep: true
})

observe(data, 'c', (nv, ov) => {
  console.log('c')
  console.log(nv, ov)
}, {
  deep: true
})

observe(data.c.c1, 'c11', (nv, ov) => {
  console.log('c11')
  console.log(nv, ov)
}, {
  deep: true
})

data.c.c1.c11 = 1
