Micro-Task(微任务）:process.nextTick、Promise、MutationObserver。
Macro-Task（宏任务）：setTimeout、setInterval、 setImmediate、script（整体代码）、 I/O 操作、UI 渲染等。

- 先执行宏任务再执行微任务。
- 遇到`await`的时候会就让出线程开始执行 async1 外的代码,看成是让出线程的标志。

![图片](https://camo.githubusercontent.com/47479c8773d91e8eef4a359eca57bb1361183b9e/68747470733a2f2f692e6c6f6c692e6e65742f323031392f30322f30382f356335643661353238626461662e6a7067)

```
console.log('script start')

async function async1() {
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2 end')
}
async1()

setTimeout(function() {
  console.log('setTimeout')
}, 0)

new Promise(resolve => {
  console.log('Promise')
  resolve()
})
  .then(function() {
    console.log('promise1')
  })
  .then(function() {
    console.log('promise2')
  })

console.log('script end')
// script start => async2 end => Promise => script end => promise1 => promise2 => async1 end => setTimeout
```

`await`的代码拆解

```
new Promise((resolve, reject) => {
  console.log('async2 end')
  // Promise.resolve() 将代码插入微任务队列尾部
  // resolve 再次插入微任务队列尾部
  resolve(Promise.resolve())
}).then(() => {
  console.log('async1 end')
})
```

**注意：**浏览器和 node11 的事件循环的执行顺序相同，**顺序执行宏任务和微任务**，但在 node11 以下版本执行顺序是**先执行所有的宏任务，再执行微任务**

```
function test () {
   console.log('start')
    setTimeout(() => {
        console.log('children2')
        Promise.resolve().then(() => {console.log('children2-1')})
    }, 0)
    setTimeout(() => {
        console.log('children3')
        Promise.resolve().then(() => {console.log('children3-1')})
    }, 0)
    Promise.resolve().then(() => {console.log('children1')})
    console.log('end')
}

test()

// 以上代码在node11以下版本的执行结果(先执行所有的宏任务，再执行微任务)
// start
// end
// children1
// children2
// children3
// children2-1
// children3-1

// 以上代码在node11及浏览器的执行结果(顺序执行宏任务和微任务)
// start
// end
// children1
// children2
// children2-1
// children3
// children3-1
```
