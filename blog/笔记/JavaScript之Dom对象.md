# DOM对象

<!-- TOC depthFrom:2 -->

- [文档树（DOM树）](#文档树dom树)
  - [HTML转换DOM树](#html转换dom树)
  - [节点遍历](#节点遍历)
  - [节点类型](#节点类型)
  - [元素遍历](#元素遍历)

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

![](https://github.com/hua03/blog/blob/master/static/images/dom-tree.png)

### 节点遍历


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

// Node.firstChild
// 获得目标节点的第一个子节点，不会获取属性节点
node.firstChild;  // "My header" 

// Node.lastChild
// 获得目标节点的最后一个子节点
node.lastChild;  // "My header"

// Node.previousSibling;
// 获得目标节点的前一个相邻节点
node.previousSibling;  // <a href="http://www.baidu.com">My Link</a>

// Node.nextSibling;
// 获得目标节点的下一个相邻节点
node.nextSibling;  // null
```

### 节点类型



### 元素遍历

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

node.firstElementChild;       // <a href="#">123</a>
node.lastElementChild;        // <a href="#">123</a>

node.nextElementSibling;     // <h1 title="123"></h1>
node.previousElementSibling; // <a href="http://www.baidu.com">My Link</a>
```
