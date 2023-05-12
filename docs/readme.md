# todo

## user 语言切换

1.  语言切换后, write user

## o2m 删除后, save. 未更新 o2m 列表

## account payment button box

## sale order button box

## product template button box

## BI 工具

### 服务端结构

#### 报表

1. 报表名
2. char. SQL. 前端读取后, 返回 list. [{field: val}]
3. json. options. 用于控制 echart 渲染
4. 可用的过滤条件

#### 菜单

1. 存储菜单结构
2. 叶子节点为 报表名

### 前端结构

## 菜单

1. 读取服务端数据, 渲染菜单树
2. 点击叶子节点, 获得报表名.
3. 根据报表名, 访问服务器, 渲染 echart 图表

## echart

1. 参数 报表名
2. 参数 过滤条件
3. 访问服务端
4. 服务端 根据报表名 获取 sql + options
5. sql + 过滤条件 获取数据 data
6. 返回 data + options
7. 将 data 和 options 作为参数 给 echart
8. 渲染 echart
9. echart 图上 设置 控制板
10. 控制板 可修改过滤条件

## demo 发布方式

1. pc web
2. 微信小程序版本

## 商用版 模式

1. 我们部署 saas 平台
2. 用户注册为开发用户 生成 唯一的 code,
3. 开发用户 提供 自己服务器的 ip, db,
4. 在 saas 平台 备案
5. 开发用户在自己服务器上 部署服务端代码
6. 开发用户在自己的服务器上 创建 报表
7. 开发用户 将 saas 入口 发布给 他的 end user
8. end user 打开 saas
9. 登录 提供 code, user, psw
10. saas 根据 code 查询获得对应的
    开发用户的 ip, db
11. saas 平台记录使用日志
12. 前端访问 开发用户的 服务器, 验证 end user 身份
13. 参数为 ip, db, user, psw
14. 以后 end user 在前端直接访问 开发用户的服务器
15. 渲染 echart
