# Momentjs常用API

[TOC]

## 1.解析日期

### 1.1 获取当前时间

```js
moment();
moment(undefined);
// 从v2.14开始也支持以下格式
moment([]);
moment({});		
```

### 1.2 字符串日期

> moment(String);

解析字符串形式的日期。创建日期，先检查字符串是否与已知的ISO 8601格式匹配，然后检查字符串是否与RFC 2822日期时间格式匹配，如果都未匹配，则把 **string** 放到 `new Date(string)` 中。

```js
moment("1995-12-25");

// 下面这些日期格式都支持
2013-02-08  
20130208   

2013W065    # 根据第几周，第几天
2013W06     # 根据第几周

2013-02-08T09            # 带有时，日期和时间用T分隔
2013-02-08 09            # 带有时，日期和时间用空格分隔
2013-02-08 09:30         # 带有 时 分
2013-02-08 09:30:26      # 带有时 分 秒
2013-02-08 09:30:26.123  # 带有时 分 秒 毫秒
2013-02-08 24:00:00.000  

//可以没有分隔符，但是日期和时间必须用T隔开
20130208T080910,123      # 带有时 分 秒 毫秒
20130208T080910.123      # 带有时 分 秒 毫秒
20130208T080910          # 带有时 分 秒 
20130208T0809            # 带有时 分 
20130208T08              # 带有时
```

### 1.3 字符串日期 + 日期解析格式

> moment(String, String);
> moment(String, String, String);
> moment(String, String, Boolean);
> moment(String, String, String, Boolean);

可以根据日期解析格式解析字符串日期。解析器将忽略非数字字符，因此以下都将返回相同的内容。

```js
moment("12-25-1995", "MM-DD-YYYY");
moment("12/25/1995", "MM-DD-YYYY");
moment("12.25.1995", "MM-DD-YYYY");
```

| Input      | Example          | Description                                       |
| :--------- | :--------------- | :------------------------------------------------ |
| `YYYY`     | `2014`           | 4或2位数的年份                                    |
| `YY`       | `14`             | 2位数的年份                                       |
| `Y`        | `-25`            | 有任意数字和符号的年份                            |
| `M MM`     | `1..12`          | 月份                                              |
| `MMM MMMM` | `Jan..December`  | 根据月份名称设置月份，例如May。 `moment.locale()` |
| `D DD`     | `1..31`          | 一个月中的某天                                    |
| `X`        | `1410715640.579` | Unix 秒级时间戳                                   |
| `x`        | `1410715640579`  | Unix 毫秒级时间戳                                 |
| `H HH`     | `0..23`  | 时 (24 小时)                                         |
| `h hh`     | `1..12`  | 时 (12小时)                     |
| `k kk`     | `1..24`  | 时 (24 小时)                            |
| `a A`      | `am pm`  | 上下午分隔，`a`或者`p`也可以 |
| `m mm`     | `0..59`  | 分                                                      |
| `s ss`     | `0..59`  | 秒                                                      |
| `S SS SSS` | `0..999` | 毫秒                                           |

### 1.4 字符串日期 + 多种日期解析格式

> moment(String, String[], String, Boolean);

解析时如果你不知道日期的具体格式，但你知道是几种格式之一的话，可以使用格式数组。**解析时会数组的顺序解析，如果找到匹配的格式，就会返回日期**。

```js
moment("12-25-1995", ["MM-DD-YYYY", "YYYY-MM-DD"]); // 使用第一种格式

moment("29-06-1995", ["MM-DD-YYYY", "DD-MM", "DD-MM-YYYY"]); // 使用最后一种格式
moment("05-06-1995", ["MM-DD-YYYY", "DD-MM-YYYY"]);          // 使用第一种格式。
moment("05-06-1995", ["DD-MM-YYYY", "MM-DD-YYYY"]);          // 使用第一种格式。
```

### 1.5 特殊格式

> moment(String, moment.CUSTOM_FORMAT, [String], [Boolean]);
> moment(String, moment.HTML_FMT.DATETIME_LOCAL, [String], [Boolean]); // from 2.20.0
> moment(String, [..., moment.ISO_8601, ...], [String], [Boolean]);

### 1.6 对象

> ​	moment({unit: value, ...});

```js
moment({ hour:15, minute:10 });
moment({ y    :2010, M     :3, d   :5, h    :15, m      :10, s      :3, ms          :123});
moment({ year :2010, month :3, day :5, hour :15, minute :10, second :3, millisecond :123});
moment({ years:2010, months:3, days:5, hours:15, minutes:10, seconds:3, milliseconds:123});
moment({ years:2010, months:3, date:5, hours:15, minutes:10, seconds:3, milliseconds:123});
moment({ years:'2010', months:'3', date:'5', hours:'15', minutes:'10', seconds:'3', milliseconds:'123'});  // from 2.11.0
```

