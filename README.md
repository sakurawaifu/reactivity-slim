# reactivity-slim

## 概述

一个简单的响应式系统监听数据，当数据修改时触发回调。有 meta property 和 proxy 两种实现。

# meta property

通过属性的 [[Get]]、[[Set]] 元属性实现监听。

## API

### observable(obj, options)

将数据 obj 转换为响应式的。之后可通过 ```observe``` 方法添加监听回调，在修改数据时触发回调。

```obj```：要监听的对象（只能为 plainObject）。

```options```:

* compare：一个 boolean，表是否需要比较新旧值。false 表不比较，只要设置属性值一律触发回调。默认true。
* deep：一个 boolean，表是否深度监听。默认true。

```return```：无返回值。

### shallowObservable(obj, options)

浅监听。

```observable(obj, {...options, deep: false})```的语法糖。

### isObservable(obj)

判断对象 ```obj``` 是否为 observable 对象。

```obj```：一个对象。

```return```：一个boolean，表是否为 observable 对象。

### observe(obj, key, callback, options)

监听数据 ```obj``` 的指定键 ```key```，当其修改时触发回调 ```callback```。

```obj```：要监听的对象（只能为 plainObject）。

```key```：一个 string，表要监听的键。

```callback```：数据修改时触发的回调。参数分别为newValue，oldValue。

```options```：

* deep：一个 boolean，表是否深度监听。默认false。

```return```：无返回值。

# proxy

通过 Proxy 实现监听。

