## CommonJS
- 同步导入，用于服务端

- 输出的是一个值的拷贝,除非写成一个函数，才能得到内部变动后的值

    ```
    module.exports = { a = 1}
    exports.a = 1
    
    // module 基本实现,module 是 Node 独有的一个变量
    var module = {
           id: 'xxxx',
           exports: {}
    }
    var exports = module.exports
    var load = function(module) {
            var a = 1
            module.exports = a
            return module.exports
    }
    ```
    

### require
`var module = require('./a.js')`包装了一层立即执行函数
```
// CommonJS模块
let { stat, exists, readFile } = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;

```
先整体加载fs模块，再从这个对象上面读取 3 个方法，因为只有运行时才能得到这个对象（俗称：运行时加载）


## ES6模块
- 输出的是值的引用

`import { stat, exists, readFile } from 'fs';` 实质是从fs模块加载 3 个方法，其他方法不加载。(俗称：编译时加载或者静态加载)

### import命令（ES Module）
- 具有提升效果，会提升到整个模块的头部，首先执行。
- 如果多次重复执行同一句import语句，那么只会执行一次，而不会执行多次。
- import语句是 Singleton 模式。
- ES Module 会编译成 `require/exports` 来执行的

### 模块的加载

分别导出两个函数

```
// circle.js

export function area(radius) {
  return Math.PI * radius * radius;
}

export function circumference(radius) {
  return 2 * Math.PI * radius;
}
```

导入函数方式：
1. `import { area, circumference } from './circle';` 逐一指定加载
2. `import * as circle from './circle';` 整体加载

### import()
- 动态加载,返回一个 Promise 对象
适用场合: 
1. 按需加载
2. 条件加载
3. 动态的模块路径 `import(f()).then(...);`


## AMD
- 用于浏览器

## 模块加载实现
- defer： 有序加载，渲染完再执行（DOM 结构完全生成和其他脚本执行完成后执行）
- async: 无序加载，下载完就执行

### 加载规则
```
<script type="module" src="./foo.js"></script>
<!-- 等同于 -->
<script type="module" src="./foo.js" defer></script>
```
`type="module"`声明了一个ES6 模块，类型是异步加载

## Node加载
- Node 要求 ES6 模块采用.mjs后缀文件名(import或者export命令)。
- require命令不能加载.mjs文件
- Node v8.5.0 或以上版本，要用`--experimental-modules`参数才能打开该功能。
