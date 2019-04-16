```
class Point {
  constructor(){
    // ...
  }
}

Point.prototype.constructor === Point // true
```

类的内部所有定义的方法，都是不可枚举的（non-enumerable）。

```
Object.keys(Point.prototype) // []

Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"]
```

类的所有实例共享一个原型对象。

```
p1.__proto__ === p2.__proto__
```

`Object.getPrototypeOf`获取实例对象的原型,然后再来为原型添加方法/属性。

## extends

先将父类实例对象的属性和方法，加到 this 上面(必须先调用 super 方法),然后再用子类的构造函数修改 this。
