```js
/**
 * @desc 获取url参数
 * @param {String} paramName  想要获取的参数名字
 * @param {String} url   访问地址，可以为空：为空时默认为当前url
 */
function getParameter(paramName, url) {
  var seachUrl = window.location.search.replace('?', '');
  if (url != null) {
    var index = url.indexOf('?');
    url = url.substr(index + 1);
    seachUrl = url;
  }
  var ss = seachUrl.split('&');
  var paramNameStr = '';
  var paramNameIndex = -1;
  for (var i = 0; i < ss.length; i++) {
    paramNameIndex = ss[i].indexOf('=');
    paramNameStr = ss[i].substring(0, paramNameIndex);
    if (paramNameStr == paramName) {
      var returnValue = ss[i].substring(paramNameIndex + 1, ss[i].length);
      if (typeof returnValue == 'undefined') {
        returnValue = '';
      }
      return returnValue;
    }
  }
  return '';
}
```
