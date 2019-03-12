## 修改数据库字符集

查看字符集`show variables like “%char%”;`

### window

定位文件`C:\ProgramData\MySQL\MySQL Server 8.0`

```
[client]下添加

default_character_set = utf8mb4

[mysql]下添加

default_character_set = utf8mb4

[mysqld]下添加

character_set_server = utf8mb4
```

保存，重启服务。ps: `utf8mb4`和`utf8`完全兼容,前者可以显示 emoji 字符
