# 变量类型判断

> [原文地址](https://github.com/hua03/blog/blob/master/blog/JavaScript/变量类型判断.md)

<!-- TOC depthFrom:2 -->

- [类型系统](#类型系统)
- [类型判断](#类型判断)

<!-- /TOC -->

## 类型系统

![类型系统](http://opd59bmxu.bkt.clouddn.com/20171214204330.png)


## 类型判断

| 方法                        | 基本类型 | 对象类型（内置对象）      | 自定义对象 |
| --------------------------- | -------- | --------------------  --- | ---------- |
| `typeof`                    | ✔️       |                           |            |
| `Object.prototype.toString` | ✔️       | ✔️                        |            |
| `constructor`               |          | ✔️                        | ✔️         |
| `instanceof`                |          | ✔️                        | ✔️         |