## 目录

<!-- TOC depthFrom:2 -->

- [目录](#目录)
  - [1. 获取不重复随机数组](#1-获取不重复随机数组)
  - [2. 将字符串url转化为url对象](#2-将字符串url转化为url对象)

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

### 2. 将字符串url转化为url对象

```javascript

/**
 * 将字符串url转化为url对象
 * 
 * @param {String} url  
 */
function parseURL(url) {
  var a = document.createElement('a');
  //创建一个链接
  a.href = url;
  return {
    source: url,
    protocol: a.protocol.replace(':', ''),
    host: a.hostname,
    port: a.port,
    query: a.search,
    params: (function () {
      var ret = {},
        seg = a.search.replace(/^\?/, '').split('&'),
        len = seg.length,
        i = 0,
        s;
      for (; i < len; i++) {
        if (!seg[i]) {
          continue;
        }
        s = seg[i].split('=');
        ret[s[0]] = s[1];
      }
      return ret;
    })(),
    file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
    hash: a.hash.replace('#', ''),
    path: a.pathname.replace(/^([^\/])/, '/$1'),
    relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
    segments: a.pathname.replace(/^\//, '').split('/')
  };
}
```