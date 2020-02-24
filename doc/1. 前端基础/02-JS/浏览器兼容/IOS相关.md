## 修复键盘导致IOS的Fixed布局失效

```js
$('input').on('blur', function() {
  document.body.scrollTop = document.body.scrollTop - 3;
  document.documentElement.scrollTop = document.documentElement.scrollTop - 3;
});
```
