## 流程

1. dispatch
2. action
3. reducer

## 操作

**payload 约等于 action**

1. `dispatch`派发一个`action`

```
dispatch(ActionName(payload))
```

2. `action`返回一个对象`return{type,payload}`给`reducer`,或者返回一个`action`的构造函数

```
const inc = payload => {type,payload}
const inc = payload => ({type,payload})
```

在执行`reducer`之前有个中间件环节，可以执行异步操作。发现`action`对象可以进行拦截，并把`dispatch`函数和`getState`函数作为参数传入

3. `reducer(state,action)`通过对象的`action.type`（payload）匹配,处理后返回一个新的 state

4. 在`componentDidMount`添加监听事件`store.subscribe(this.onChange)`,更改当前的 state
