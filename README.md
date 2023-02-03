# 简易响应式系统

监听数据，当数据修改时触发回调。

## 1. meta property

通过属性的 [[Get]]、[[Set]] 元属性实现监听。

### observable(obj, options)

```obj```：要监听的对象（只能为 plainObject）。

```options```:

* compare：是否需要比较新旧值。false 表不比较，只要设置属性值一律触发回调。
* deep：是否深度监听。

### shallowObservable(obj, options)

浅监听

```observable(obj, {...options, deep: false})```的语法糖。

### observe(obj, key, callback)
```obj```：要监听的对象（只能为 plainObject）。
```key```：要监听的键。
```callback```：数据修改时触发的回调。

## 2. proxy

通过 Proxy 实现监听。