### 1.7 时间戳

> moment(Number);  // 正常时间戳，到毫秒
>
> moment.unix(Number);   // Unix时间戳，到秒

```js
var day = moment(1318781876406);

//Unix时间戳，到秒
var day = moment.unix(1318781876);
```

### 1.8 JS原始日期格式

> moment(Date);

```js
var day = new Date(2011, 9, 16);
var dayWrapper = moment(day);
```

### 1.9 clone日期

> moment(Moment);

可以使用`moment`方法克隆或者调用`clone()`。

```js
var a = moment([2012]);
var b = moment(a);
a.year(2000);
b.year(); // 2012

// 和上面的效果一致
var a = moment([2012]);
var b = a.clone();
a.year(2000);
b.year(); // 2012
```

### 1.10 UTC时间

> moment.utc();
> moment.utc(Number);
> moment.utc(Number[]);
> moment.utc(String);
> moment.utc(String, String);
> moment.utc(String, String[]);
> moment.utc(String, String, String);
> moment.utc(String, String, Boolean);
> moment.utc(String, String, String, Boolean);
> moment.utc(Moment);
> moment.utc(Date);

默认情况下，**moment ** 解析并以本地时间显示。如果要解析或以UTC显示时刻，则可以使用`moment.utc()`而不是`moment()`。

```js
moment().format();     // 2013-02-04T10:35:24-08:00
moment.utc().format(); // 2013-02-04T18:35:24+00:00
```

### 1.11 解析时区

> moment.parseZone()
> moment.parseZone(String)
> moment.parseZone(String, String)
> moment.parseZone(String, [String])
> moment.parseZone(String, String, Boolean)
> moment.parseZone(String, String, String, Boolean)

```js
moment.parseZone("2013-01-01T00:00:00-13:00").utcOffset(); // -780 ("-13:00" in total minutes)
moment.parseZone('2013 01 01 05 -13:00', 'YYYY MM DD HH ZZ').utcOffset(); // -780  ("-13:00" in total minutes)
moment.parseZone('2013-01-01-13:00', ['DD MM YYYY ZZ', 'YYYY MM DD ZZ']).utcOffset(); // -780  ("-13:00" in total minutes);
```

### 1.12 验证日期是否合法

> moment().isValid();

```js
new Date(2013, 25, 14).toString(); // "Sat Feb 14 2015 00:00:00 GMT-0500 (EST)"
moment([2015, 25, 35]).format();   // 'Invalid date'
moment([2015, 25, 35]).isValid(); // false

// 找到是哪个点非法
var m = moment("2011-10-10T10:20:90");
m.invalidAt(); // 5 for seconds
```



## 2.获取或设置日期

调用方法时，如果不传参数是获取时间，传入参数是设置时间。

```js
// 毫秒
moment().millisecond(); // Number
moment().milliseconds(); // Number
moment().millisecond(Number);
moment().milliseconds(Number);


// 秒
moment().second(); // Number
moment().seconds(); // Number
moment().second(Number);
moment().seconds(Number);


// 小时
moment().hour(); // Number
moment().hours(); // Number
moment().hour(Number);
moment().hours(Number);


// 一月中的第几天
moment().date(); // Number
moment().dates(); // Number
moment().date(Number);
moment().dates(Number);


// 一周中的第几天
moment().day(); // Number
moment().days(); // Number
moment().day(Number|String);
moment().days(Number|String);


// 月
moment().month(); // Number
moment().months(); // Number
moment().month(Number|String);
moment().months(Number|String);

// 季度
moment().quarter(); // Number
moment().quarters(); // Number
moment().quarter(Number);
moment().quarters(Number);

// 年
moment().year(); // Number
moment().years(); // Number
moment().year(Number);
moment().years(Number);



// get方法获取日期
moment().get('year');
moment().get('month');  // 0 to 11
moment().get('date');
moment().get('hour');
moment().get('minute');
moment().get('second');
moment().get('millisecond');

// set方法设置日期
moment().set('year', 2013);
moment().set('month', 3);  // April
moment().set('date', 1);
moment().set('hour', 13);
moment().set('minute', 20);
moment().set('second', 30);
moment().set('millisecond', 123);
moment().set({'year': 2013, 'month': 3});
```

### 2.2 获取日期中的最大最小日期

> moment.max(Moment[,Moment...]);
> moment.max(Moment[]);
>
> moment.min(Moment[,Moment...]);
> moment.min(Moment[]);

