1. `outputDir: 'build',`生产环境构建文件的目录,默认是 `dist` 文件夹,构建时传入 `--no-clean`取消清除行为
2. 应用默认部署在一个域名的根路径上，`publicPath`指定子路径、相对路径

## env 环境变量和模式

新建文件

- `.env` 被所有的环境载入
- `.env.[mode] => .env.stage`新建 stage 环境

package.json 中的 serve 脚本的命令加入`--mode stage`，修改了 webpack 4 中的 mode 配置项为 stage，同时读取`.env.stage`文件的内容

权重：`.env.[mode].local > .env.[mode] > .env.local > .env`

只有以 `VUE_APP_` 开头的变量才能被 (Vue 客户端侧代码,e.g. src/main.js)访问到,`NODE_ENV` 和 `BASE_URL` 前端代码默认提供。

```
// vue src/main.js
console.log(process.env.VUE_APP_SECRET)
```

原因：

```
// webpack配置，cli自动处理

plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
    ],
```

## configureWebpack

- 提供一个对象,通过 `webpack-merge`,合并入最终的 webpack 配置。

```
configureWebpack : {}
```

- 直接修改配置,提供一个函数，在环境变量（`process.env.NODE_ENV`）设置后执行函数体

```
configureWebpack: config =>{
    // 使用 return 一个对象会通过 webpack-merge 进行合并,不会置空
}
```

## chainWebpack

Vue CLI 内部的 webpack 配置是通过 `webpack-chain` 维护的。

通过命令行`vue inspect`或者`vue ui`里面的任务`inspect`,可以知道当前 webpack 配置和对应各个`config.module.rule`的值。

```
chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
        .loader('vue-loader')
        .tap(options => {
          // 修改它的选项...
          return options
        })
  }
```
