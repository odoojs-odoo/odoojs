## 联系我们

1. QQ 群 2684913
2. odoojs@outlook.com
3. 北京斑马线科技有限公司负责维护 odoojs 的所有代码
4. 欢迎有志于 odoo 前后端分离项目的 个人/团队, 共同维护 odoojs

## odoojs 介绍

1. odoojs 是 odoo 前后端分离解决方案
2. odoojs 以 odoo 为服务端. 全新实现独立的前端
3. 依赖核心模块 odoojs-rpc,
4. odoojs-rpc 是一个 javascript 库, 是前端访问 odoo 的接口. npm 包名字为 odoojs.
5. 导入 odoo-rpc. "import rpc from 'odoojs'"
6. odoojs 通过 odoojs-rpc 从 odoo 服务端获取所有的数据.
7. odoojs 自定义 所有的 menu, action, view.
8. odoojs 基于 vue3 前端架构.
9. odoojs 选择 ant-design-vue v3 作为 ui 库.
10. odoojs 实现了 官方 odoo 前端的所有功能.
11. odoojs 自动识别 odoo 服务端已安装的模块.
12. odoojs 根据已经安装模块, 自行处理相应的 menu, action, view.
13. 非 odoo 官方的自定义模块. 需要在 odoo 服务端安装.
14. 同时 使用 odoojs 提供的 addons 扩展功能, 定义相应的 menu, action, view.
15. 因此 odoojs 适配 自定义模块的扩展.
16. odoojs 可以选择 ant-design-vue 之外的 ui 库.
17. 仅需替换 odoojs 中相应的 ui 组件即可.
18. odoojs 可以选择 vue3 之外的 其他前端架构.
19. 而保持 odoojs-rpc, menu, action, view 不变.
20. odoojs 支持多语言. 仅需 增加相应语言的 addons 补丁包.

## 规划

1. 建立 基于 odoojs 的中国本地化 ERP 产品
2. 建立 基于 odoojs 的开发模式. 服务于广大 odoo 实施团队
3. 建立 基于 odoojs 的服务模式. 为 ERP 使用方提供 自定义 ERP 系统的解决方案

## odoojs 技术原理

### 技术路线

1. odoo 官方源码做服务端
2. odoojs 实现前后端分离
3. odoojs 前端 暂时选择 vue 架构. 但不限. 可以选择 react
4. odoojs 前端 暂时选择 UI 库 antd-vue. 但不限. 可选择其他常用的 UI 库
5. odoojs 完全支持 移动 web 端. 只需选择适用的 UI 库即可
6. odoojs 完全支持 移动端 app. 只需直接使用 odoojs-rpc 做 服务端访问接口即可
7. odoojs 完全支持小程序等特定的客户端. 只需要使用 小程序专用的组件即可

### odoojs 流程

1. odoojs 前端程序, 启动后, 首先加载所有自定义的 menu, action, view.
2. 渲染 menu.
3. 在一个 menu 选中后, 获取到对应的 action.
4. 根据 action, 获取 相应的 tree view 或者 form view.
5. 根据 view, 获取对应的 model, fields. 以及 html 要素.
6. 根据 model, fields 从 odoo 服务端获取数据.
7. 获取到的数据, 在 view 中, 各 field 自行使用相应组件进行渲染显示.
8. view 中的 field, 支持 readonly, visible, required, domain 等属性.

### odoojs 编辑页面的流程

1. 需要编辑数据时, 将 view 设置为编辑状态.
2. 在编辑状态下, 创建一个 editmodel.
3. editmodel 由 odoojs-rpc 进行管理, 在前端页面中无需额外关心.
4. 该 editmodel 管理所有的编辑中的数据.
5. view 中某个字段 field 编辑后, 触发 onchange.
6. onchange 在 editmodel 中进行排队. 以确保 onchange 顺序依次触发.
7. onchange 访问 odoo 服务端, 获取数据. 更新到 editmodel. 并返回到 view.
8. view 渲染数据.
9. view 编辑完成, 触发 commit.
10. commit 与 onchang 一样 在 editmodel 中排队.
11. commit 访问 odoo 服务端, 发送 create or write 请求, 更新数据到服务端.
12. commit 之后, 销毁 editmodel, view 回到只读状态.
13. view 发送 read 请求, 重新获取数据, 并渲染到 view 中.

### odoojs one2many 字段的处理

1. main view 渲染显示数据.
2. main view 中, 各 field 由相应的 field 组件进行渲染.
3. one2many 字段的 sub tree view, sub form view 在 main view 中已定义
4. one2many 字段 已获得 main view 传递过来的数据 ids, fieldinfo, 及 sub fields.
5. one2many 字段根据 ids, feildinfo, sub fields 访问服务端 获取数据.
6. one2many 字段 sub tree view 渲染数据.
7. one2many 字段 sub form view 以弹窗方式 显示单条数据.

### odoojs one2many 字段的编辑处理

1. main view 进入编辑状态.
2. one2many 字段 sub tree view 为编辑状态, 显示 create 按钮.
3. pick one sub record or new sub record, 创建 sub form view.
4. sub form view 创建 sub editmodel.
5. sub form view 触发 onchange, 访问 odoo 服务端, 更新到 sub editmodel.
6. sub form view 触发 commit. 销毁 sub editmodel. 更新数据到 sub tree view.
7. sub tree view 触发 main view 的 onchage.
8. main view 的 commit 之前, 从 sub tree view 获取 one2many 字段的数据.
9. main view 触发 commit

## 分支管理

### master 分支

1. 基于 vue 3.2.x 和 antv 3.2.x

### odoojs-vue2 分支

1. 基于 vue2 和 antv1.7.8
2. 扬弃 odoo 官方的 menu、action、view,
3. 在 odoojs 前端全部重新定义 menu、action、view
4. odoorpc 代码更新, 优化 menu、action、view 的处理
5. 2023-3-6 创建该分支, 基于原 master 分支创建
6. 2023-3-6 之后, master 另做他用

### odoojs-classic 分支

1. 直接读取 odoo 服务端的 menu、action、view, 在 odoojs 前端呈现
2. 该分支保留了 odoo 官方原汁原味的前端功能
3. 2022-10-10 创建该分支, 基于原 master 分支创建
4. 2022-10-10 之后, master 另做他用

## 更新历史

#### 最新更新 2023-3-8

1. 创建 odoojs-vue2 分支
2. odoojs-vue2 分支. 基于 vue2 和 antv1.7.8
3. 更新 master 分支. 基于 vue 3.2.13 和 antv 3.2.15

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
