# DOM事件

> [原文地址](https://github.com/hua03/blog/blob/master/blog/笔记/JavaScript之事件.md)

<!-- TOC depthFrom:2 -->

- [事件流](#事件流)
- [事件绑定](#事件绑定)
  - [事件注册](#事件注册)
  - [取消事件](#取消事件)
  - [触发事件](#触发事件)
  - [浏览器兼容](#浏览器兼容)
- [事件对象](#事件对象)
  - [属性](#属性)
  - [方法](#方法)
- [事件分类](#事件分类)
  - [Event](#event)
  - [UIEvent](#uievent)
  - [MouseEvent](#mouseevent)
    - [事件类型](#事件类型)
    - [MouseEvent的触发顺序](#mouseevent的触发顺序)
  - [滚轮事件（Wheel）](#滚轮事件wheel)
  - [FocusEvent](#focusevent)
  - [InputEvent](#inputevent)
  - [KeyboardEvent](#keyboardevent)
- [事件代理](#事件代理)

<!-- /TOC -->


## 事件流

一个 DOM 事件可以分为**捕获过程**、**触发过程**、**冒泡过程**。 DOM 事件流为 DOM 事件的处理及执行的过程。下面以一个`<a>`元素被点击为例。

![20171213191840](http://opd59bmxu.bkt.clouddn.com/20171213191840.png)

1. **阶段1:** 代表Capture Phase（事件捕获过程），当 DOM 事件发生时，它会从window节点一路跑下去直到触发事件元素的父节点为止，去捕获触发事件的元素。
2. **阶段2:** 代表Target Phase（触发目标事件），当事件被捕获之后就开始执行事件绑定的代码
3. **阶段3:** 代表Bubble Phase（冒泡过程）当事件代码执行完毕后，浏览器会从触发事件元素的父节点开始一直冒泡到window元素（即元素的祖先元素也会触发这个元素所触发的事件）

**注意：**
1. 低版本的IE中没有实现捕获的过程
2. 并不是所有的事件都会冒泡


## 事件绑定

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
var removeEvent = document.removeElementListener ?
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

![事件分类](http://opd59bmxu.bkt.clouddn.com/20171213201911.png)

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

|                               事件类型                               | 是否冒泡 |       元素        | 默认事件 |    元素例子    |
| -------------------------------------------------------------------- | -------- | ----------------- | -------- | -------------- |
| [resize](https://developer.mozilla.org/zh-CN/docs/Web/Events/resize) | NO       | Window, Element   | None     | window, iframe |
| [scroll](https://developer.mozilla.org/zh-CN/docs/Web/Events/scroll) | NO/YES   | Document, Element | None     | document, div  |

NOTE：resize 为改变浏览器或iframe的窗体大小时会触发事件，scroll 则会在滑动内容时触发，作用于 Document 则不会冒泡，作用于内部元素则会冒泡。

### MouseEvent

#### 事件类型

|                                   事件类型                                   | 是否冒泡 |  元素   |          默认事件          | 元素例子 |
| ---------------------------------------------------------------------------- | -------- | ------- | -------------------------- | -------- |
| [click](https://developer.mozilla.org/zh-CN/docs/Web/Events/click)           | YES      | Element | focus/activation           | div      |
| [dbclick](https://developer.mozilla.org/zh-CN/docs/Web/Events/dblclick)      | YES      | Element | focus/activation/select    | div      |
| [mousedown](https://developer.mozilla.org/zh-CN/docs/Web/Events/mousedown)   | YES      | Element | drag/scroll/text selection | div      |
| [mouseup](https://developer.mozilla.org/zh-CN/docs/Web/Events/mouseup)       | YES      | Element | context menu               | div      |
| [mosuemove](https://developer.mozilla.org/zh-CN/docs/Web/Events/mousemove)   | YES      | Element | None                       | div      |
| [mouseover](https://developer.mozilla.org/zh-CN/docs/Web/Events/mouseover)   | YES      | Element | None                       | div      |
| [mouseout](https://developer.mozilla.org/zh-CN/docs/Web/Events/mouseout)     | YES      | Element | None                       | div      |
| [mouseenter](https://developer.mozilla.org/zh-CN/docs/Web/Events/mouseenter) | NO       | Element | None                       | div      |
| [mouseleave](https://developer.mozilla.org/zh-CN/docs/Web/Events/mouseleave) | NO       | Element | None                       | div      |


NOTE：`mouseenter` 与 `mouseover` 的区别为前者在鼠标在子元素直接移动不会触发事件，而后者会触发。 `mouseleave` 与 `mouseout` 同上相似。MouseEvent的属性在[这里](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent)。

#### MouseEvent的触发顺序


- 例：从元素 A 上方移动过

```
mousemove -> mouseover(A) -> mouseenter(A) -> [mousemove(A), ...] -> mouseout(A) -> mouseleave(A)
```

![MouseEvent的触发顺序](http://opd59bmxu.bkt.clouddn.com/2017121322936.png)


![触发顺序](http://opd59bmxu.bkt.clouddn.com/2017121322134.png)

- 例：点击元素

```
mousedown -> [mousemove, ...] -> mouseup -> click
```

![点击元素触发顺序](http://opd59bmxu.bkt.clouddn.com/20171213221428.png)

- 例：拖拽元素 [demo](https://github.com/hua03/blog/blob/master/demo/笔记/dom事件3-拖拽.html)


### 滚轮事件（Wheel）


|                              事件类型                              | 是否冒泡 |  元素   |        默认事件         | 元素例子 |
| ------------------------------------------------------------------ | -------- | ------- | ----------------------- | -------- |
| [wheel](https://developer.mozilla.org/zh-CN/docs/Web/Events/wheel) | YES      | Element | scroll or zoom document | div      |


### FocusEvent

其用于处理元素获得或失去焦点的事件。（例如输入框的可输入状态则为获得焦点，点击外部则失去焦点）


|                                 事件类型                                 | 是否冒泡 |      元素       | 默认事件 |   元素例子    |
| ------------------------------------------------------------------------ | -------- | --------------- | -------- | ------------- |
| [blur](https://developer.mozilla.org/zh-CN/docs/Web/Events/blur)         | NO       | Window, Element | None     | window, input |
| [focus](https://developer.mozilla.org/zh-CN/docs/Web/Events/focus)       | NO       | Window, Element | None     | window, input |
| [focusin](https://developer.mozilla.org/zh-CN/docs/Web/Events/focusin)   | NO       | window, Element | None     | window, input |
| [focusout](https://developer.mozilla.org/zh-CN/docs/Web/Events/focusout) | NO       | window, Element | None     | window, input |


NOTE：`blur` 失去焦点时，`focus` 获得焦点时，`focusin` 即将获得焦点，`focusout` 即将失去焦点。

### InputEvent

输入框输入内容则会触发输入事件。

|                                    事件类型                                    | 是否冒泡 |  元素   |      默认事件      | 元素例子 |
| ------------------------------------------------------------------------------ | -------- | ------- | ------------------ | -------- |
| [beforeInput](https://developer.mozilla.org/zh-CN/docs/Web/Events/beforeInput) | YES      | Element | update DOM Element | input    |
| [input](https://developer.mozilla.org/zh-CN/docs/Web/Events/input)             | YES      | Element | None               | input    |

**NOTE**：

- `beforeInput` 为在按键按下后即将将输入字符显示之前生成的事件。
- IE 并没有 `InputEven`t 则需使用 `onpropertychange(IE)` 来代替。

### KeyboardEvent

其用于处理键盘事件。

|                                事件类型                                | 是否冒泡 |  元素   |                默认事件                 |  元素例子  |
| ---------------------------------------------------------------------- | -------- | ------- | --------------------------------------- | ---------- |
| [keydown](https://developer.mozilla.org/zh-CN/docs/Web/Events/keydown) | YES      | Element | beforeInput/input/focus/blur/activation | div, input |
| [keyup](https://developer.mozilla.org/zh-CN/docs/Web/Events/keyup)     | YES      | Element | None                                    | div, input |


## 事件代理

事件代理是指在父节点上（可为元素最近的父节点也可为上层的其他节点）处理子元素上触发的事件，其原理是通过事件流机制而完成的。可以通过事件对象中获取到触发事件的对象（如下所示）。

```js
var elem = document.getElemenyById('id');
elem.addEventListener('click', function(event) {
  var e = event || window.event;
  var target = e.target || e.srcElement;
  // statements
});
```

**优点**

- 需要管理的事件处理函数更少
- 内存分配更少，更高效
- 增加与删除子节点可以不额外处理事件

**缺点**

- 事件管理的逻辑变的复杂（因为冒泡机制）