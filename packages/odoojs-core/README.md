# 文档结构说明

* test文件夹是测试脚本
* odoojs文件夹是 odoojs的源码


# odoojs

odoojs是一个前端的js库, 封装了odoo api.  
使用odoojs, 可以视作odoojs是一个服务.  
换言之, page页面, 直接调用 odoojs, 获取数据. 

odoo api 是 odoo 对外的接口规范. 参看文档:  
https://github.com/odooht/odoo-docs/tree/master/api

因为odoojs 已经封装 odoo api, 所以在使用odoojs的情况下, 掌握odoo api, 重点是:  
1 odoo定义的数据类型
2 search/search_read方法的参数 domain 的格式  
3 create / write 方法的参数 vals 的格式  
 

odoo model 参考文档  
https://github.com/odooht/odoo-docs/tree/master/model  


# odoojs 使用教程

* 导入 odoojs
* 已经打包为 npm 包可以直接使用
* 在前端环境里 安装好 npm 模块 odoojs-core
* 创建一个文件 比如 myodoo.js, 写入以下代码
* 在其他任何地方 import odoo form './myodoo'
* 然后就可以使用 odoo 了


``` 
import ODOO from 'odoojs-core';

const host = 'http://192.168.x.x:8069'
const db = 'my_database_name'
const { account, sale, hr } = Odoo.addons
const modules = {account, sale, hr}

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

const odoo = ODOO({ host, db, modules, success, error } );

export default odoo
 
```


## 登录

``` 
import odoo from './myodoo'
// 注意是 下面的方法是 异步的
const userinfo = await odoo.login({login: 'admin', password: '123' })


``` 

## 登出

```
import odoo from './myodoo'
const result = await odoo.logout()
```

## 获取 odoo 模型    

```
const PartnerModel = odoo.env['res.partner']
```

使用 odoo 模型, 调用 odoo服务中的方法  
* 需要先登录
* 所有方法都为异步方法, 需要用await
* 返回结果, 参看 odoo model

```
const method = 'search_read'
const domain = [['is_company','=',true]]
const fields = ['name','email']
const args = [domain, fields]
const kwargs = {limit=100, offset=10, order='name'}
cosnt partnerData = await PartnerModel.call(method, args, kwargs)
```

条件查询数据  
* search 返回 model-instance (含多条记录)
* fields 参数, 指定嵌套查询的 m2o, o2m, m2m 字段

```
const domain = [['is_company','=',false]]
const fields = {
    company_id : {}
    category_id : {}
}

cosnt partners = await PartnerModel.search(domain, fields)
```

以 id 为参数获取其中的一条记录, 不发送网络请求
```
const id = 99
const partner = PartnerModel.view(id)
```

以 id或ids 为参数获取一条或多条记录, 需要发送网络请求
* browse 返回 model-instance (含一条或多条记录)
* read 返回 list
* fields 参数, 指定嵌套查询的 m2o, o2m, m2m 字段

```
const id = 99
const fields = {
    company_id : {}
    category_id : {}
}
const partner = await PartnerModel.browse(id, fields)
```


一次访问多个字段  
* look1方法, 返回一个对象
* look2方法, 返回一个数组
* 参数fields为一个字段列表, 可以嵌套读取m2o,o2m,m2m字段对应模型的字段

```
const fields = {
    company_id:{},
    category_id:{}
}

const partner_dict =  partner.look1(fields)
const partners_list = partner.look2(fields)

```

创建、编辑、删除
* 都是异步方法
* 

```
const partner = await PartnerModel.create({name:'new_partner'})
const result = await partner.write({name:'other_name'})
const result = await partner.unlink()

const id = 99
const result = await PartnerModel.write(id, {name:'other_name'})
const result = await PartnerModel.unlink(id)

```

