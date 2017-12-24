// 事件监听
// 1.普通写法
/* function addListener (type, handler, options) {
  if (this && this.addEventListener) {
    this.addEventListener(type, handler, options)
  } else {
    this.attachEvent('on' + type, handler)
  }
} */

// 2.惰性函数
/* function addListener (_that, type, handler, options) {
  if (document.addEventListener) {
    console.trace()
    // 重新给函数赋值
    addListener = addEventListener(type, handler, options)
  } else {
    addListener = attachEvent('on' + type, handler)
  }
}

Element.prototype.addListener = addListener
const wrap = document.getElementById('wrap')
addListener(wrap, 'click', function () {
  console.log('点击！！！')
}) */

// 3.
const addListener = (function (type, handler, options) {
  if (document.addEventListener) {
    return function (_that, type, handler, options) {
      console.log('this:%o', this)
      console.trace()
      return _that.addEventListener(type, handler, options)
    }
  } else {
    return function (_that, type, handler) {

    }
  }
}())

const wrap = document.getElementById('wrap')
addListener(wrap, 'click', function () {
  console.log('点击2！！！')
})
