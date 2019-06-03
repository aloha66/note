1. 6 种原始类型`boolean null undefined number string symbol`,是没有函数可以调用的
2. `typeof null // object` 实际上`null`并不是对象
3. `instanceof`通过原型链判断一个**对象**的正确类型
   ```
   const Person = function() {}
   const p1 = new Person()
   p1 instanceof Person // true
   ```
4. `[] == ![] //true` 个人理解：左边的是一个对象（地址），右边的是另一个对象（地址），所以两者不等。
5. `var` 声明的变量会发生提升，变量挂载到 `window` 上,函数也会被提升，优于变量提升。提升存在的根本原因就是为了解决函数间互相调用的情况。
   ```
   function test1() {
     test2()
   }
   function test2() {
     test1()
   }
   test1()
   ```
6. `let`和`const`存在暂时性死区，不能在声明前就使用变量。
7. 准确判断类型`Object.prototype.toString.call(obj) // [object Object]`
8. 对象拆箱转换顺序`valueOf`、`toString`，`String`类型转换顺序相反

## new

```
function Test(name) {
  this.name = name
}
```

- `new`通过构造函数创建出来的实例可以访问到构造函数中的属性

```
Test.prototype.sayName = function () {
    console.log(this.name)
}
```

- `new`通过构造函数创建出来的实例可以访问到构造函数原型链的属性，通过`new`，实例和构造函数通过原型链连接起来

```
function Test(name) {
  this.name = name
  return 1
}
const t = new Test('yck')
```

如果构造函数返回一个原始类型的值，这个返回值毫无意义。构造函数如果返回值为对象，那么这个返回值会被正常使用。

### 实现 new

new 作用：

- 返回一个对象
- 这个对象，也就是构造函数中的`this`,可以访问挂载在`this`的任何属性
- 这个对象可以访问沟站是原型上的属性，所以需要将对象与构造函数链接起来
- 返回原始值需要忽略，返回对象需要正常处理

```
function create(Con,...args) {
  // Con是构造函数，
  let obj = {}
  Object.setPrototypeOf(obj,Con.prototype) //obj访问构造函数原型链的属性 等价于 obj.__proto__ = Con.prototype
  let result = Con.apply(obj,args)  //将obj绑定到构造函数上，并传入剩余参数
  return result instanceof Object? result : obj  // 判断构造函数返回值是否为对象，忽略原始值
}
```

## 为什么 0.1 + 0.2 != 0.3

JS 采用 IEEE 754 双精度版本（64 位），并且只要采用 IEEE 754 的语言都有该问题。
解决方案`parseFloat((0.1+0.2).toFixed(10))`

## 数组

1. `map`返回一个新数组，原数组不会改变。
2. `forEach` 不会返回数据，改变原数组。
3. 'reduce' 接受两个参数（回调函数和初始值），回调函数接受四个参数（累计值、当前元素、当前索引、原数组）

## \*深浅拷贝

1. 浅拷贝

```
let a = {
age: 1
}
let b = Object.assign({}, a)
//或者使用展开运算符
let b = { ...a }
```

浅拷贝只解决了第一层的问题，如果拷贝的对象中还有对象要使用深拷贝。

2. 深拷贝
   最简单的实现 `JSON.parse(JSON.stringify(object))`
   局限性:忽略 `undefined`、`symbol`,不能序列化函数 , 不能解决循环引用的对象

## \*闭包

定义：函数`A`内部有一个函数`B`,函数 `B` 可以访问到函数 `A` 中的变量，那么函数 `B` 就是闭包。
意义: 让我们可以间接访问函数内部的变量。

    function A() {
      let a = 1
      window.B = function() {
        console.log(a)
      }
    }
    A()
    B() // 1

## this

    function foo() {
    console.log(this.a)
    }
    var a = 1
    foo() //1

    const obj = {
      a: 2,
      foo: foo
    }
    obj.foo() //2

    const c = new foo() //undefined

- 对于直接调用 `foo` 来说，不管 `foo` 函数被放在了什么地方，`this` 一定是 `window`
- 对于 `obj.foo()` 来说，我们只需要记住，谁调用了函数，谁就是 `this`，所以在这个场景下 `foo` 函数中的 `this` 就是 `obj` 对象
- 对于 `new` 的方式来说，`this` 被永远绑定在了 `c` 上面，不会被任何方式改变 `this`

        function a() {
          return () => {
            return () => {
              console.log(this)
            }
          }
        }
        console.log(a()()())

  首先箭头函数其实是没有 `this` 的，箭头函数中的 `this` 只取决包裹箭头函数的第一个普通函数的 `this`。在这个例子中，因为包裹箭头函数的第一个普通函数是 `a`，所以此时的 `this` 是 `window`。另外对箭头函数使用 `bind` 这类函数是无效的。

      let a = {}
      let fn = function () { console.log(this) }
      fn.bind().bind(a)() // => window
      //转换后
      // fn.bind().bind(a) 等于
      let fn2 = function fn1() {
       return function() {
        return fn.apply()
       }.apply(a)
      }
      fn2()

  **总结** `fn` 中的 `this` 永远由第一次 `bind` 决定
  首先，`new` 的方式优先级最高，接下来是 `bind` 这些函数，然后是 `obj.foo()` 这种调用方式，最后是 `foo` 这种调用方式，同时，箭头函数的 `this` 一旦被绑定，就不会再被任何方式所改变。
  ![图片](https://user-gold-cdn.xitu.io/2018/11/15/16717eaf3383aae8?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