```js
var a = moment('2020-01-02')
var b = moment('2020-01-01')
moment.max(a, b);  // a

var a = moment().subtract(1, 'day');
var b = moment().add(1, 'day');
moment.max(a, b);  // b

var a = moment().subtract(1, 'day');
var b = moment().add(1, 'day');
moment.min(a, b);  // a
moment.min([a, b]); // a
```

## 3.操作日期

### 3.1 增加日期 add（获取之后的日期）

> moment().add(Number, String);  // 第二个传日期的年/月/日或者它的缩写
> moment().add(Duration);
> moment().add(Object);

```js
moment().add(7, 'days'); // 得到7天之后的日期
moment().add(7, 'd');

moment().add(7, 'days').add(1, 'months'); // 链式调用
moment().add({days:7,months:1}); // 对象形式
```

| Key          | Shorthand |
| :----------- | :-------- |
| years        | y         |
| quarters     | Q         |
| months       | M         |
| weeks        | w         |
| days         | d         |
| hours        | h         |
| minutes      | m         |
| seconds      | s         |
| milliseconds | ms        |

### 3.2 减少日期 subtract（获取之前的日期）

> moment().subtract(Number, String);
> moment().subtract(Duration);
> moment().subtract(Object);

```js
moment().subtract(7, 'days'); // 获取7天前的日期

moment().subtract(1, 'seconds'); // 获取1秒前的时间
```

### 3.3 开始时间 [Start of Time](https://momentjs.com/docs/#/manipulating/start-of/) 

```js
moment().startOf('year');    // 设置为今年1月1日上午12:00
moment().startOf('month');   // 设置为本月1日的12:00
moment().startOf('quarter');  // 设置为当前季度的第一天12:00
moment().startOf('week');    // 设置为本周的第一天12:00
moment().startOf('isoWeek'); 
moment().startOf('day');     // 设置为今天上午12:00
moment().startOf('date');     // 设置为今天上午12:00
moment().startOf('hour');    // 当前小时，0分 0秒 0毫秒
moment().startOf('minute');  // 当前分，0秒 0毫秒
moment().startOf('second');  // 当前秒， 0毫秒

// 以下2种情况相等
moment().startOf('hour');
moment().minutes(0).seconds(0).milliseconds(0)
```

### 3.4 结束时间 [End of Time](https://momentjs.com/docs/#/manipulating/end-of/)

```
moment().endOf(String); // 获取1年、1月、1周、1天中的最后一个时间
```

### 3.5 [Local](https://momentjs.com/docs/#/manipulating/local/)

### 3.6 [UTC](https://momentjs.com/docs/#/manipulating/utc/)

### 3.7 [UTC offset](https://momentjs.com/docs/#/manipulating/utc-offset/)

## 4.显示

### 4.1 Format （根据指定格式输出）

> moment().format();
> moment().format(String);

```js
moment().format();    // "2014-09-08T08:02:17-05:00" (ISO 8601, no fractional seconds)
moment().format("dddd, MMMM Do YYYY, h:mm:ss a"); // "Sunday, February 14th 2010, 3:25:50 pm"
moment().format("YYYYMMDD");  // "20200101"
moment().format('YYYY MM DD');  // 2020 01 01
```

### 4.2 获取2个日期之间相隔的时间

#### 4.2.1 [Time from now](https://momentjs.com/docs/#/displaying/fromnow/)

#### 4.2.2 [Time from X](https://momentjs.com/docs/#/displaying/from/)

#### 4.2.3 [Time to now](https://momentjs.com/docs/#/displaying/tonow/) 

#### 4.2.4 [Time to X](https://momentjs.com/docs/#/displaying/to/) 

#### 4.2.5 获取相差的时间 [Difference](https://momentjs.com/docs/#/displaying/difference/) 

> moment().diff(Moment|String|Number|Date|Array);
> moment().diff(Moment|String|Number|Date|Array, String);
> moment().diff(Moment|String|Number|Date|Array, String, Boolean);

```js
var a = moment([2007, 0, 29]);
var b = moment([2007, 0, 28]);
a.diff(b) // 86400000

var a = moment([2007, 0, 29]);
var b = moment([2007, 0, 28]);
a.diff(b, 'days') // 1
```

### 4.3 获取时间戳

```js
// 毫秒
moment().valueOf();
+moment();

// 秒
moment().unix();
```

### 4.4 获取月份的最大天数

```js
moment("2012-02", "YYYY-MM").daysInMonth() // 29
moment("2011-02", "YYYY-MM").daysInMonth() // 28

moment("2012-01", "YYYY-MM").daysInMonth() // 31
```

