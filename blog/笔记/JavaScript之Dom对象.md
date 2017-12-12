[地址](https://github.com/hua03/blog/blob/master/blog/笔记/JavaScript之Dom对象.md)

<!-- TOC depthFrom:2 -->

- [文档树（DOM树）](#文档树dom树)
  - [HTML转换DOM树](#html转换dom树)
  - [节点遍历](#节点遍历)
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

![dom tree](http://opd59bmxu.bkt.clouddn.com/2017121022295.png)

### 节点遍历

[节点类型](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType)

- `parentNode` 获取父节点
- `firstChild` 

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

// 获取第一个子元素节点
node.firstElementChild;       // <a href="#">123</a>
// 获取最后一个子元素节点
node.lastElementChild;        // <a href="#">123</a>

// 获取下一个相邻节点
node.nextElementSibling;     // <h1 title="123"></h1>
// 获取上一个相邻节点
node.previousElementSibling; // <a href="http://www.baidu.com">My Link</a>
```
