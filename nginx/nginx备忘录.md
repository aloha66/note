[正向代理和反向代理看这篇文章就够了](https://mp.weixin.qq.com/s?__biz=MjM5MzgyODQxMQ==&mid=2650366790&idx=1&sn=3b5d390d07445745e067334365873a18&chksm=be9cd81289eb510499dd029f91a302a2e08f0c4bbed13c7a47d33d2f1b6a91eebc6199b141b9&mpshare=1&scene=1&srcid=0228elQf1v2CVv1S7TeCJAig&pass_ticket=n8P0WpFA8SGAHl%2BJ7psownD3MkIBtjknnw%2FmEhuB1oMH4Ed7atLE7t%2BgyL%2B8od0k#rd)

## 安装、重载、关闭

在官网下载 window 版，双击启动了两个 nginx.exe 进程

- 每次更改完配置，执行`nginx -s reload`

- 关闭 nginx `nginx -s stop`

## nginx.conf 部分解读

```
#错误日志存放目录
#error_log  logs/error.log;

http {
    sendfile        on;   #开启高效传输模式
    #tcp_nopush     on;    #减少网络报文段的数量
    keepalive_timeout  65;  #保持连接的时间，也叫超时时间
    #gzip  on;  #开启gzip压缩
    include ./conf.d/*.conf; #导入conf.d文件夹内所有.conf
}
```

`/conf.d/`里面的`.conf`,我理解成一个个独立的分组模块，方便管理。

## server 配置

server 在 http 内

```
http{
    server{}
}
```

```
/conf.d/default.conf

server {
    listen       80;
    server_name  localhost;
    error_page 404  /404.html; #配置404页面，并重定向，默认路径是/nginx/html
    #error_page 404 http://www.baidu.com; 支持使用外部的资源
    error_page 500 502 503 504  /50x.html;
            location = /50x.html {
                root   html; #重新指定路径，这里默认指向/nginx/
            }
    #访问控制
    location / {
        deny   127.0.0.1; #禁止
        allow  localhost; #允许
    }
}

```

一个权限例子,匹配规则是，谁先设置，就听谁的，下面的结果是全都禁止了。

```
deny   all;
allow  127.0.0.1;
```

如果两行代码互换顺序，结果就是除了`127.0.0.1`其他地址都不能访问了。

### `location`支持精准匹配和正则匹配

- location /=private {...}
- location ~ \.php\$ {...}

## 反向代理(跨域)

```
server{
        listen 8080;
        server_name a.com;
        location / {
               proxy_pass http://b.com;
        }
}
```

## 负载均衡

```
upstream localhost {
    server localhost:8888 weight=1 # weight权重，数字越小，权重越大
    server localhost:9999 weight=3
}
server {
    listen 80;
    server_name: localhost;
    localhost / {
        proxy_pass http://localhost;
    }
}
```

## 适配 PC 与移动环境

在 nginx 根目录下新建 pc 和 mobile 两个文件夹，里面有 index.html

```
server {
...
location / {
    root pc;
    if (\$http_user_agent ~\* '(Android|webOS|iPhone|iPod|BlackBerry)') {
        root mobile;
    }
    index index.html;
    }
}
```
