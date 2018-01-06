# Dom对象


<!-- TOC depthFrom:2 -->

- [文档树（DOM树）](#文档树dom树)
  - [HTML转换DOM树](#html转换dom树)
  - [获取节点](#获取节点)
  - [节点遍历](#节点遍历)
  - [元素遍历](#元素遍历)
  - [节点操作](#节点操作)
- [操作属性](#操作属性)
  - [属性访问器](#属性访问器)
  - [getAttribute / setAttribute](#getattribute--setattribute)
  - [dataset](#dataset)
- [样式操作](#样式操作)
  - [更新样式](#更新样式)
  - [使用class](#使用class)
  - [统一更新多个元素样式](#统一更新多个元素样式)

<!-- /TOC -->

## 文档树（DOM树）

`DOM`即文档对象模型（Document Object Model）。它使用对象的表示方式来表示对应的文档结构及其中的内容。

**DOM 包含**

- DOM Core
- DOM HTML
- DOM Style
- DOM Event

### HTML转换DOM树

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>My title</title>
  </head>
  <body>
    <a href="http://www.baidu.com">My Link</a>
    <h1>My header</h1>
  </body>
</html>
```

![dom tree](http://opd59bmxu.bkt.clouddn.com/2017121022295.png)

### 获取节点

|                                                     API                                                      | 只作用于 document | 唯一返回值 | live | 特点 |
| ------------------------------------------------------------------------------------------------------------ | ----------------- | ---------- | ---- | ---- |
| [getElementById()](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/getElementById)                 | √                 | √          | √    |      |
| [getElementsByTagName()](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/getElementsByTagName)     |                   |            | √    |      |
| [getElementsByClassName()](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/getElementsByClassName) |                   |            | √    |      |
| [querySelectorAll()](https://developer.mozilla.org/zh-CN/docs/Web/API/ParentNode/querySelectorAll)           |                   |            |      |      |
| [querySelector()](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/querySelector)                   |                   | √          |      |      |

差异

- querySelector的性能比getElementById差一倍，比getElementsByClassName差10倍左右。

### 节点遍历

[节点类型](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType)

|                                           属性                                           |        作用        |
| ---------------------------------------------------------------------------------------- | ------------------ |
| [parentNode](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/parentNode)           | 获取父节点         |
| [firstChild](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/firstChild)           | 获取第一个子节点   |
| [lastChild](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/lastChild)             | 获取最后一个子节点 |
| [previousSibling](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/previousSibling) | 获取后一个相邻节点 |
| [nextSibling](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nextSibling)         | 获取后一个相邻节点 |


```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>My title</title>
  </head>
  <body>
    <a href="http://www.baidu.com">My Link</a>
    <h1>My header</h1>
  </body>
</html>
```


```javascript
// 获取目标节点
var node = document.getElementsByTagName('h1')[0];

// 获得目标节点的父节点
node.parentNode; //body

// 获得目标节点的第一个子节点，不会获取属性节点
node.firstChild;  // "My header" 
// 获得目标节点的最后一个子节点
node.lastChild;  // "My header"

// 获得目标节点的前一个相邻节点
node.previousSibling;  // <a href="http://www.baidu.com">My Link</a>
// 获得目标节点的下一个相邻节点
node.nextSibling;  // null
```


### 元素遍历

|           属性           |        作用        |
| ------------------------ | ------------------ |
| `firstElementChild`      | 获取第一个子元素   |
| `lastElementChild`       | 获取最后一个子元素 |
| `previousElementSibling` | 获取前一个相邻元素 |
| `nextElementSibling`     | 获取后一个相邻元素 |


```html
<html lang="en">
  <head>
    <title>My title</title>
  </head>
  <body>
    <a href="http://www.baidu.com">My Link</a>
    <h1 title="111">My header <a href="#">123</a></h1>
    <h1 title="123"></h1>
  </body>
</html>
```

```javascript
var node = document.getElementsByTagName('h1')[0];

// 获取第一个子元素
node.firstElementChild;       // <a href="#">123</a>
// 获取最后一个子元素
node.lastElementChild;        // <a href="#">123</a>

// 获取前一个相邻元素
node.previousElementSibling; // <a href="http://www.baidu.com">My Link</a>
// 获取后一个相邻元素
node.nextElementSibling;     // <h1 title="123"></h1>
```

### 节点操作


|                                            方法                                            |          作用          |
| ------------------------------------------------------------------------------------------ | ---------------------- |
| [createElement()](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createElement) | 创建节点               |
| [cloneNode()](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/cloneNode)             | 克隆节点               |
| [appendChild()](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/appendChild)         | 插入节点               |
| [insertBefore()](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/insertBefore)       | 插入节点               |
| [replaceChild()](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/replaceChild)       | 替换节点               |
| [removeChild()](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/removeChild)         | 删除节点               |
| [contains()](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/contains)               | 判断节点是否有包含关系 |
| [hasChildNodes()](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/hasChildNodes)     | 判断是否有子节点       |
| [isEqualNode()](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/isEqualNode)         | 判断节点是否相等       |


## 操作属性

### 属性访问器  

```js
obj.attr
obj[attr]
```

通过属性方法符得到的属性为转换过的实例对象（并非全字符串）。

**特点**

- ❌ 通用行差（命名异常，使用不同的命名方式进行访问）
- ❌ 扩展性差
- ✔️ 实用对象（取出后可直接使用）

> 读取属性

```html
<div>
  <label for="username">User Name: </label>
  <input type="input" name="username" id="username" class="text" value="">
</div>
```

```js
var input = document.getElementById('username')
input.className; // 'text'
input[id];        // 'username'
```

> 写入属性

```js
input.value = 'new value';
input[id] = 'new-id';
```

### getAttribute / setAttribute

**特点**

- ❌ 仅可获取字符串（使用时需转换）
- ✔️ 通用性强

>读取属性

获取到的均为属性的字符串。

```js
var attribtue = element.getAttribute('attributeName');
```

>写入属性

可增加新的属性或改写已有属性。

```js
element.setAttribute('attributeName', value);
```

### dataset

自定义属性，其为 HTMLElement 上的属性也是 `data-*` 的属性集。主要用于在元素上保存数据。获取的均为属性字符串。数据通常使用 AJAX 获取并存储在节点之上。

```html
<div id='user' data-id='1234' data-username='x' data-email='mail@gmail.com'></div>
```

```js
div.dataset.id;         // '1234'
div.dataset.username;   // 'x'
div.dataset.email;      // 'mail@gmail.com'
```

**NOTE**：`dataset` 在低版本 IE 不可使用，但可通过 `getAttribute` 与 `setAttribute` 来做兼容。

## 样式操作

**样式分类**
- 行内样式
- 内联样式
- 外部样式

### 更新样式

- `element.style`
- `element.style.cssText`

```js
// element.style
element.style.color = 'red';
element.style.background = 'black';

// element.style.cssText
element.style.cssText = 'color: red; background: black';
```

增加样式后得到的结果

```html
<div style="color: red; background: black;"></div>
```

**❌缺点**

- 每个属性的更新都需要一个命令
- 命名异常（以驼峰命名法命名属性）
- 将样式混合在逻辑当中

### 使用class

首先需要创建对应样式的 CSS 样式。

```css
.angry {
  color: red;
  background: black;
}
```

然后再在 JavaScript 中，在对应的事件中给元素添加需要的类即可。

```js
element.className += ' angry';
```

增加样式后得到的结果

```html
<div class="angry"></div>
```

> 也可以通过删除class来修改样式：

```js
var el = document.getElementById('myDiv')
var className = el.className
var arr = className.split(' ')

// 想要删除指定类名的话，可以先通过`indexOf`获取该类名的下标
arr.pop()
```

### 统一更新多个元素样式

以上方法均不适合同时更新多个样式，通过更换样式表的方式则可同时更改多个页面中的样式。将需要的大量样式也在一个皮肤样式表中，通过 JavaScript 来直接更换样式表来进行样式改变。（此方法也可用于批量删除样式）

```html
<link rel="stylesheet" type="text/css" href="base.css">
<link rel="stylesheet" type="text/css" href="style1.css">
```

```js
element.setAttribute('href', 'style2.css');
```


