## development 构建加速

使用`DLLPlugin` 和 `DLLReferencePlugin`

```
//webpack.dll.conf.js

const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    // 依赖的库数组
    vendor: ["vue/dist/vue.common.js", "vue-router", "vuex"]
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    library: "[name]_[hash]"
  },
  plugins: [
    new webpack.DllPlugin({
      // DllPlugin的name属性需要和libary保持一致
      name: "[name]_[hash]",
      path: path.join(__dirname, "dist", "[name]-manifest.json"),
      // context需要和webpack.config.js保持一致
      context: __dirname
    })
  ]
};

```

```
plugins: [
        new webpack.DllReferencePlugin({
          context: __dirname,
          // manifest就是我们第一步中打包出来的json文件
          manifest: require("./dist/vendor-manifest.json")
        })
      ]
```

同时需要在 html 页面引用生成的`vendor.js`
