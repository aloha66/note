## 事件循环

### 每个 Tick 的过程，如何判断是否有事件需要处理，通过观察者模式。每个事件循环中有一个或多个观察者，向观察者询问是否有事件处理。事件循环典型的消费者/生产者模型。异步 I/O、网络请求是生产者。

Node 除了 JS 是单线程外，其他都是多线程的

1. setTimeout 和 setInterval

定时器需要动用红黑树，相对浪费性能,时间复杂度 O(lg(n))

2. process.nextTick

```
process.nextTick = function(callback) {
    if(process._exiting) return

    // 钩子深度大于process的最大钩子深度 抛出warn
    if(tickDepth >= process.maxTickDepth) maxTickWarn()

    var tock = {callback}
    if(process.domain) tock.domain = process.domain
    nextTickQueue.push(tock)
    if(nextTickQueue.length) {
        process._needTickCallback()
    }
}
```

每次执行 `process.nextTick` 只会把回调放进队列（数组）中，通过回调函数进行延迟执行，在下一轮 Tick 取出执行，时间复杂度为 O(1)。

3. setImmediate

`setImmediate` 的优先级比 `process.nextTick` `低，所以放在一起的时候，setImmediate` 后执行。

原因是事件循环对于观察者的检查是有先后顺序的，`setImmediate` 属于 check 观察者，`process.nextTick` 是 `idle` 观察者。每轮循环检查中，idle 观察者先于 I/O 观察者，I/O 观察者先于 check 观察者。

`setImmediate`把结果保存在链表中。`process.nextTick`把结果保存在数组中。在行为上，`process.nextTick`在每轮循环会把数组中所有回调函数都执行完，而`setImmediate`只会执行链表中的一个回调函数。
