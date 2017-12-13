# DOM事件

<!-- TOC depthFrom:2 -->

- [事件流](#事件流)
- [事件注册](#事件注册)
  - [事件注册](#事件注册-1)
  - [取消事件](#取消事件)
  - [触发事件](#触发事件)
  - [浏览器兼容](#浏览器兼容)
- [事件对象](#事件对象)
  - [属性](#属性)
  - [方法](#方法)
- [事件分类](#事件分类)
  - [Event](#event)
  - [UIEvent](#uievent)
- [事件代理](#事件代理)

<!-- /TOC -->


## 事件流

一个 DOM 事件可以分为**捕获过程**、**触发过程**、**冒泡过程**。 DOM 事件流为 DOM 事件的处理及执行的过程。下面以一个`<a>`元素被点击为例。

![20171213191840](http://opd59bmxu.bkt.clouddn.com/20171213191840.png)

1. **阶段1**代表Capture Phase（事件捕获过程），当 DOM 事件发生时，
它会从window节点一路跑下去直到触发事件元素的父节点为止，去捕获触发事件
的元素。
2. **阶段2**代表Target Phase（触发目标事件），当事件被捕获之后就
开始执行事件绑定的代码
3. **阶段3**代表Bubble Phase（冒泡过程）当事件代码执行完毕后，浏览器
会从触发事件元素的父节点开始一直冒泡到window元素（即元素的祖先元素也会
触发这个元素所触发的事件）

**注意：**
1. 低版本的IE中没有实现捕获的过程
2. 并不是所有的事件都会冒泡


## 事件注册
### 事件注册

```js
// 方式1
eventTarget.addEventListener(type, listener[,useCapture])

// 方式2
elem.onclick = clickHandler;

// 方式3 直接在html中使用onclick绑定事件
// 不建议使用，不够灵活，而且不利于结构和逻辑的分离
```

**注意**：`useCapture` 为设定是否为捕获过程，默认事件均为冒泡过程，只有 `useCapture` 为 `true` 时才会启用捕获过程

```js
// 获取元素
var elem = document.getElemenyById('id');

// 事件处理函数
var clickHandler = function(event) {
  // statements
};

// 注册事件
// 方式1 addEventListener
elem.addEventListener('click', clickHandler, false);

// 方式2 onclick 方式2的兼容性更好
elem.onclick = clickHandler;
// 弥补方式只能调用一个函数
elem.onclick = function(){
  clickHandler();
  func();
  // 其他处理函数
};
```

### 取消事件

```js
eventTarget.removeEventListener(type, listener[,useCapture]);
```

```js
// 获取元素
var elem = document.getElemenyById('id');

// 方式1 取消事件
elem.removeEventListener('click', clickHandler, false);

// 方式2 不建议使用
elem.onclick = null;
```

### 触发事件

点击元素，按下按键均会触发 DOM 事件，当然也可以以通过代码来触发事件。

```js
eventTarget.dispatchEvent(type);

// 获取元素
var elem = document.getElemenyById('id');

// 触发事件
elem.dispatchEvent('click');
```

### 浏览器兼容

早期浏览器 IE8 及其以下版本，均没有采用标准的实现方式。不过这些低版本浏览器也提供了对于 DOM 事件的注册、取消以及触发的实现。
事件注册与取消，`attchEvent/detachEvent`。事件触发，`fireEvent(e)`，不存在捕获阶段（Capture Phase）。

```js
// 注册事件
var addEvent = document.addEventListener ?
  function(elem, type, listener, useCapture) {
    elem.addEventListener(type, listener, useCapture);
  } :
  function(elem, type, listener, useCapture) {
    elem.attachEvent('on' + type, listener);
  }

// 取消事件
var addEvent = document.removeElementListener ?
  function(elem, type, listener, useCapture) {
    elem.removeElementListener(type, listener, useCapture);
  } :
  function(elem, type, listener, useCapture) {
    elem.detachEvent('on' + type, listener);
  }
```


## 事件对象

调用事件处理函数时传入的信息对象，这个对象中含有关于这个事件的详细状态和信息，它就是事件对象 event。其中可能包含鼠标的位置，键盘信息等。

```js
// 获取元素
var el = document.getElemenyById('id');

// 注册事件
el.addEventListener('click', function(event){
  event.cancelBubble = true //阻止冒泡
});
```

### 属性

|                                                             属性                                                              | 只读 |                 作用                  |
| ----------------------------------------------------------------------------------------------------------------------------- | ---- | ------------------------------------- |
| [bubbles](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/bubbles)                                                     | ✔    | 表明当前事件是否会向DOM树上层元素冒泡 |
| [cancelable](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/cancelable)                                               | ✔    | 表明该事件是否可以被取消              |
| [cancelBubble](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/%E7%A6%81%E7%94%A8%E6%97%B6%E9%97%B4%E5%86%92%E6%B3%A1) |      | 阻止事件冒泡                          |
| [target(srcElement IE 低版本)](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/target)                                 | ✔    | 事件触发节点                          |
| [currentTarget](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/currentTarget)                                         | ✔    | 处理事件的节点（冒泡，祖先节点）      |
| [type](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/type)                                                           | ✔    | 触发事件的类型                        |


### 方法

|                                                     方法                                                      |                                     作用                                     |
| ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [createEvent()](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/createEvent)                           | 创建一个新的事件(自定义事件)                                                 |
| [preventDefault()](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/preventDefault)                     | 阻止默认行为（超链接跳转，表单提交，阻止复选框被选中，双击文字时会选中文字） |
| [stopImmediatePropagation()](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/stopImmediatePropagation) | 阻止同一元素之后的监听函数                                                   |
| [stopPropagation()](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/stopPropagation)                   | 阻止冒泡                                                                     |

```js
var a = document.getElementsByTagName('a')[0]

a.addEventListener('click', function(event){
  console.log('100')
})

a.addEventListener('click', function(event){
  console.log('200')
  
  // 阻止事件冒泡
  event.stopPropagation()

  // 1.阻止事件冒泡
  // 2.阻止接下来的监听器 --> 即控制台不会打印出300
  event.stopImmediatePropagation()

  // 阻止默认行为 --> 超链接不会跳转
  event.preventDefault()
})

a.addEventListener('click', function(event){
  console.log('300')
})
```


## 事件分类

### Event

![20171213201911](http://opd59bmxu.bkt.clouddn.com/20171213201911.png)

| 事件类型 | 是否冒泡 |           元素            | 默认事件 |       元素例子        |
| -------- | -------- | ------------------------- | -------- | --------------------- |
| load     | NO       | Window, Document, Element | None     | window, image, iframe |
| unload   | NO       | Window, Document, Element | None     | window                |
| error    | NO       | Window, Element           | None     | window, image         |
| select   | NO       | Element                   | None     | input, textarea       |
| abort    | NO       | Window, Element           | None     | window, image         |

**window**
- `load` 页面全部加载完毕
- `unload` 离开本页之前的卸载
- `error` 页面异常
- `abort` 取消加载

**image**
- `load` 图片加载完毕
- `error` 图标加载错误
- `abort` 取消图标加载

在目标图标不能正常载入时，载入备份替代图来提高用户体验。

```html
<img src="http://sample.com/img.png" onerror="this.src='http://sample.com/default.png'">
```

### UIEvent

| 事件类型 | 是否冒泡 |       元素        | 默认事件 |    元素例子    |
| -------- | -------- | ----------------- | -------- | -------------- |
| resize   | NO       | Window, Element   | None     | window, iframe |
| scroll   | NO/YES   | Document, Element | None     | document, div  |

NOTE：resize 为改变浏览器或iframe的窗体大小时会触发事件，scroll 则会在滑动内容时触发，作用于 Document 则不会冒泡，作用于内部元素则会冒泡。


## 事件代理

