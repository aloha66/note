## slot 传递数据方法

```html
<!-- 子组件 -->
<template>
  <div>
    <p v-for="i in arr" :key="i">
      <slot :num="i" :add="add">{{i}}</slot>
    </p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        arr: [1, 2, 3]
      };
    },
    methods: {
      add(val) {
        this.arr.push(val + 4);
      }
    }
  };
</script>
```

```html
<!-- 父组件 -->
<template v-slot="{num,add}"
  >当前值：{{num}}
  <button @click="add(num)">add</button>
</template>
```

## slot 绑定

```html
<!-- 子组件 -->
<p v-for="i in source" :key="i">
  <slot
    :num="i"
    :alertEvent="{click:() => handleAlert(i)}"
    :colorAttr="{style:[i%2==0?{color:'pink'}:{}]}"
    >{{i}}</slot
  >
</p>
<script>
  export default {
    props: ["source"],
    methods: {
      handleAlert(num) {
        alert(num);
      }
    }
  };
</script>
```

```html
<!-- 父组件 -->
<template v-slot="{num,colorAttr,alertEvent}">
  <div v-bind="colorAttr">当前值：{{num}}</div>
  <button v-on="alertEvent">show</button>
</template>
```




> https://juejin.im/post/5c2d7030f265da613a54236f