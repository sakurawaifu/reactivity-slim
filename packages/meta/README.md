# 介绍

使用 对象属性的 `[[Get]]` 和 `[[Set]]` 元属性（Property Attributes）实现的响应式。

**不提供深度监听功能。**

# 安装

`pnpm add @reactivity-slim/meta`

# 使用

```ts
import { observable, observeKey, observeSelf } from ' @reactivity-slim/meta'

const data = {
  a: 1
}

observable(data)

observeKey(data, 'a', (newV, oldV) => {
  // do something...
})
observeSelf(data, () => {
  // do something...
})
```

# API

## observable(value)

将数据value变为响应式。

`value`：一个纯对象（plain object）或数组。

- plain object：可监听任意属性的写入操作。
- 数组：可监听以下更改数组自身的方法：`push`, `pop`, `shift`, `unshift`, `splice`, `reverse`, `sort`, `fill`, `copyWithin`。


## observeKey(obj, key, callback)

注册 plain object 的属性写入监听回调。当向`obj`的`key`属性写入不同的属性值时，同步触发监听回调`callback`。

`obj`：一个纯对象（plain object）。

`key`：一个`string`、`number`、`symbol`，为要监听的键。

`callback`：一个函数。参数分别为 `newV`、`oldV`，表新键值、旧键值。无返回值。

## observeSelf(value, callback)

注册 plain object，或数组的修改监听回调。当修改对象的任意键，或调用数组的修改方法（见`observable`），同步触发监听回调`callback`。

`value`：一个纯对象（plain object）或数组。

`callback`：一个函数。虽然有两个参数，分别为 `newV`、`oldV`，但均表数据的引用，只是最新的值。无返回值。

## isObservable(value)

判断`value`是否为 Observable 对象。

`value`：任意类型的数据。但应该是一个纯对象（plain object）或数组。

`return`：一个 `boolean`，表示参数`value`是否为 Observable 对象。
