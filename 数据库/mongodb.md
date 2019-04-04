## 常用操作

- 查询数据库 `show dbs;`
- 切换数据库 `use 数据库名;`
- 查询集合 `show collections;`
- 查询数据
  - 查询一个集合所有数据`db.集合名.find();`
  - 分页（小型） `db.集合名.find().skip(数字，从第几条开始，逐条跳过，效率偏低).limit(数字，显示多少条数据)`
  - 分页（大型），通过条件语句分页
    `db.集合名.find({...查询条件}).limit(数字)`
  - 排序 `db.集合名.find().sort({key:正数是升序，反之})`
  - 模糊搜索
    `db.集合名.find({key:/正则/})`
- 添加数据

  - 插入或更新 `db.集合名.save({...})`,自动生成`_id`
  - 纯插入 `db.集合名.insert({...})`,当`_id`有冲突报错

  两者都支持批量插入，需用数组包裹

- 删除数据

  - 匹配条件`db.集合名.remove({...})`

- 更新数据

  - 正常更新 `db.集合名.update({...查询条件对象},{$set:{替换的对象}})`
  - 覆盖更新 `db.集合名.({...查询条件对象},{...{覆盖内容}})`，更改成功后就是覆盖内容

  1. `$unset` 删除某个 key `db.集合名.update({...查询条件对象},{$unset:{键名:""}})`
  2. `$inc` 修改数字**前面步骤省略** `,{$inc:{键名：数字}}`
  3. 两个选项————第三个参数
     `upsert`和`multi`，默认参数顺序。`upsert`为`true`时，查询结果没用就添加一条新纪录，反之；`multi`为`true`批量修改。

     例子：`db.集合名.update({...查询条件对象},{$set:{...替换的对象}，{upsert:true,multi:false}})`

## mongoose

- schema: 定义集合，实现和 MongoDB 的映射，不具备集合操作能力
- model: 操作一个集合
- entity: 由 model 创建的实体，跨域操作集合

```
//创建用户Schema
const userSchema = new Schema({
    UserId:Schema.Types.ObjectId,
    username:{unique:true,type:String},
    createAt:{type:Date,default:Date.now()},
})
//发布模型
mongoose.model('User',userSchema)

userSchema.pre('save',next => {
  // 实例调用钩子操作，this可以获取并改变当前触发钩子的数据，结束要调用next
  // 在钩子改变this某项的数据类型是不会再校验的，最终数据类型按照Schema所定义的类型
})
```

### mongoose 操作

```
const User = mongoose.model('User')
// 批量插入
User.insertMany(arr).then(...)
// 创建一个实例
const user1 = new User({username:'user1'})
//保存
user1.save().then(() => {...})
//查询,find()之类的命令返回mongoose的对象Query,exec()返回Promise
const users = await User.find().exec()

```
