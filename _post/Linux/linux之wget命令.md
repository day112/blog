# [wget 命令](http://man.linuxde.net/wget)


[wget 命令](http://man.linuxde.net/wget)用来从指定的 URL 下载文件。

<!-- TOC depthFrom:2 -->

- [语法](#语法)
- [选项](#选项)
- [参数](#参数)
- [实例](#实例)
  - [使用 wget 下载单个文件](#使用-wget-下载单个文件)
  - [下载并以不同的文件名保存](#下载并以不同的文件名保存)
  - [wget 限速下载](#wget-限速下载)
  - [使用 wget 断点续传](#使用-wget-断点续传)
  - [使用 wget 后台下载](#使用-wget-后台下载)
  - [下载多个文件](#下载多个文件)
  - [镜像网站](#镜像网站)
  - [过滤指定格式文件](#过滤指定格式文件)
  - [把下载信息存入日志文件](#把下载信息存入日志文件)
  - [FTP 下载](#ftp-下载)
    - [使用 wget 匿名 ftp 下载：](#使用-wget-匿名-ftp-下载)
    - [使用 wget 用户名和密码认证的 ftp 下载：](#使用-wget-用户名和密码认证的-ftp-下载)
  - [模拟 USER-AGENT](#模拟-user-agent)
  - [整站下载](#整站下载)

<!-- /TOC -->

## 语法

```
wget (选项) (参数)
```

## 选项

|     选项      |                            作用                             |
| ------------- | ----------------------------------------------------------- |
| -a<日志文件>  | 在指定的日志文件中记录资料的执行过程                        |
| -A<后缀名>    | 指定要下载文件的后缀名，多个后缀名之间使用逗号进行分隔      |
| -b            | 进行后台的方式运行 wget                                     |
| -B<连接地址>  | 设置参考的连接地址的基地地址                                |
| -c            | 继续执行上次终端的任务                                      |
| -C<标志>      | 设置服务器数据块功能标志 on 为激活，off 为关闭，默认值为 on |
| -d            | 调试模式运行指令                                            |
| -D<域名列表>  | 设置顺着的域名列表，域名之间用“，”分隔                      |
| -e<指令>      | 作为文件“.wgetrc”中的一部分执行指定的指令                   |
| -h            | 显示指令帮助信息                                            |
| -i<文件>      | 从指定文件获取要下载的 URL 地址                             |
| -l<目录列表>  | 设置顺着的目录列表，多个目录用“，”分隔                      |
| -L            | 仅顺着关联的连接                                            |
| -r            | 递归下载方式                                                |
| -nc           | 文件存在时，下载文件不覆盖原有文件                          |
| -nv           | 下载时只显示更新和出错信息，不显示指令的详细执行过程        |
| -q            | 不显示指令执行过程                                          |
| -nh           | 不查询主机名称                                              |
| -v            | 显示详细执行过程                                            |
| -V            | 显示版本信息                                                |
| --passive-ftp | 使用被动模式 PASV 连接 FTP 服务器                           |
| --follow-ftp  | 从 HTML 文件中下载 FTP 连接文件。                           |

## 参数

URL：下载指定的 URL 地址

## 实例

### 使用 wget 下载单个文件

```
wget http://www.linuxde.net/testfile.zip
```

### 下载并以不同的文件名保存

```
wget -O wordpress.html http://www.linuxde.net/category/integrated_information
```

wget 默认会以最后一个符合`/`的后面的字符来命名文件，下载的动态链接的文件名通常是错误的。

<span style="color:red">错误：</span> 下面的例子会下载一个文件并以名称`integrated_information`保存

```
wget http://www.linuxde.net/category/integrated_information
```

<span style="color:green">正确：</span> 使用`-O`命令可以保存为特定的文件名

```
wget -O wordpress.html http://www.linuxde.net/category/integrated_information
```

### wget 限速下载

```
wget --limit-rate=300k http://www.linuxde.net/testfile.zip
```

当你执行 wget 的时候，它默认会占用全部可能的宽带下载；而且占用的带宽过大可能会被网站屏蔽。

### 使用 wget 断点续传

```
wget -c http://www.linuxde.net/testfile.zip
```

### 使用 wget 后台下载

```
wget -b http://www.linuxde.net/testfile.zip
```

### 下载多个文件

根据文件列表下载文件，每个 url 占一行

```
wget -i filelist.txt
```

### 镜像网站

```
wget --mirror -p --convert-links -P ./LOCAL URL
```

下载整个网站到本地。

* `--miror`开户镜像下载。
* `-p`下载所有为了 html 页面显示正常的文件。
* `--convert-links`下载后，转换成本地的链接。
* `-P ./LOCAL`保存所有文件和目录到本地指定目录。

### 过滤指定格式文件

```
wget --reject=gif url
```

下载一个网站，但你不希望下载图片，可以使用这条命令。

### 把下载信息存入日志文件

```
wget -o download.log URL
```

不希望下载信息直接显示在终端而是在一个日志文件，可以使用。

### FTP 下载

```
wget ftp-url wget --ftp-user=USERNAME --ftp-password=PASSWORD url
```

可以使用 wget 来完成 ftp 链接的下载。

#### 使用 wget 匿名 ftp 下载：

```
wget ftp-url
```

#### 使用 wget 用户名和密码认证的 ftp 下载：

```
wget --ftp-user=USERNAME --ftp-password=PASSWORD url
```

### 模拟 USER-AGENT

```
wget --user-agent="Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.3) Gecko/2008092416 Firefox/3.0.3" http://www.baidu.com
```

### 整站下载

```shell
wget --user-agent="Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.3) Gecko/2008092416 Firefox/3.0.3" --limit-rate=300k --random-wait -r -p -np -k -e robots=off http://www.baidu.com
```

* `-r` 递归下载
* `-p` 下载页面必需元素（css，js，img）
* `-np` 不追溯至父级
* `-k` 将下载的 HTML 页面中的链接转换为相对链接即本地链接
* `--random-wait` 每个资源随机等待0.5-1.5s
* `--limit-rate` 限速
