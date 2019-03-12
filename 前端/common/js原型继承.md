## 原型
1. 对象都有 `__proto__` 属性,这个属性指向了原型,属性值是一个普通的对象,`Object`是所有对象的父类。
2. 原型的`constructor`属性指向构造函数，构造函数又通过 `prototype` 属性指回原型，`Function.prototype.bind()` 就没有这个属性。
3. 所有的函数，都有一个prototype属性，属性值也是一个普通的对象
4. 所有的引用类型（数组、对象、函数），`__proto__`属性值指向它的构造函数的`prototype`属性值

## 继承

1. 组合继承
    ```
    function Parent(value) {
        this.val = value
    }
    function Child(value) {
        Parent.call(this,value) // 继承父类的属性
    }
    Child.prototype = new Parent() // 改变子类的原型
    const child = new Child(1)
    child instanceof Parent // true
    ```
    
优点：
- 构造函数可以传参
- 不会与父类引用属性共享，可以复用父类的函数

缺点:
- 继承父类函数的时候调用了父类构造函数,导致子类的原型上多了不需要的父类属性
![图片](https://user-gold-cdn.xitu.io/2018/11/19/1672aeb24a2e2cae?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

2. 寄生组合继承
    ```
    function Parent(value) {
        this.val = value
    }
    function Child(value) {
      Parent.call(this,value) // 继承父类的属性
    }
    Child.prototype = Object.create(Parent.prototype,{
        // 将父类的原型赋值给了子类，并且将构造函数设置为子类
        constructor:{
          value:Child,
          enumerable: false,
          writable: true,
          configurable: true
        }
    })
    const child = new Child(1)
    
    
 3. Class 继承
    ```
    class Parent {
      constructor(value) {
      this.val = value
     }
    }
    class Child extends Parent {
      constructor(value) {
      super(value)  //可看成 Parent.call(this, value)
      this.val = value
      }
    }
    ```
