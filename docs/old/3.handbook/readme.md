### 概述

### 架构

| 模块    | 子模块   | 功能                       |
| ------- | -------- | -------------------------- |
|         |          |                            |
| odooweb | 各种组件 | 前端组件, 页面展示         |
|         |          |                            |
|         |          |                            |
| odooapi | Node     | View 中的某节点            |
|         | Views    | 获取 View 信息             |
|         | Action   | 获取 Action 信息           |
|         |          |                            |
| odoorpc | Model    | 调用各种模型方法           |
|         | JsonRPC  | 处理 JsonRPC 数据结构      |
|         | 请求     | 调用 axios, 网络请求及响应 |
|         |          |                            |

### odoorpc 的功能

1. 访问 odoo
2. 封装常用的 odoo jsonrpc 接口, 便于直接使用
3. 封装一个 Model Class, 可以调用各种 模型方法
4. odoorpc 使用示例:

```
// 导入odoorpc, 初始化
import api from '@/odoorpc'
const baseURL = 'http://your_odoo_server:8069'
const timeout = 50000
api.init({ baseURL, timeout })

// 登录
const test_login = async ()=>{
    const db = 'your_database_name'
    const login = 'your_user_name'
    const password = 'your_password'
    const session_info = await api.web.login({db, login,  password})
}

// 查询获取 partner 模型的数据
const test_search_read = ()=>{
    await test_login()
    const Partner = api.env.model('res.partner')
    const partners = await Partner.search_read({domain:[], fields:['name']})
}

```

### odooapi 的功能

1. 继承 odoorpc, 包含 odoorpc 的所有功能
2. 封装 Action, Views, Node
3. 通过 Action.load 和 Action.load_views 接口获取 Action 及 Views 信息
4. Action 对应 odoo 的 action
5. 基于 Action 及 Views 信息, 取得 页面结构
6. 基于 Action 及 Views 信息, 调接口获取数据
7. 渲染页面和数据
8. odooapi 使用示例:

```
// 导入 odooapi, 初始化
// 因为 odooapi 继承自 odoorpc. 初始化 odooapi, 等同于初始化 odoorpc
import api from '@/odooapi'
const baseURL = 'http://your_odoo_server:8069'
const timeout = 50000
api.init({ baseURL, timeout })

// 登录
const test_login = async ()=>{
    const db = 'your_database_name'
    const login = 'your_user_name'
    const password = 'your_password'
    const session_info = await api.login({db, login,  password})
}

// 获取 Action 及 View 信息
const test_action = async ()=>{
    await test_login()
    const context = api.session.context
    const action_xml_id = 'contacts.action_contacts'
    const action = await api.Action.load(action_xml_id)
    const views = await api.Action.load_views({action})
    return {context, action, views}
}

// 渲染 list view 页面
const test_list_view = async () {
    const { context, action, views } = await test_action()
    const info = { context, action, views }
    const node = api.Views.list.view_node(info)
    // node 中为页面中为页面结构信息

    // 默认搜索条件
    const search = await api.Views.search.default_value(info)

    // 返回的数据字段为 list view 中已定义的字段
    const {length, records} = await api.Views.list.web_search_read(info, { search })

    // 将 node 和 records, 送到页面, 渲染页面
}

// 查询 form view 数据
const test_form_view = async () {
    const { context, action, views } = await test_action()
    const info = { context, action, views }
    const node = api.Views.form.view_node(info)
    const res_id = 1 // 如 list view 点击行时, 获得该id
    const records2 = await api.Views.form.read(info, res_id)
    const record = records2[0]
    // 将 node 和 record, 送到页面, 渲染页面
}

```
