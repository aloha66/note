## 配置
- package.json加入babel的配置信息
```json
"babel": {
       "presets": ["@babel/preset-env"]
   }
```
- .babelrc
```json
{
    "presets": ["@babel/preset-env"]
}
```
- .babelrc.js，babel.config.js
```js
module.exports = {
    presets: ['@babel/preset-env']
};
```
后两个配置文件是针对文件夹的，即该配置文件所在的文件夹包括子文件夹都会应用此配置文件的设置，而且下层配置文件会覆盖上层配置文件，通过此种方式可以给不同的目录设置不同的规则

**注意：.babelrc文件放置在项目根目录和babel.config.js效果一致，如果两种类型的配置文件都存在，.babelrc会覆盖babel.config.js的配置。**

## preset-env

一个智能预设，根据你设置的目标浏览器，自动将代码中的新特性转换成目标浏览器支持的代码。
```js
module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    chrome: '58'
                }
            }
        ]
    ]
};

```

## plugin-transform-runtime

将工具函数转换成引入的形式。例子：多个文件中都用到了class，每一个文件编译后都生成一个工具函数，最后就会产生大量重复代码，平白增加文件体积。

同时工具函数是从`@babel/runtime`引入，所以需要安装`@babel/runtime`。
```
npm i @babel/plugin-transform-runtime -D
npm i @babel/runtime -S
```

**注意:babel/runtime并不是开发依赖，而是项目生产依赖。编译时使用了plugin-transform-runtime，你的项目就要依赖于babel/runtime，所以这两个东西是一起使用的。**

## babel-polyfill
为新api提供垫片。
```js
module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'usage', // usage-按需引入 entry-入口引入（整体引入） false-不引入polyfill
                corejs: 2  // 2-corejs@2  3-corejs@3
            }
        ]
    ]
};

```

[文章来源](https://juejin.im/post/5cf45f9f5188254032204df1)