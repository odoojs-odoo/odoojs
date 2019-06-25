
## 初始化

* 在VUE环境里 安装好 npm 模块 odoojs-finance
* 创建一个文件 比如 myodoo.js, 写入以下代码


```
import ODOO from 'odoojs-finance'

const host = 'http://www.bjssrs.cn:8069';
//const db = 'Finance_test';
const db = 'T3';

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

const odoo = ODOO({ host, db, success, error } );

export default odoo

```   


## 登录

* 在其他任何地方 import odoo form './myodoo'
* 然后就可以使用 odoo 了

```
import odoo from './myodoo'
// 注意是 下面的方法是 异步的
await odoo.login({login: 'admin', password: '123' })
``` 


## 查询凭证

``` 
// 获取凭证模型
model = odoo.env['account.move']

// 查询凭证
domain = []
fields = {  
  line_ids: {
    account_id: {},
    sub_account_id: {},
  }
}

// 注意是 下面的方法是 异步的
const records = await model.search(domain, fields)
const recordsArray = records.look2(fields)
``` 

## 创建凭证


```  
const line_vals = {
      name: '这是明细行的摘要',  //
      account_id: 2,   // many2one 字段,  模型 account.account 
      debit:  100.00,  // 不能是负数
      credit:   0.00,  // debit 和 credit 必须有一个 为 0 
                       // 多行明细的 debit credit 必须借贷平衡
      partner_id: 1,   // many2one 字段,  模型 res.partner 
      product_id: 1,   // many2one 字段,  模型 product.product
      date_maturity: '2019-6-13',  // 
}

const vals = {
  date: '2019-6-13',   // 日期格式 YYYY-m-D
  journal_id: 1,       // many2one 字段,  模型 account.journal 
  number_cn: 2,        // 凭证号，不设置会 自动生成
  ref: '这是一个凭证摘要',
  line_ids: [
    [0,0,line_vals],
    [0,0,line_vals],
    [0,0,line_vals],
  ]
}

// 注意是 下面的方法是 异步的
const record = await model.create( vals, fields )
const recordObject = record.look(fields)
```


## 修改凭证

```
const vals = {
  date: '2019-6-13',   // 日期格式 YYYY-m-D
  number_cn: 2,        // 凭证号，不设置会 自动生成
  ref: '这是一个凭证摘要',
  line_ids: [
    [0,false,line_vals],  // 表示新增明细行。内容是 line_vals
    [1,2,line_vals],      // 表示编辑明细行。明细行的id是2，修改的内容是 line_vals
    [2,3,false],          // 表示删除明细行。明细行的id是3
  ]
}

const id = 1  // 凭证的id

// 注意是 下面的方法是 异步的
const record = await model.write( id, vals, fields )
const recordObject = record.look(fields)
```

## 删除凭证

```
const id = 1  // 凭证的id
// 注意是 下面的方法是 异步的
const result_of_boolean = await model.unlink( id )

```

## 查询凭证类型

```
model = odoo.env['account.journal']
domain = []
fields = {  
  default_debit_account_id:{},
  default_credit_account_id:{},
}

// 注意是 下面的方法是 异步的
const records = await model.search(domain, fields)
const recordsArray = records.look2(fields)
```

## 查询科目

```
model = odoo.env['account.account']
domain = []
fields = {}

// 注意是 下面的方法是 异步的
const records = await model.search(domain, fields)
const recordsArray = records.look2(fields)
```

## 查询业务伙伴

```
model = odoo.env['res.partner']
domain = []
fields = {}

// 注意是 下面的方法是 异步的
const records = await model.search(domain, fields)
const recordsArray = records.look2(fields)
```

## 查询产品

```
model = odoo.env['product.product']
domain = []
fields = {}

// 注意是 下面的方法是 异步的
const records = await model.search(domain, fields)
const recordsArray = records.look2(fields)
```