### 4.5 转化成JS日期格式

```js
moment().toDate();
```

### 4.6 转成数组

```js
moment().toArray(); // [2013, 1, 4, 14, 40, 16, 154];
```

## 5.查询

### 5.1 是否为之前的日期 [Is Before](https://momentjs.com/docs/#/query/is-before/)

比较月份时会先比较年，比较天时同理。

```js
moment('2010-10-20').isBefore('2010-10-21'); // true

// 比较年
moment('2010-10-20').isBefore('2010-12-31', 'year'); // false
moment('2010-10-20').isBefore('2011-01-01', 'year'); // true

moment('2011-10-20').isBefore('2010-12-01', 'month'); // false
```

### 5.2 是否为同一天/月/年 [Is Same](https://momentjs.com/docs/#/query/is-same/)

比较同一月份时，会先比较年份，同理比较同一天时，会先比较年和月。

```js
moment('2010-10-20').isSame('2010-10-20'); // true

moment('2010-10-20').isSame('2009-12-31', 'year');  // false
moment('2010-10-20').isSame('2010-01-01', 'year');  // true
moment('2010-10-20').isSame('2010-12-31', 'year');  // true
moment('2010-10-20').isSame('2011-01-01', 'year');  // false

moment('2010-01-01').isSame('2011-01-01', 'month'); // false, different year
moment('2010-01-01').isSame('2010-02-01', 'day');   // false, different month
```

### 5.3 是否为之后的日期[Is After](https://momentjs.com/docs/#/query/is-after/) 

```js
moment('2010-10-20').isAfter('2010-10-19'); // true

moment('2010-10-20').isAfter('2010-01-01', 'year'); // false
moment('2010-10-20').isAfter('2009-12-31', 'year'); // true
```

### 5.4 [Is Same or Before](https://momentjs.com/docs/#/query/is-same-or-before/)

```js
moment('2010-10-20').isSameOrBefore('2010-10-21');  // true
moment('2010-10-20').isSameOrBefore('2010-10-20');  // true
moment('2010-10-20').isSameOrBefore('2010-10-19');  // false

moment('2010-10-20').isSameOrBefore('2009-12-31', 'year'); // false
moment('2010-10-20').isSameOrBefore('2010-12-31', 'year'); // true
moment('2010-10-20').isSameOrBefore('2011-01-01', 'year'); // true
```

### 5.5 [Is Same or After](https://momentjs.com/docs/#/query/is-same-or-after/) 

```js
moment('2010-10-20').isSameOrAfter('2010-10-19'); // true
moment('2010-10-20').isSameOrAfter('2010-10-20'); // true
moment('2010-10-20').isSameOrAfter('2010-10-21'); // false

moment('2010-10-20').isSameOrAfter('2011-12-31', 'year'); // false
moment('2010-10-20').isSameOrAfter('2010-01-01', 'year'); // true
moment('2010-10-20').isSameOrAfter('2009-12-31', 'year'); // true
```

### 5.6 在两个日期之间 [Is Between](https://momentjs.com/docs/#/query/is-between/) 

> //From 2.13.0 onward
> moment().isBetween(moment-like, moment-like);
> moment().isBetween(moment-like, moment-like, String);
> moment().isBetween(moment-like, moment-like, String, String);
> // where moment-like is Moment|String|Number|Date|Array
>
> //2.9.0 to 2.12.0
> moment().isBetween(moment-like, moment-like);
> moment().isBetween(moment-like, moment-like, String);
> // where moment-like is Moment|String|Number|Date|Array

```js
moment('2010-10-20').isBetween('2010-10-19', '2010-10-25'); // true
moment('2010-10-20').isBetween('2010-10-19', undefined); // true

// 按年比较
moment('2010-10-20').isBetween('2010-01-01', '2012-01-01', 'year'); // false
moment('2010-10-20').isBetween('2009-12-31', '2012-01-01', 'year'); // true
```

### 5.7 是否为闰年

```js
moment([2000]).isLeapYear() // true
moment([2001]).isLeapYear() // false
moment([2100]).isLeapYear() // false

moment('2020-01-01').isLeapYear() // true
```

### 5.8 是否为`moment`对象

```js
moment.isMoment() // false
moment.isMoment(new Date()) // false
moment.isMoment(moment()) // true
```

### 5.9 是否为JS Date格式对象

```js
moment.isDate(); // false
moment.isDate(new Date()); // true
moment.isDate(moment()); // false
```

## 6. [i18n](https://momentjs.com/docs/#/i18n/)

## 7. 自定义

## 8. 插件

