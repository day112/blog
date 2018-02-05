# 使用 PDO 操作数据库

## API

```php
$db = DB::getStringleton('localhost', 'test', 'root', '');

// 执行sql
$result = $db->queryString('select * from user where id=:id limit 0,3', array(':id'=>'123'));
printResult($result, '执行SQL');

// 查询表
$result = $db->select("user");
printResult($result, '查询表');

// 查询某个表，并增加where条件
$result = $db->where("where username=:username")->select("user", [":username"=>"wang"]);
printResult($result, '查询某个表，并增加where条件');

// 查询单条数据
$result = $db->where('where id=:id')->find('user', array(':id'=>"1"));
printResult($result, '查询单条数据');

// 插入数据
$data = array(':id'=>'123',':username'=>'zhang6',':password'=>md5(123456),':create_time'=>time());
$result = $db->insert('user', $data);
printResult($result, '插入数据');

// 更新数据
$data = array(':username'=>'lisi',':password'=>md5(456789));
$where = array(':id'=>1);
$result = $db->where('where id=:id')->update('user', $data, $where);
printResult($result, '更新数据');

// 删除数据
$result = $db->where('where id=:id')->delete('user', array(':id'=>3));
printResult($result, '删除数据');
```

## 相关

* [PDO 方式连接 MySQL 数据库 · 自己写个 php 的 mvc 框架 · 看云](https://www.kancloud.cn/threethousand/php_mvc/102340)

- [PHP 使用 PDO 封装一个简单易用的 DB 类 - Salamander - SegmentFault 思否](https://segmentfault.com/a/1190000010391179)
