# 变量


<!-- TOC depthFrom:2 -->

- [1. 类型系统](#1-类型系统)
  - [1.1. 标准类型](#11-标准类型)
    - [1.1.1. 基础类型（值类型）](#111-基础类型值类型)
    - [1.1.2. 引用类型（对象类型）](#112-引用类型对象类型)
  - [1.2. 自动类型转换](#12-自动类型转换)
  - [1.3. 类型判断](#13-类型判断)
- [2. 变量传递](#2-变量传递)
  - [2.1. 基本数据类型](#21-基本数据类型)
  - [2.2. 引数据类型](#22-引数据类型)
  - [2.3. 参数传递](#23-参数传递)

<!-- /TOC -->


## 1. 类型系统

javascript 类型系统可以分为基本类型和对象类型，对象类型又可以分为内置对象类型、普通对象类型、自定义对象类型。

![类型系统](http://opd59bmxu.bkt.clouddn.com/20171214204330.png)

### 1.1. 标准类型

#### 1.1.1. 基础类型（值类型）

- Undefined 
- Null 
- Boolean 
- String 
- Number 
- Symbol（ES6新增）

#### 1.1.2. 引用类型（对象类型）

- Object

基本类型和引用类型的区别：

基本类型储存在栈中储存变量的值；而引用类型在栈中保存的是实际内容所在的堆内存的地址。类似于指针的概念，引用类型在栈中并非储存变量真实数值而是地址，所以对已引用类型的复制其实只是复制了相同的地址而非实际的变量值。

### 1.2. 自动类型转换

|   Value   | Boolean |  Number  |      String       |
| --------- | ------- | -------- | ----------------- |
| undefined | false   | NaN      | "undefined"       |
| null      | false   | 0        | "null"            |
| true      | true    | 1        | "true"            |
| false     | false   | 0        | "false"           |
| ''        | false   | 0        | ''                |
| '123'     | true    | 123      | '123'             |
| '1a'      | true    | NaN      | '1a'              |
| 0         | false   | 0        | "0"               |
| 1         | true    | 1        | "1"               |
| Infinity  | true    | Infinity | "Infinity"        |
| NaN       | false   | NaN      | 'NaN'             |
| {}        | true    | NaN      | "[object Object]" |


### 1.3. 类型判断

|            方法             |              基本类型               | 内置对象 | 自定义对象 |                场景                |
| --------------------------- | ----------------------------------- | -------- | ---------- | ---------------------------------- |
| `typeof`                    | √（null除外）                       |          |            | 判断标准类型                       |
| `Object.prototype.toString` | √                                   | √        |            | 判断基本数据类型<br>和内置对象类型 |
| `constructor`               | √ <br>（Undefined <br> /Null 除外） | √        | √          | 👎不推荐使用                        |
| `instanceof`                |                                     | √        | √          | 判断内置对象<br>和自定义对象类型   |

> **特点:**

- Object.prototype.toString
  - 只能检测内置类型
- 构造函数`constructor`
  - `undefined`和`null`没有构造函数无法检测
  - 无法直接检测`number`
  - 函数的 constructor 是不稳定的，这个主要体现在自定义对象上，当开发者重写 prototype 后，原有的 constructor 引用会丢失，constructor 会默认为 Object
- instanceof
  - instanceof从原型链上检测
  - 只能检测`对象类型` 

```js
// ========
// tyoeof
// ========

typeof 0       // "number"
typeof '132'   // "string"
typeof undefined // "undefined"
typeof null // "object"
typeof [] // "object"
typeof {} // "object"



// =========================
// Object.prototype.toString
// =========================

Object.prototype.toString.call(123) // "[object Number]"
Object.prototype.toString.call('abc') // "[object String]"
Object.prototype.toString.call(null) // "[object Null]"
Object.prototype.toString.call([]) // "[object Array]"

function person(){
    this.name = 'zhangsan'
}
var zhangsan = new person()
Object.prototype.toString.call(zhangsan) //"[object Object]"




// ===========
// constructor
// ===========

''.constructor == String //true
[].constructor == Array //true
[].constructor === Array //true

function person (){
    this.name = 'zhangsan'
}
var lisi = new person()
lisi.constructor === person   //true

//修改原型会导致constructor判断失效
person.prototype = []
var zhangsan = new person()
zhangsan.constructor === person  //false



// ===========
// instanceof
// ===========

123 instanceof Number //false
new Number(123) instanceof Number //true

[] instanceof Array //true
[] instanceof Object //true

function person(){
    this.name = 'zhangsan'
}
var zhangsan = new person()
zhangsan instanceof person //true
zhangsan instanceof Object //true
```


[判断 ECMAScript 数据类型的4种方法](http://www.cnblogs.com/onepixel/p/5126046.html)
[如何检查JavaScript变量类型？](http://harttle.com/2015/09/18/js-type-checking.html)


## 2. 变量传递

- **在变量传递过程中，基本数据类型传的是值，引用数据类型传的是对象的堆地址**

### 2.1. 基本数据类型

![基本数据类型传值](http://opd59bmxu.bkt.clouddn.com/2017121810302.png)

```javascript
var num1 = 123
var num2 = num1
```

### 2.2. 引数据类型

![引数据类型传引用地址](http://opd59bmxu.bkt.clouddn.com/20171218103031.png)


```javascript
var obj1 = new Object()
var obj2 = obj1
obj1.name = 'zhangsan'
console.log(obj2.name)  // "zhangsan"
```

### 2.3. 参数传递

- **参数传递的本质是赋值操作（=）**