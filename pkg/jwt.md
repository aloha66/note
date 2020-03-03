## 概念

JWT 跨域认证解决方案


## 组成
由Header，Payload，Signature三部分组成。

### header默认值

```json
{
  "alg": "HS256", // 签名的算法
  "typ": "JWT" // 令牌类型
}
```

### Payload默认值

```
iss (issuer)：签发人
exp (expiration time)：过期时间
sub (subject)：主题
aud (audience)：受众
nbf (Not Before)：生效时间
iat (Issued At)：签发时间
jti (JWT ID)：编号
```
可额外添加自定义字段


### Signature

对前两部分的签名，防止数据篡改。


1. 服务器指定密钥secret
2. 使用header指定的签名算法（默认是 HMAC SHA256，简称hs256）
3. 按照公式生成签名 `const sign = HMACSHA256(base64.encode(header) + '.' + base64.encode(payload), secret)`

最后生成jwt的公式：`const jwt = base64.encode(header) + '.' + base64.encode(payload) + '.' + sign`



## JWT 与 Session

### 有无状态对比

- Session

    Session 是一种记录服务器和客户端会话状态的机制，需要在数据库或者 Redis 中保存用户信息和token信息，所以它是有状态的。

- JWT
    在后端并不需要存储数据，直接通过私有密钥验证就可以了。
    
当有这样的一个需求，一家公司下同时关联了多个业务，A业务网站，B业务网站，但是现在要求用户在A网站登陆过，再访问B网站的时候能够自动登陆，JWT 就可以很快的实现这个需求，把 JWT 直接存储在前端，后端只要校验 JWT 就可以了。

> 注:这个需求用 session 也是可以实现的，只是会存储状态，查询存储，没有 JWT 方便而已。

### 适用场景对比

#### 邮箱验证

很多网站在注册成功后添加了邮箱验证功能，功能实现：用户注册成功后，完善邮箱，服务端会给用户邮箱发一个链接，用户点开链接校验成功，这个功能使用 JWT 是个不错的选择。

```js
// 把邮箱以及用户id绑定在一起，设置生效时间
const code = jwt.sign({ email, userId }, secret, { expiresIn: 60 * 30 })

// 在此链接校验验证码
const link = `https://www.inode.club/code=${code}`
```

#### 做那些短期的验证需求(强烈推荐的场景)

比如在 BFF 层，用 JWT 去验证传递一些数据还是不错的选择，可以把有效时间设置的短一些，过期了就需要重新去请求;做一些一次性的安全认证

#### 跨域认证

#### 登陆验证

登陆验证:不需要控制登录设备数量以及注销登陆情况，无状态的 jwt 是一个不错的选择。

当需求中出现控制登陆设备数量，或者可以注销掉用户时，可以考虑使用原有的 session 模式，因为针对这种登陆需求，需要进行的状态存储对 jwt 添加额外的状态支持，增加了认证的复杂度，此时选用 session 是一个不错的选择。 针对上面的特殊需求，可能也有小伙伴仍喜欢使用 jwt ，补充一下特殊案例

#### 注销登陆

用户注销时候要考虑 token 的过期时间。

- session: 只需要把 user_id 对应的 token 清掉即可 ;
- jwt: 使用 redis，需要维护一张黑名单，用户注销时把该 token 加入黑名单，过期时间与 jwt 的过期时间保持一致。

#### 用户登陆设备控制

- session: 使用 sql 类数据库，维护一个用户验证token表，每次登陆重置表中 token 字段，每次请求需要权限接口时，根据 token 查找 user_id(也可以使用 redis 维护 token 数据的存储)
- jwt: jwt: 假使使用 sql 类数据库，维护一个用户验证token表，表中添加 token 字段，每次登陆重置 token 字段，每次请求需要权限接口时，根据 jwt 获取 user_id，根据 user_id 查用户表获取 token 判断 token 是否一致。(也可以使用 redis 维护 token 数据的存储)


## JWT 注意事项(缺点)

- 更多的空间占用。如果将原存在服务端session中的信息都放在JWT中保存,会造成JWT占用的空间变大，需要考虑客户端cookie的空间限制等因素，如果放在Local Storage，则可能会受到 XSS 攻击

- 无法作废已颁布的令牌。JWT 使用时由于服务器不需要存储 Session 状态，因此使用过程中无法废弃某个 Token 或者更改 Token 的权限。也就是说一旦 JWT 签发了，到期之前就会始终有效，除非服务器部署额外的逻辑

- 用户信息安全。通过J WT 的组成结构可以看出，Payload 存储的一些用户信息，它是通过Base64加密的，可以直接解密，不能将秘密数据写入 JWT，如果使用需要对 JWT 进行二次加密


> 参考文章：[辩证的眼光搞懂 JWT 这个知识点](https://mp.weixin.qq.com/s/QDTRkPmgScM9GZpwAW8VEQ)



