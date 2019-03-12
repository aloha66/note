## useState

```
//hook版
const [count, setCount] = useState(0);
```

- `const count` 等价于`this.state.count`
- `setCount` 等价于 `this.setState({ count: ... })` 更新状态
- `useState(0)`

1. 先初始化 count 的值
2. 下次渲染的时候给出当前状态
3. 每个 state 需要重新再定义一个`const [test, setTest] = useState(0);`

## useEffect

```
useEffect(() => {
    document.title = `You clicked ${count} times`;
  });
```

useEffect 相当于`componentDidMount, componentDidUpdate, componentWillUnmount`，每次渲染后执行，每次渲染都是一个新的 effect
