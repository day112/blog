## 配置Host，加速Github访问

#### 查询以下几个域名的IP地址 

从 [ipaddress](https://www.ipaddress.com/) 查询域名对应的IP地址，将查询到的IP配置到Host文件中。

```
192.30.253.113   github.com
192.30.253.112   www.github.com
192.30.253.113   codeload.github.com
52.216.168.51    github-cloud.s3.amazonaws.com
199.232.5.194    github.global.ssl.fastly.net
199.232.28.133   githubusercontent.com
199.232.28.133   avatars0.githubusercontent.com
199.232.28.133   avatars1.githubusercontent.com
199.232.28.133   avatars2.githubusercontent.com
199.232.28.133   avatars3.githubusercontent.com
199.232.28.133   raw.githubusercontent.com
199.232.28.133   camo.githubusercontent.com
```



#### 刷新系统DNS缓存

```
ipconfig /flushdns
```






