# reactivity-slim

## 概述

一个简单的响应式系统监听数据，当数据修改时触发回调。有 meta property 和 proxy 两种实现。

## 安装

`npm i reactivity-slim`

## 使用
`import { observable, observe } from 'reactivity-slim/meta.js'`

或

`import { observable, observe } from 'reactivity-slim/proxy.js'`

# meta property

* 对象：通过对象属性的 [[Get]]、[[Set]] 元属性实现。
* 数组：通过重写数组的 push、pop、shift、unshift、splice、sort、reverse 方法实现。因为如果使用数组索引的 [[Get]]、[[Set]] 元属性来实现，当数组元素较多时，性能较差。

## API

### observable(value, options)

将数据 value 转换为响应式的。之后可通过 `observe` 方法添加监听回调，在修改数据时触发回调。

`value`：要监听的数据。只能为 plain object 或数组。

`options`:

* deep：一个 boolean，表是否深度响应式。默认true。深度响应式时，设置对象的属性值或数组的元素为新数据，也会自动深度监听新数据。
* compare：仅用于 plain object。一个 boolean，表是否需要比较对象属性的新旧值。false 表不比较，只要设置属性值一律触发回调。默认true。

`return`：无返回值。

---

### shallowObservable(value, options)

浅监听。

`observable(value, {...options, deep: false})`的语法糖。

### isObservable(value)

判断 `value` 是否为 observable 数据。

`value`：一个数据。

`return`：一个boolean，表是否为 observable 数据。

---

### observe(obj, key, callback, options)

监听对象 `obj` 的指定键 `key`，当其被修改时触发回调 `callback`。

`obj`：要监听的对象（只能为 plain object）。

`key`：一个 string，表要监听的键。

`callback`：指定键被修改时触发的回调。参数分别为newValue，oldValue，表被修改键的新旧值。

`options`：

* deep：一个 boolean，表是否深度监听。默认false，仅键自身的值被改变时触发更新，键值即使为 plain object 或数组，修改它时也不触发回调。

`return`：无返回值。

---

### observe(obj, callback, options)

监听对象 `obj` 的所有键，当其被修改时触发回调 `callback`。

`obj`：要监听的对象（只能为 plain object）。

`callback`：任意键被修改时触发的回调。参数分别为newValue，oldValue，表被修改键的新旧值。

`options`：

* deep：一个 boolean，表是否深度监听。默认false，仅键自身的值被改变时触发更新，键值即使为 plain object 或数组，修改它时也不触发回调。

`return`：无返回值。

---

### observe(ary, callback, options)

监听数组 `value`，当其修改时触发回调 `callback`。

`ary`：要监听的数组。

`callback`：数据修改时触发的回调。参数分别为newValue，oldValue。但是不保留副本，两个参数均是最新的数组。

`options`：

* deep：一个 boolean，表是否深度监听。默认false，仅调用监听的数组方法被改变数组时触发更新。数组元素即使为 plain object 或数组，修改它时也不触发回调。

`return`：无返回值。

# proxy

通过 Proxy 实现监听。

