export type Key = string | number | symbol

export type Observable = object | any[]

export type Dep = (newV: any, oldV: any) => void

export type Deps = Set<Dep>
