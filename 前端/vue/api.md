## 事件修饰符

### .passive 提升移动端的性能

`<div v-on:scroll.passive="onScroll">...</div>`
[详细解释](https://segmentfault.com/a/1190000007913386?_ea=1507605)

简单解释：
浏览器只有在你执行函数的时候才知道你到底有没有调用`preventDefault`（耗时）,`.passive`主动告诉浏览器不需要调用`preventDefault`，能提升性能，有点像 css 里面的`will-change`

**注意** `passive` 和 `.prevent`不共用

## key

1. 管理可复用的元素

表示两个元素完全独立，不复用情况

```
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username-input">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email-input">
</template>
```

每次切换重新渲染

2. v-for 的 key

“就地复用”策略，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 key 属性。

## v-model

语法糖

```
<input v-model="test">
```

等价于

```
<template>
<input :value="test" @input="test = $event.target.value">
</template>
```

- 将其 `value` 特性绑定到一个名叫 `value` 的 prop 上
- 在其 `input` 事件被触发时，将新的值通过自定义的 `input` 事件抛出

封装成组件

```
<template>
  <div>
    <input :value="value" @input="$emit('input',$event.target.value)">
  </div>
</template>

<script>
props: ["value"],
</script>
```

改变默认名为 `value` 的 `prop`和`input` 的事件

```
model: {
    prop: 'checked',
    event: 'change'
  },
```

## 动态组件

同一个挂载点，通过改变`is`的值来切换组件。

```
<component :is="currentTabComponent"></component>
```

## prop

```
const obj = {id:1,txt:"text"}

<div v-bind="obj"></div>
`
```

等价于

```
<div :id="obj.id" :txt="obj.txt"></div>
```
