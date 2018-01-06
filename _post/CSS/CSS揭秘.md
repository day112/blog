

<!-- TOC depthFrom:2 -->

- [颜色继承](#颜色继承)
  - [currentColor](#currentcolor)
  - [inherit](#inherit)
- [响应式网页设计技巧](#响应式网页设计技巧)

<!-- /TOC -->

## 颜色继承

情景： 聊天泡泡，边框颜色和文字同色，分割线和

![20181415016](http://opd59bmxu.bkt.clouddn.com/20181415016.png)

方案： 
- `currentColor`
- `inherit`

```css
.child {
  width: 20px;
  height: 20px;
  color: blue;
  border: 5px solid currentColor;
  /* background: inherit; */
}
```
### currentColor

`currentColor`是一个变量，其原理相当于：
```css
currentColor = color
```

它会去获取本元素的`color`值，如果本元素没有设置`color`，会沿着dom树一级一级地去获取`color`，直到获取到`color`

### inherit

`inherit`也能用于颜色的继承，有些属性默认不继承的，有些默认继承（文字相关）。

- 只能继承祖先元素对应的属性。比如子元素的`border-color`只能继承祖先元素的`border-color`
- 如果想要使用继承的话，它的祖先元素必须设置该属性：

```css
body{
  /* background: aquamarine; */
}

.parent{
  width: 100px;
  height: 100px;
  border: 5px solid coral;
  color: aqua;
  /* background: none; */
}

.child{
  width: 20px;
  height: 20px;
  color: blue;
  border: 10px solid ;
  border-color: inherit;
  /* 祖先元素没有设置 background无法继承 */
  background: inherit;
}
```

![201814153713](http://opd59bmxu.bkt.clouddn.com/201814153713.png)

## 响应式网页设计技巧

