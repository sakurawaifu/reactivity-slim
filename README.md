# 简易响应式系统

监听数据，当数据修改时触发回调。

## 1. meta property

通过属性的 [[Get]]、[[Set]] 元属性实现监听。

### observable(obj, options)

将数据 obj 转换为响应式的。之后可通过 ```observe``` 方法添加监听回调。

```obj```：要监听的对象（只能为 plainObject）。

```options```:

* compare：一个 boolean，表是否需要比较新旧值。false 表不比较，只要设置属性值一律触发回调。
* deep：一个 boolean，表是否深度监听。

```return```：无返回值。

### shallowObservable(obj, options)

浅监听

```observable(obj, {...options, deep: false})```的语法糖。

### observe(obj, key, callback)

监听数据 ```obj``` 的指定键 ```key```，当其修改时触发回调 ```callback```。

若 ```key``` 是深层属性，当其祖先属性被修改导致该属性不存在时，不会触发该属性的回调。

```obj```：要监听的对象（只能为 plainObject）。

```key```：一个 string，表要监听的键。

```callback```：数据修改时触发的回调。

```options```：
* deep：一个 boolean，表是否深度监听。

```return```：无返回值。

## 2. proxy

通过 Proxy 实现监听。

