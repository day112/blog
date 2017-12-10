## 目录

<!-- TOC -->

- [目录](#目录)
  - [1. 获取不重复随机数组](#1-获取不重复随机数组)

<!-- /TOC -->


### 1. 获取不重复随机数组

[代码](https://github.com/hua03/blog/blob/master/demo/code-snippets/getRandomNums.js)

```javascript
/**
 * 获取不重复的随机数组
 * 
 * @param {Number} len 数组长度
 * @param {Number} maxLen 最大随机数
 * 
 * @returns {Array} 随机数组
 */
function getRandomNums(len, maxLen){
  var randomNums = [] 
  var random = 0
  for (var index = 0; index < maxLen; index++) {
    random = Math.floor(Math.random()*maxLen)+1
    if(randomNums.indexOf(random) === -1){
      randomNums.push(random)
    }
    if(randomNums.length === len){
      return randomNums
    }
  }
}
```
