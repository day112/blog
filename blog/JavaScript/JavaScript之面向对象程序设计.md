# 面向对象


<!-- TOC depthFrom:2 -->

- [1. 理解对象](#1-理解对象)
  - [1.1. 对象和原型](#11-对象和原型)
  - [1.2. 原型和 in 操作符](#12-原型和-in-操作符)
- [2. 对象属性](#2-对象属性)
- [3. 创建对象](#3-创建对象)
  - [3.1. 工厂模式](#31-工厂模式)
  - [3.2. 构造函数模式](#32-构造函数模式)
    - [3.2.1. 构造函数模式与工厂模式的区别](#321-构造函数模式与工厂模式的区别)
    - [3.2.2. 构造函数的问题](#322-构造函数的问题)
  - [3.3. 原型模式](#33-原型模式)
  - [3.4. 组合模式](#34-组合模式)
  - [3.5. 动态原型模式](#35-动态原型模式)
- [4. 对象继承](#4-对象继承)
  - [4.1. 原型链继承](#41-原型链继承)
  - [4.2. 构造函数继承](#42-构造函数继承)
  - [4.3. 组合继承](#43-组合继承)
  - [4.4. 原型式继承](#44-原型式继承)
  - [4.5. 寄生式继承](#45-寄生式继承)
  - [4.6. 寄生组合继承](#46-寄生组合继承)
- [5. 对象防篡改](#5-对象防篡改)
  - [5.1. 禁止对象扩展](#51-禁止对象扩展)
  - [5.2. 密封对象](#52-密封对象)
  - [5.3. 冻结对象](#53-冻结对象)

<!-- /TOC -->

## 1. 理解对象

### 1.1. 对象和原型

1. 创建一个新函数的时候，JS引擎会给这个函数添加一个`prototype`属性，这个属性包含一个指针，指向函数的**原型对象**。
2. 默认情况下，所有的**原型对象**会自动获得一个`constructor`属性，这个属性也包含一个指针，指向`prototype`属性所在的函数。
3. 当调用构造函数创建一个实例后，实例的内部包含一个指针，**指向构造函数的原型对象**。
4. **注意：**普通函数的不会产生新的原型，只会指向原来的原型，只有构造函数才会产生新原型

![原型](http://opd59bmxu.bkt.clouddn.com/2017121715546.png)

> 1. 使用`isPrototypeOf`判断对象的原型关系
> 2. 使用`Object.getPrototypeOf()`获取对象的原型
> 3. 使用`hasOwnProperty()`检测属性属于实例对象，只有是实例对象的属性才为`true`。**注意：**对象的属性名是字符串，必须要用引号包起来，否则会将其当成一个**变量**。

```javascript
Array.prototype.isPrototypeOf([]) // true

Object.getPrototypeOf([]) === Array.prototype // true

function Person(){}
Person.prototype.name = 'zhangsan'
var zhangsan = new Person()
zhangsan.name = 'lisi'
zhangsan.hasOwnProperty('name') // true
```

>**tips：**每当读取某个对象的某个属性时，都会执行一次搜索，搜索先从实例对象本身开始，如果没找到，则会搜索其原型对象，还没找到，就会沿着原型链一级一级往上搜索。

<div></div>

>**tips2：**
> 1. 虽然可以通过实例对象访问原型对象上的属性，但不能通过实例对象重写原型的属性
> 2. 给实例对象的属性赋值，只会阻止实例对象访问原型上的属性，而不会修改原型的属性的值
> 3. 使用`delete`可以删除实例对象的属性

```javascript
function Person(){}
Person.prototype.name = 'Nicholas'

var p1 = new Person()
var p2 = new Person()

p1.hasOwnProperty('name') // false

p1.name = 'Greg'
console.log(p1.name)  // "Greg" ———— 来自实例
p1.hasOwnProperty('name')  // true

console.log(p2.name)  // "Nicholas" ———— 来自原型
p2.hasOwnProperty('name') // false


console.log(p1.name)  // "Nicholas" ———— 来自原型
p1.hasOwnProperty('name')  //
```


### 1.2. 原型和 in 操作符

- 使用方式
	1. 单独使用
	2. for...in 循环中使用
- in 操作符对于能够访问的属性，会返回true。**无论是实例的属性还是原型的属性**

```javascript
function Person(){}
Person.prototype.name = 'Nicholas'

var p1 = new Person()

p1.hasOwnProperty('name') // false
"name" in p1; // true

p1.name = 'Greg'
console.log(p1.name)  // "Greg" ———— 来自实例
p1.hasOwnProperty('name')  // true
"name" in p1; // true
```

> 判断属性存在是否存在于原型中

```javascript
function hasPrototypeProperty(obj, name){
	// 不存在于实例中，但是能用 in 来访问
	return !Object.hasOwnProperty(name) && (name in obj)
}
```

## 2. 对象属性

- 属性类型
	- 数据属性
		- 可配置 `[[Configurable]]`
		- 可枚举 `[[Enumerable]]`
		- 可读写 `[[Writable]]`
		- 属性值 `[[Value]]`
		- **注意：**前三个值不指定默认为`false`， `value`不指定默认为`undefined`
	- 访问器属性
		- 可配置 `[[Configurable]]`
		- 可枚举 `[[Enumerable]]`
		- 读取属性`[[Get]]`
		- 写入属性`[[Set]]`
		- **注意：**访问器属性没有值。严格模式下必须指定`[[Get]]`和`[[Set]]`，否则报错

> 使用`Object.defineProperty()`定义属性

```javascript
// 数据属性
var person = {}
Object.defineProperty(person, '_name', {
	configurable: false,
	value: 'zhangsan'
})

// 访问器属性
Object.defineProperty(person, 'name', {
	get: function(){
		return this._name
	},
	set: function(val){
		if(val !== 'zhangsan'){
		   this._name = val
		}
    }
})
```

> `Object.defineProperties()`可以设置对象的多个属性

```javascript
var book = {}

Object.defineProperties(book, {
   _year: {
	   value: 2014
   },
   edition: {
      value: 1
   },
   year: {
      get: function(){
         return this._year
      },
      set: function(val){
         this._year += val
      }
   }
})
```

> `Object.getOwnPropertyDescriptor(obj, prop)`获取单个属性的描述符

```javascript
var book = {}

Object.defineProperties(book, {
   _year: {
	   value: 2014
   },
   edition: {
      value: 1
   },
   year: {
      get: function(){
         return this._year
      },
      set: function(val){
         this._year += val
      }
   }
})

var descriptor = Object.getOwnPropertyDescriptor(book, "year")
console.log(descriptor) // ==> {enumerable: false, configurable: false, get: ƒ, set: ƒ}
```

> `Object.getOwnPropertyDescriptors(obj)`获取对象所有属性的描述符

```javascript
var book = {}

Object.defineProperties(book, {
   _year: {
	   value: 2014
   },
   edition: {
      value: 1
   },
   year: {
      get: function(){
         return this._year
      },
      set: function(val){
         this._year += val
      }
   }
})

var descriptor = Object.getOwnPropertyDescriptors(book)
console.log(descriptor) // ==> {_year: {…}, edition: {…}, year: {…}}
```





## 3. 创建对象

### 3.1. 工厂模式

- 1.什么是工厂模式 ?
	- 工厂模式是创建对象的一种模式，抽象了创建具体对象的过程。它会根据接受的参数创建一个对象
- 2.为什么需要工厂模式？
	- ES6之前没有类的概念，开发人员就通过函数来封装接口
- 3.工厂模式的**缺点**
	- 不能对对象类型进行识别（怎么知道一个对象的类型？）
	- 对象的方法放在函数的内部的时候，多个实例会将方法重新创建一边

```javascript
function createPerson(name, age, job){
  var o  = new Object()
  o.name = name
  o.age  = age
  o.job  = job
  o.sayName = sayName
  return o
}

// 把方法放在外面，可以避免多个示例创建同样的方法
function sayName(){
  console.log('my name is '+this.name)
}

var zhangsan = createPerson('zhangsan', 16, 'student')
var lisi = createPerson('lisi', 26, 'teacher')
```

### 3.2. 构造函数模式

构造函数模式使用`new`操作符来创建对象，构造函数创建的对象具有特定类型，例如以`Person()`创建的对象，其类型为`Person`。

```javascript
function Person(name, age, job){
	this.name = name
	this.age = age
	this.job = job
	this.sayName = function(){
		console.log('my name is ' + this.name)
	}
}

const zhangsan = new Person('zhangsan', 19, 'student')
const lisi = new Person('lisi', 28, 'teacher')
```

#### 3.2.1. 构造函数模式与工厂模式的区别

1. 没有显示地创建对象
2. 直接将属性和方法通过`this`赋给对象
3. 没有`return`

**注意：**
	1. 为了和非构造函数相区别，构造函数始终以大写字母开头
	2. 构造函数和普通函数的唯一区别：**调用方式的不同**。只要通过`new`操作符调用，那它就可以作为构造函数；不通过`new`来调用，就跟普通函数没两样。

#### 3.2.2. 构造函数的问题

1. 构造函数的主要问题：**每个函数都要在每个实例中重现创建一遍**（函数内部机制相同）。为了解决这个问题，可以将函数放在构造函数的外面定义。

```javascript
function Person(name, age, job){
	this.name = name
	this.age = age
	this.job = job
	this.sayName = sayName
}
function sayName(){
	console.log('my name is ' + this.name)
}

var lisi = new Person('李四', 17, 'stu')
```
虽然解决了函数复用的问题，但是引出了更多的问题：
1. 函数放在构造函数的外面定义，**不安全**。可能会被重写或者覆盖。
2. 如果全局作用域中放很多只能被某个对象调用的函数，全局作用域有点名不副实。
3. 如果对象需要定义很多函数的话，就需要定义很多全局函数，自定义类型就没什么封装性可言。

### 3.3. 原型模式

**原型对象的优点：**所有的对象实例共享原型的属性和方法。换句话说可以不必在构造函数定义属性和方法，而是把这些信息添加在原型对象中

**原型对象的缺点：**原型的所有属性都会被实例所共享，这种共享对于函数是很好的，但是对于基本值和引用类型来说就不大友好，例如有一个`Person`对象，它实例化出`zhangsan`和`lisi`，对于`zhangsan`和`lisi`的`friends`应该是不同的。

```javascript
function Person(){
}
Person.prototype.name = 'zhangsan'
Person.prototype.age = 12
Person.prototype.job = "stu"
Person.prototype.sayName = function(){console.log('my name is ' + this.name)}
var lisi = new Person()
console.log(lisi.name)
```
**注意： **新建对象的属性没有赋值前，指向的是原型上的属性，例如上面代码中的`lisi.name`指向了`Person.prototype.name`

**简化版原型语法**

```javascript
function Person(){}
Person.prototype = {
	constructor : Person, // 构造函数 组合原型
	name : 'zhangsan',
	age : 12,
	job : 'student',
	sayName: function(){
       console.log(this.name)
    }
}

// 组合模式
function Animal(name, age){
	this.name = name
	this.age = age
}
Animal.prototype = {
	constructor : Animal,
	type: cat,
	sayName: function(){
        console.log(this.name)
    }
}

```

### 3.4. 组合模式

**组合模式的缺点：**封装不够彻底，将细节暴露出来

```javascript
// 组合模式
function Animal(name, age){
	this.name = name
	this.age = age
}
Animal.prototype = {
	constructor : Animal,
	type: cat,
	sayName: function(){
        console.log(this.name)
    }
}
```

### 3.5. 动态原型模式

```javascript
function Animal(name, age, food){
	this.name = name
	this.age = age
	this.food = food
	if(typeof this.sayName !== 'function'){
	   Animal.prototype.sayName = function(){
          console.log(this.name)
       }
       Animal.prototype.eat = function(){
          console.log('i like ' + this.food)
       }
	}
}
```

## 4. 对象继承

### 4.1. 原型链继承

> 思路

1. 将父类的实例赋值给子类的原型

> 具体实现

```javascript
function Animal(){
  this.type = 'Animal'

  // 动态原型
  if(typeof this.getType !== 'function'){
    Animal.prototype.getType = function(){
      console.log(this.type);
    }
  }
}

function Cat(name){
  this.name = name
}

// 父类实例赋给子类原型
Cat.prototype = new Animal()

Cat.prototype.getName = function(){
  console.log(this.name)
}

var nico = new Cat('nico')
nico.getType() // --> animal
```

> **优缺点**

**缺点：**
1. 父类的实例属性（通过构造函数定义的属性），会变成子类的原型属性
2. 创建子类实例时，不能向父类的构造函数传递参数

> **注意：**

1. 所有的引用类型默认是`Object`的实例
2. 判断原型和实例的关系，`instanceof` 和 `isPropotypeOf`
3. 谨慎定义方法
	- 给子类原型定义与父类同名的方法，会屏蔽掉父类的方法
	- 将父类的实例赋值给子类原型后，不允许再给子类原型`prototype`赋值，不然会**切断原型链**

>**Tips:**

`window`是`Object`的一个子类，`Object`是`window`的原型

### 4.2. 构造函数继承

> 思路

1. 通过`call()`来调用父类的构造函数

> 具体实现

```javascript
function Animal(type){
  this.type = type

  if(typeof this.say !== 'function'){
    Animal.prototype.say = function(){
      console.log(this.name)
    }
  }
}

function Cat(name, age, type){
  Animal.call(this, type)       // 核心
  this.name = name
  this.age = age
}

var nico = new Cat('nico', 2, 'dog')
var cc = new Cat('cc', 3, 'cat')
```

> **缺点:**

1. 和构造函数模式想同，不能复用函数
2. 子类实例不能调用父类原型上的属性和方法，只是借用了父类的构造函数

### 4.3. 组合继承

> 思路

1. 通过`call()`调用父类的构造函数
2. 再将父类的实例赋值给子类的原型

> 实现

```javascript
function Animal(type){
  this.type = type

  if(typeof this.say !== 'function'){
    Animal.prototype.say = function(){
      console.log(this.name)
    }
  }
}

function Cat(name, age, type){
  Animal.call(this, type)       // 调用父类的构造函数
  this.name = name
  this.age = age
}

Cat.prototype = new Animal()  // 父类原型

var nico = new Cat('nico', 2, 'dog')
```

**注意：**
- 通过构造函数生成的引用类型数据不会共享，比如数组。因此，不想要共享的数据都要通过构造函数生成

> 优缺点

组合继承集合了原型链继承和构造函数继承的优点，避免了他们的缺陷，也能用`instanceof`和`isPrototypeOf()`识别，唯一的缺点会调用两次父类实例

### 4.4. 原型式继承

> 思路

其本质是复制对象，然后对复制的对象进行扩展

> 实现

```javascript
var person = {
	name: 'zhangsan',
	age: 16
}

var zs = Object.create(person, {
	job:{
	   value: 'stu'
	}
})
console.log(zs) // {name: 'zhangsan', age: 16, job: 'stu'}
```
**注意：**原型继承的引用类型会共享

> 使用场景

1. 如果创建一个对象，其构造函数和自定义类型不是必须的时候

### 4.5. 寄生式继承

> 核心思路

类似于工厂模式。封装了继承的过程，并对继承的对象进行增强

> 实现

```javascript
function createAnthor(obj){
  var clone = Object.create(obj)
  clone.say = function(){
    console.log('hi')
  }
  return clone
}
```
**注意：**这种继承方式和原型继承一样，没有自定义类型

> 缺点

1. 无法共享函数

### 4.6. 寄生组合继承

> 思路

1. 通过寄生构造函数将子类的原型和父类联系起来，避免每次实例化都会调用

> 实现

```javascript
function Animal(type){
  this.type = type
}

Animal.prototype.say = function(){
  console.log(this.type)
}

function Cat(name, type){
  Animal.call(this, type)
  this.name = name
}

// 核心: 将子类原型指向了父类
function inheritPrototype(subObj, superObj){
  var prototype = Object.create(superObj.prototype)
  prototype.constructor = subObj
  subObj.prototype = prototype
}

inheritPrototype(Cat, Animal)

var cc = new Cat('cc', 'cat')
```

## 5. 对象防篡改

由于对象的共享本质，任何对象都能被同一运行环境中的代码修改。开发人员也可能会意外的修改对象。为了保证对象的正常，可以对对象进行防篡改设置。

> **注意：** 防篡改设置完后，不能撤销

### 5.1. 禁止对象扩展

禁止对象扩展后，对象不能添加新方法和属性

```js
var nico = {name: 'nico'}
// 禁止对象扩展
Object.preventExtensions(nico)

person.age = 29
console.log(person.age) //undefined
```

### 5.2. 密封对象

密封对象后，只能执行一个操作（修改属性的值，或者重新给方法赋值也行）。

```js
var nico = {
  name: "nico",
  say: function () {
    console.log(this.name)
  }
}
// 禁止对象扩展
Object.seal(nico)

// 1. 能修改属性值，无论属性的值是基本类型还是对象
nico.name = 'zhangsan'
console.log(nico.name) //'zhangsan'

// 2.能修改方法
nico.say = function (){
  console.log('my name is ' + this.name)
}
nico.say() // my name is zhangsan

// 3.不能添加新属性
person.age = 29
console.log(person.age) //undefined

// 4.不能删除属性
delete nico.name
console.log(nico.name) //'zhangsan'
```

### 5.3. 冻结对象

被冻结对象自身的所有属性都不可能以任何方式被修改。冻结只涉及对象本身，如果属性中包含对象类型，不会冻结改对象。

```js
var nico = {
  name: "nico",
  friends: ['zhansgan', 'lisi', ['王五', '赵六']]
  say: function () {
    console.log(this.name)
  }
}
Object.freeze(nico)

// 深度冻结
function deepFrozen (obj) {
  var props = Object.getOwnPropertyNames(obj)

  props.forEach(function (name) {
    var prop = obj[name]
    if (typeof prop === 'object' && prop !== null) {
      deepFrozen(prop)
    }
  })

  return Object.freeze(obj)
}

deepFrozen(nico)
```
