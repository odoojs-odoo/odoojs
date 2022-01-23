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

## 学习交流

1. QQ 群 2684913

## odoojs 培训课程计划

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
