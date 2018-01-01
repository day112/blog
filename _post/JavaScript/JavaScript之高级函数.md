## 安全的构造函数

使用new操作符调用构造函数时，构造函数内部的this会指向新创建的对象。如果将构造函数当成普通函数使用的话，此时的this指向未知，会造成命名空间的污染，比如：

> 正常

```js
function Person (name, age, job) {
    this.name = name
    this.age = age
    this.job = job
}

var zhangsan = new Person('张三', 16, 'student')
console.log(window.name) // ""
console.log(zhangsan.name) // "张三"
```
> 缺少new, 此时构造函数的属性被添加到了window

```js
function Person (name, age, job) {
    this.name = name
    this.age = age
    this.job = job
}

var zhangsan = Person('张三', 16, 'student')
console.log(window.name) // "张三"
console.log(zhansgan.name) // 报错，只把Person当成普通函数，而没有实例化
```

此时，`Person`的三个实例属性添加到了`window`上，而且`zhangsan`也不是`Person`的实例

为了保证代码的健壮性，可以在构造函数中判断`this`的指向。如果`this`指向`Person`，将参数赋给属性；否则实例化一次`Person`。

```js
function Person (name, age, job) {
  // 判断this的指向
  if (this instanceof Person) {
    this.name = name
    this.age = age
    this.job = job
  } else {
    // this不指向person时，返回Person的实例
    return new Person(name, age, job)
  }
}

const lisi = Person('lisi', 19, 'student')
console.log(window.name) // ""
console.log(lisi.name) // 'lisi'
```

## 惰性函数

```js
function addListener (el, type, handler) {
  if (document.addEventListener) {
    el.addEventListener(type, handler)
  } else {
    el.attachEvent('on' + type, handler)
  }
}
```

> 惰性函数重构版一

```js
function addListener (el, type, handler) {
  if (document.addEventListener) {
    // 重新给函数赋值
    el.addEventListener(type, handler)
    addListener = function (el, type, handler) {
      el.addEventListener(type, handler)
    }
  } else {
    el.attachEvent('on' + type, handler)
    addListener = function (el, type, handler) {
      el.attachEvent('on' + type, handler)
    }
  }
}
```

> 惰性函数重构版二

```js
var addListener = (function () {
  if (document.addEventListener) {
    return function (el, type, handler) {
      return el.addEventListener(type, handler)
    }
  } else {
    return function (el, type, handler) {
      return el.attachEvent('on' + type, handler)
    }
  }
}())
```

> 使用惰性函数，只有初次调用的时候会执行判断，之后再调用不会执行判断

[JavaScript专题之惰性函数](https://github.com/mqyqingfeng/Blog/issues/44)

