
# odoojs 使用教程

* 导入 odoojs-core
* 已经打包为 npm 包可以直接使用
* 在前端环境里 安装好 npm 模块 odoojs-core
* 创建一个文件 比如 myodoo.js, 写入以下代码
* 在其他任何地方 import odoo form './myodoo'
* 然后就可以使用 odoo 了


``` 
import ODOO from 'odoojs-core';

const host = 'http://192.168.x.x:8069'
const db = 'my_database_name'
const { base } = Odoo.addons
const modules = { base }

const error = ({url, params, error})=>{
    console.log('rpc call url:', url);
    console.log('rpc call params:', params);
    console.log('rpc call error:',  Object.keys( error) );
    console.log('rpc call error:',  error);

    Object.keys(error).forEach(item=>{
        console.log( item, error[item] );
    })

}

const success = ({url, params, result})=>{
    console.log('rpc call url:', url);
    console.log('rpc call params:', params);
    if(Array.isArray(result) ){
      console.log('rpc call result is array, length=',result.length );
    }
    else{
      console.log('rpc call result:',  result);
    }
}

const odoo = new ODOO({ host, db, modules, success, error } );

export default odoo
 
```


## 登录

``` 
import odoo from './myodoo'
// 注意是 下面的方法是 异步的
const userinfo = await odoo.login({login: 'admin', password: '123' })

``` 
* 需要网络请求
* 参数:  { login, password }, 登录账号及密码
* 返回值: { username, name, uid, ... },  登录账号, 用户名称, 用户id


## 登出

```
import odoo from './myodoo'
const result = await odoo.logout()
```

## 获取 odoo 模型    

```
const PartnerModel = odoo.env('res.partner')
```
* 不需要网络请求
* 参数: 模型名
* 返回值, 模型对应的类

## 通用 api
* 使用 odoo 模型, 调用 odoo服务中的方法, 需要先登录
* 所有方法都为异步方法, 需要用 await
* 返回结果, 参看 odoo model
* 以 search_read 方法示例

```
import odoo from './myodoo'
const PartnerModel = odoo.env('res.partner')
const method = 'search_read'
const domain = [['is_company','=',true]]
const fields = ['name','email']
const args = [domain, fields]
const kwargs = {limit=100, offset=10, order='name'}
cosnt {code, result, error} = await PartnerModel._rpc_call(method, args, kwargs)
if (! code ){
  // code 为 0 , 表示网络请求成功
  console.log( result ); // result 为模型方法执行结果, 数据格式, 随方法不同而不同
}
else{
  // code 不为 0 , 表示请求不成功
  console.log( error ); // error 为错误消息
}


```

* 模型api,  _rpc_call, 是通用的api的调用接口
* 三个参数 method, args, kwargs 分别是 模型方法名, 方法的必传参数, 方法的可选参数
* 参数 method 为字符串, args 为数组, kwargs 为 对象
* 返回值 对象 {code, result, error }
* code 为 0 表示 请求成功, result 为模型方法执行结果, 数据格式, 随方法不同而不同
* code 为 0 表示 请求成功, result 为错误消息


## 条件查询, search 方法

```
import odoo from './myodoo'
const PartnerModel = odoo.env('res.partner')
const domain = [['is_company','=',false]]
const fields = {
    company_id : {}
    category_id : {}
}

const offset = 0,
const limit = 0,
const order = null, 
context = {}
cosnt {code, result, error} = await PartnerModel.search({domain, fields, offset, limit, order, context})

if (! code ){
  const partners = result._look2(fields)
  console.log( partners ); 
}

```
* search 方法, 为根据条件进行查询
* 参数 为 domain, fields, offset, limit, order, context
* domain 参数为 查询条件
* fields 参数, 指定嵌套查询的 多对一, 一对多, 多对多 字段
* 返回结果 result 为 模型实例 (含多条记录)
* _look2 将 result 转换为数组, 数组的元素是对象


## _view 方法, 以 id 为参数获取其中的一条记录, 不发送网络请求

```
import odoo from './myodoo'
const PartnerModel = odoo.env('res.partner')

const fields = {
    company_id : {}
    category_id : {}
}

const id = 99
const partner = PartnerModel._view(id)
const ptn = partner._look(fields)

const ids = [98,98]
const partners = PartnerModel._view(ids)
const ptns = partners._look2(fields)

```

*  _view 方法, 需要确保 id 对应的数据已经从服务端返回的前提下才可以使用
* 参数 id 可以是一个整型数, 也可以是 整型数组
* 返回值为 模型实例, 包含的记录数 与参数 id 对应


## browse 方法, 以 id或ids 为参数获取一条或多条记录, 需要发送网络请求
```
import odoo from './myodoo'
const PartnerModel = odoo.env('res.partner')

const fields = {
    company_id : {}
    category_id : {}
}

const id = 99
const {code, result, error} = await PartnerModel.browse(id, {fields})

if (! code ){
  const partners = result._look(fields)
}

```

* 模型方法 browse, 需要网络请求
* 返回 模型实例 (含一条或多条记录)
* id 参数 为整型或整型数组
* fields 参数, 指定嵌套查询的 多对一, 一对多, 多对多 字段


## 创建、编辑、删除 方法

```
import odoo from './myodoo'
const PartnerModel = odoo.env('res.partner')

const id = 99

const fields = {
    company_id : {}
    category_id : {}
}

const vals = {
    name:'value_name',
}

const {code, result, error} = await PartnerModel.create(vals, {fields} )
const {code, result, error} = await PartnerModel.write(id, vals, {fields})
const {code, result, error} = await PartnerModel.unlink(id)

```

* 创建方法 的参数 是 vals, 包括各个字段的值
* 修改方法 的参数 是 id 和 vals, id为整型
* 删除方法 的参数 是 id , 整型或整型数组
* 创建方法和修改方法的参数 fields, 同 search 和 browse方法中的 参数 fields
* 创建方法和修改方法的返回值 同 browse方法 的返回值
* 删除方法的返回值 为 布尔型.

## 参考文档

* [odoo api 接口文档](https://gitee.com/odoowww/odoo-patch/blob/master/addons/ow_json/README-api.md) 
* 在该接口文档中, 有关于 domain, fields, vals 等参数的详细说明
* odoojs 的 search 方法对应 odooapi 的 search_read2 方法
* odoojs 的 browse 方法对应 odooapi 的 read2 方法
* odoojs 的 create 方法对应 odooapi 的 create2 方法
* odoojs 的 write  方法对应 odooapi 的 write2 方法
* odoojs 的 unink  方法对应 odooapi 的 unink 方法



