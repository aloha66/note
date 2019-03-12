## 全局概览

```
new Vue() => {
_init() {
  生命周期，各种事件;
  Object.defineProperty 设置 setter 与 getter 函数,实现响应式和依赖收集;
}

} $mount() => {
  挂载组件
}
if(hasTemplate) {
  complie() => {
  parse() => {
    正则等方式解析 template 模板中的指令、class、style等数据，形成AST
  };
  optimize() => {
    标记 static 静态节点
    diff 算法会直接跳过静态节点(优化)
  }
  generate() => {
    AST转化成 render function 字符串
  }
}
```

当 render function 被渲染的时候，因为会读取所需对象的值，所以会触发 getter 函数进行「依赖收集」，「依赖收集」的目的是将观察者 Watcher 对象存放到当前闭包中的订阅者 Dep 的 subs 中。

Virtual DOM 就是一棵以 JavaScript 对象（VNode 节点）作为基础的树,用对象属性来描述节点,实际上它只是一层对真实 DOM 的抽象。

修改一个对象值：`setter -> Watcher -> update`，通过使用`patch`，将新的 VNode 与旧的 VNode，经过 diff 算法得出它们的「差异」，对应的 dom 修改。

## 数据响应式

```
function defineReactive (obj, key, val) {
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter () {
            return val;
        },
        set: function reactiveSetter (newVal) {
            if (newVal === val) return;
            cb(newVal);
        }
    });
}

function observer (value) {
    if (!value || (typeof value !== 'object')) {
        return;
    }

    Object.keys(value).forEach((key) => {
        defineReactive(value, key, value[key]);
    });
}

class Vue {
    /* Vue构造类 */
    constructor(options) {
        this._data = options.data;
        observer(this._data);
    }
}
```

## mount 过程

```
if(!render) {
  const {compile,compileToFunctions} createCompiler()
// template会被编译成AST抽象语法树，AST会经过generate得到render函数
// compileToFunctions 带缓存的编译器,防止每次都重新编译
  const {render,staticRenderFns,AST} =  compile(template)

}

const VNode = render()

```

## render 模式下的双向绑定

```
data() {
  return {
    demo:''
  }
}
render:(h) {
  return h('input',{
    domProps:{
      value
    },
    on:{
      input:event => {
        this.demo = event.target.value
      }
    }
  })
}
```

## 递归组件

- 组件设置 name
- 要有一个明确的结束条件