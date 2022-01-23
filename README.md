## odoojs 介绍

1. odoojs 是一个 javascript 类库, 是前端访问 odoo 的接口.
2. 同时 odoojs 提供基于 antd-vue 的 odooweb 组件.
3. odoojs 的接口部分 包括 odoorpc / odooapi
4. odoorpc 是基础的 访问接口.
5. odoorpc 包括 session/dataset/model
6. odooapi 依赖 odoorpc.
7. odooapi 包括 action/view/qweb/
8. odoojs 的组件部分 odooweb. 包括 forview/listview
9. odooweb 也包括 kanban/pivot/treeedit 等复杂组件

#### 最新更新 2022-1-23

###### odoorpc/odooapi 完善.

1. session info store in request class
2. ir.filters 功能
3. o2m tree view. line edit
4. kanban view. button click event
5. file import api

###### UI 组件完善

1. pivot view / graph view / calendar view
2. 收藏按钮
3. o2m tree view. line edit
4. kanban view. dropdown menu

## odoojs 培训课程计划

### 学习交流群

1. QQ 群 2684913

### 计划

#### 网络课程规划

1. 分为: web 开发基础 / antd-vue/ odoorpc / odooapi / odooweb 五部分内容
2. 满 5 人开一次班
3. 课程形式 腾讯会议
4. 每课时, 时长 50 分钟. 每天 2-3 课时
5. xxx 元 每人每课时
6. 准备好电脑. 安装腾讯会议.

#### 线下课程规划

1. 地点/会议室, 由培训需求单位, 自行安排
2. 培训讲师, 城市间交通费用, 目的地住宿费用. 由培训需求单位实报实销
3. 每次培训时长. 3-10 天. 每天 8 课时. 每课时, 时长 50 分钟.
4. xxxx 元 每课时. 不限人数
5. 准备好电脑. 安装配置好开发环境.

#### 电脑开发环境准备

1. 准备好开发环境 git/node/vue/vscode.
2. 自行安装 虚拟机, 配置 odoo14. 或使用其他 odoo 服务器
3. 提供 odoojs-demo 供测试使用
4. 下载 odoojs-demo, 配置服务器接口.
5. 测试运行 odoojs-demo 项目 ok. 确认开发环境 ok

### 课程内容

#### 开发环境测试

1. node version
2. vue version
3. 运行脚本 确认 odoo 服务连接 ok
4. 方法 1. python 脚本
5. 方法 2. vue 项目中安装配置 @vue/cli-plugin-unit-mocha. 运行测试脚本
6. 方法 3. 运行 odoojs-demo 项目的 test page.
7. 其中 方法 3 必须测试通过.

#### web 开发基础课程规划

1. github/gitee 的使用
2. vue 项目的创建和维护
3. vue 组件开发基础
4. vue router 路由
5. test 测试用例的创建是运行
6. 服务端接口 demo

#### antd-vue 课程规划

##### 页面整体显示

1. Layout
2. PageHeader
3. Tabs
4. Modal

##### 导航.

1. Menu
2. Dropdown

##### 交互组件

1. button
2. icon
3. a

##### 展示组件

1. Table
2. pagination
3. Tag
4. Rate
5. Checkbox
6. Switch
7. img

##### 编辑页面组件

1. FormModel
2. Input
3. Checkbox
4. Datepicker
5. Select
6. Radio
7. Rate
8. Switch
9. Upload

#### odoorpc 课程规划

##### odoorpc 初级课程

1. odoo 对外 jsonrpc 接口基本原理
2. axios 访问 odoo. 第一个接口调用 '/web/webclient/version_info'
3. request 的作用与意义. js 组件构建.
4. controler 的定义与作用, js 组件构建
5. odoorpc 对外接口的定义. RPC 组件构建
6. login 接口
7. dateset 接口
8. context 的使用
9. Model 和 env 的定义. 作用与意义

##### odoorpc 高级课程

1. database . 数据库管理. 创建/复制/备份/删除/修改密码
2. session_info 的内容
3. cookie 控制
4. 多公司控制
5. 文件上传下载接口

#### odooapi 课程规划

##### odooapi 初级课程

1. action load
2. action load_views
3. odooapi 如何继承 odoorpc, 以及 odooapi 的对外接口
4. listview 展示数据
5. formview 展示数据
6. formview m2o 字段的数据展示
7. formview selection 字段的数据展示
8. formview 编辑数据
9. 新增和删除记录
10. listview 分页展示

##### odooapi 中级课程

1. 菜单读取
2. context / domain 以及 py_utils
3. search view 的作用和使用
4. listview 的 过滤
5. listview 的分组
6. formview onchange 的使用
7. formview m2o 字段的编辑
8. formview selection 字段的编辑

##### odooapi 高级课程

1. kanban view 及 qweb
2. calendar view
3. pivot view
4. graph view
5. formview o2m 字段的处理
6. 附件上传 下载
7. xlsx 导出下载
8. 打印功能
9. 复杂 kanban

## 更新历史

##### 2022-1-23

###### odoorpc/odooapi 完善.

1. session info store in request class
2. ir.filters 功能
3. o2m tree view. line edit
4. kanban view. button click event
5. file import api

###### UI 组件完善

1. pivot view / graph view / calendar view
2. 收藏按钮
3. o2m tree view. line edit
4. kanban view. dropdown menu

##### 历史

2022-1-12  
odoorpc/odooapi 代码更新. 纯函数方式
UI 组件完善

2021-12-3  
选择 ant-design-vue 做 UI  
odoorpc/odoojs 代码优化

2021-7-26  
odoojs 重大改进  
访问 odoo 的方式更简洁

2020-8-30  
之前使用 react 实现的 odoojs  
之后 使用 vue
