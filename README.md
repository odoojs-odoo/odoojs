## odoojs 介绍

1. odoojs 是一个 javascript 类库, 是前端访问 odoo 的接口.
2. 同时 odoojs 提供基于 antd-vue 的 odoo web 组件.
3. odoojs 的接口部分 包括 odoorpc / odooui
4. odoorpc 包括基础的访问接口.包括 session/dataset/model
5. odoorpc 包括 action/view/view 的逻辑处理
6. odooui 是 odoojs 前端组件的核心代码.
7. 基于 antd-vue 的 odoo web 组件. 实现 odoojs 的前端功能

## 学习交流

1. QQ 群 2684913
2. 北京斑马线科技有限公司负责维护 odoojs 的所有代码
3. 欢迎有志于 odoo 前后端分离项目的 个人/团队, 共同维护 odoojs

## 技术路线

1. odoo 官方源码做服务端
2. odoojs 实现前后端分离
3. odoojs 前端 暂时选择 vue 架构. 但不限. 可以选择 react
4. odoojs 前端 暂时选择 UI 库 antd-vue. 但不限. 可选择其他常用的 UI 库
5. odoojs 完全支持 移动 web 端. 只需选择适用的 UI 库即可
6. odoojs 完全支持 移动端 app. 只需直接使用 odoorpc 做 服务端访问接口即可
7. odoojs 完全支持小程序等特定的客户端. 只需要使用 小程序专用的组件即可

## 短期规划

1. 完善 odoojs 前端架构.
2. 在 odoojs 前端中, 实现 odoo 官方已有模块的功能

## 中长期规划

1. 建立 基于 odoojs 的中国本地化 ERP 产品
2. 建立 基于 odoojs 的开发模式. 服务于广大 odoo 实施团队
3. 建立 基于 odoojs 的服务模式. 为 ERP 使用方提供 自定义 ERP 系统的解决方案

## 分支管理

### master 分支

1. 基于 vue3 和 antv 3.2.14

### odoojs-vue2 分支

1. 基于 vue2 和 antv1.7.8
2. 扬弃 odoo 官方的 menu、action、view,
3. 在 odoojs 前端全部重新定义 menu、action、view
4. odoorpc 代码更新, 优化 menu、action、view 的处理

### odoojs-classic 分支

1. 直接读取 odoo 服务端的 menu、action、view, 在 odoojs 前端呈现
2. 该分支保留了 odoo 官方原汁原味的前端功能
3. 2022-10-10 创建该分支, 基于原 master 分支创建
4. 2022-10-10 之后, master 另做他用

## 更新历史

#### 最新更新 2023-3-6

1. 基于原有 master 分支, 创建 odoojs-vue2 分支
2. odoojs-vue2 分支. 基于 vue2 和 antv1.7.8
3. odoojs-vue2 分支. 扬弃 odoo 官方的 menu、action、view,
4. 在 odoojs 前端全部重新定义 menu、action、view

#### 最新更新 2022-10-10

1. 基于原有 master 分支, 创建 odoojs-classic 分支
2. odoojs-classic 分支, 直接读取 odoo 服务端的 menu、action、view, 在 odoojs 前端呈现
3. odoojs-classic 分支,保留了 odoo 官方原汁原味的前端功能
4. master 分支, 继续维护最新的代码
5. master 分支, 扬弃 odoo 官方的 menu、action、view, 在 odoojs 前端全部重新定义
6. master 分支的 odoorpc 代码更新, 优化 menu、action、view 的处理

#### 2022-2-13

1. odoorpc 优化
2. odooapi 优化
3. 调整 api.my.home 接口. 从 odoorpc 移动到 odooapi

#### 2022-2-7

1. portal 页面. /my/home
2. 自定义菜单.
3. 自定义 xml

#### 2022-1-25

1. 使用 this.\$route.meta.routes 存路由历史
2. 使用 localStorage 存 routes. 页面手动刷新时, 保留路由历史
3. 页头 title. 数据取自 routes. 显示层级结构
4. action.load 时,仅 load action。 不再直接 load_views, 而在需要时 由页面 load views
5. 附件上传与下载

#### 2022-1-23

odoorpc/odooapi 完善.

1. session info store in request class
2. ir.filters 功能
3. o2m tree view. line edit
4. kanban view. button click event
5. file import api

UI 组件完善

1. pivot view / graph view / calendar view
2. 收藏按钮
3. o2m tree view. line edit
4. kanban view. dropdown menu

#### 2022-1-12

odoorpc/odooapi 代码更新. 纯函数方式  
UI 组件完善

#### 2021-12-3

选择 ant-design-vue 做 UI  
odoorpc/odoojs 代码优化

#### 2021-7-26

odoojs 重大改进  
访问 odoo 的方式更简洁

#### 2020-8-30

之前使用 react 实现的 odoojs  
之后 使用 vue
