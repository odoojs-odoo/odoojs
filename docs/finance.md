
## 初始化

```
import ODOO from 'odoojs-finance'

const host = 'http://www.bjssrs.cn:8069';
const db = 'Finance_test';

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

```
odoo.login({login: 'username', password: 'psw' })
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

const record = await model.write( id, vals, fields )
const recordObject = record.look(fields)
```

## 删除凭证

```
const id = 1  // 凭证的id
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

const records = await model.search(domain, fields)
const recordsArray = records.look2(fields)
```

## 查询科目

```
model = odoo.env['account.account']
domain = []
fields = {}

const records = await model.search(domain, fields)
const recordsArray = records.look2(fields)
```

## 查询业务伙伴

```
model = odoo.env['res.partner']
domain = []
fields = {}

const records = await model.search(domain, fields)
const recordsArray = records.look2(fields)
```

## 查询产品

```
model = odoo.env['product.product']
domain = []
fields = {}

const records = await model.search(domain, fields)
const recordsArray = records.look2(fields)
```

