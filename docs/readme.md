# 安装部署 odoo
## 安装部署 odoo 官方源码
参考 https://gitee.com/odoowww/docs/blob/master/odoo/install/odoo.md  

## 安装 odoo 插件 -- 扩展web服务
插件源码 https://gitee.com/odoowww/odoo-patch  
下载插件源码后, 直接放在 odoo 服务器的  odoo 源码的的 addons 目录下  

## 安装 odoo 插件 -- 项目进度管理
插件源码 https://gitee.com/odoowww/odoo-project  
下载插件源码后, 直接放在 odoo 服务器的  odoo 源码的的 addons 目录下  

## odoo 对外接口
odoo 部署完成后, 对外提供 jsonrpc 接口.  
使用jsonrpc 访问 odoo 的方法 参考  
https://gitee.com/odoowww/docs/tree/master/odoo/api  

# 前端使用 odoojs 访问 odoo
## odoojs 的 作用
* odoojs 是一个 javascript 库
* odoojs 封装了 访问 odoo 的 jsonrpc
* odoojs 提供了更友好的访问 odoo 的 方法

## 部署 odoojs
odoojs 源码在
https://gitee.com/odoowww/odoojs/tree/master/packages/odoojs/odoojs  
下载源码后放在自己的前端项目源码中使用即可  

## 部署 odoojs 的插件 -- 项目进度管理
https://gitee.com/odoowww/odoojs/tree/master/packages/odoojs/odoo.addons.zop_project  
下载源码后与 odoojs 放在一起   

# “进度宝” 前端开发 api 文档
## 导入 odoojs 

```  
import ODOO from './odoojs';
import zop_project from './odoo.addons.zop_project';
```

## 初始化 odoojs
* 参数 host: odoo服务器地址和端口号
* 参数 db: 数据库名称
* 参数 modules: 指定 使用到的 odoo 模块
* 参数 models: 使用到的 odoo 模型及模型中的字段
* 参数 callbackerror: 服务请求出错时的回调函数, 前端代码可以在该函数中重定向到错误页面
* 初始化后, 最后导出的 变量, 可以全局使用

```  
// odoo 服务器的 ip 和 端口号, 数据库名
const host = 'http://192.168.x.x:8069'
const db = 'Database_PSM'

// 指定使用到的 odoo 模块
const {crm,project,product} = ODOO.addons
const modules = {crm,project,product,zop_project}

// 指定使用到的 odoo 模型
const models = {
    'res.partner': ['name','email', 'company_id'],
    'res.users': ['name','login', 'company_id'],
    'rec.company': ['name','partner_id','user_id'],
    'project.project': ['name','code','user_id'],
    'olap.dim.date': ['date','day','week','month','quarty','year'],
}

// 定义出错时的回调函数
const callbackerror = (url,params,error)=>{
    console.log('rpc call error:', url, params, error);
}

// 初始化
const odoo = ODOO({host,db,modules, models,callbackerror})

// 导出全局变量 odoo 
export default odoo  
```

## 登录
* 登录函数是异步函数
* 导入初始化后的全局变量 odoo
* 登录函数返回值是 session id
* 通过 odoo.user 查询当前登录用户的信息

```  
//导入全局变量 odoo
import odoo from './odoo'

// 登录
const session_id = await odoo.login({login:'my_account',password:'my_password'})

// 获取当前登录用户的信息
const userData = odoo.user
```

返回结果示例: 

```  
const userData = {
  username: 'my_account',  //用户登录账号
  name: 'My Name',  // 用户名
  uid: 1,           // 用户 id
  session_id: 'my_session_id_string',  
  company_id: 1,    // 用户所属公司 id
} 

``` 

## 查询公司, 创建公司
* 平台管理员账户登录, 
* 公司的模型名为 res.company


### 查询公司  

``` 
import odoo from '@/odoo'
const session_id = await odoo.login({login:'admin',password:'my_password'})
const Model = odoo.env('res.company');

// 查询公司, 过滤掉平台账号所属的公司, 按照公司名称排序
const companys = await Model.search([['id', '!=', 1]], {}, { order: 'name' });
const companyList = companys.look2();

``` 

### 创建公司  
* 参数 公司名name, 公司编码company_registry, 管理员邮箱, 管理员密码
* 在公司模型中新增一条记录, 在用户模型中新增一条记录
* 公司管理员账户 格式为 admin + company_registry
* 公司模型中, 字段 user_id 指向 公司管理员
* 用户模型中, 字段 company_id 指向 公司

``` 
const create_company_and_admin_user = (values) => {
      // company_registry 公司编码
      const { name, company_registry, email, password } = values;
      const Model = odoo.env('res.company');
      
      // 创建公司需要的数据 公司名和公司编码
      const vals = { name, company_registry };

      // 创建公司管理员用户 需要的数据
      const user_vals = {
        login: `admin@${company_registry}`,  // 管理员账号 格式为 admin + company_registry
        name: `admin@${company_registry}`,   // 管理员名称 可以随意指定
        email,
        password,
      };
      
      // 该函数将在 公司模型 和 用户模型中, 各增加一条记录
      const new_company = await Model.create_with_user(vals, user_vals);
      
      // 返回结果是 公司数据
      const companyData = new_company.look()
      return companyData
}

```

### 查询一家公司
```
const read_company = (id) => {
      const Model = odoo.env('res.company');
      
      // 根据公司id 查询公司信息, 会发送网络请求
      const company = await Model.browse(id);

      // 下面的方法, 不发送网络请求, 使用客户端内存中的数据
      const company = Model.view(id);
      
      const companyData = company.look()
      return companyData
}

```

## 公司管理员账户登录, 公司管理

### 公司账号登录
```

const login = (company_registry, password) => {
      const session_id = await odoo.login({
        login: `admin@${company_registry}`,
        password,
      });
}

```
 
### 用户管理

```   
      // 获取当前登录用户的 company_id
      const me = odoo.user
      const { company_id } = me
      const Model = odoo.env('res.users');

      // 仅查询自己公司的用户
      const domain = [['company_id','=',company_id]]
      const users = await Model.search(domain);
      const userList = company.look2()
      
      // 创建公司用户
      const user = await Model.create({login,name,password});
      
      // 根据id 查询
      const user = await Model.browse(id);
      const user = Model.view(id);
      const userData = user.look();
      
      // 更新 用户信息
      const result_bool = await user.write({login,name,password});
      const result_bool = await Model.write(user.id, {login,name,password});
      
      // 删除 用户
      const result_bool = await user.unlink();
      const result_bool = await Model.unlink(user.id );
```

### 项目管理

```   
      // 查询自己公司的所有项目
      const Model = odoo.env('project.project');
      const domain = []
      const projects = await Model.search(domain);
      const projectList = projects.look2()
      
      // 根据id 查询
      const project = await Model.browse(id);
      const project = Model.view(id);
      const projectData = user.look();

      // 创建项目, 参数: 项目名称, 项目编码, 项目经理id 
      const project = await Model.create({name,code,user_id});
      
      // 更新 项目信息
      const result_bool = await project.write({name,code,user_id});
      const result_bool = await Model.write(project.id, {name,code,user_id});
      
      // 删除 项目
      const result_bool = await project.unlink();
      const result_bool = await Model.unlink(project.id );
```


### 报表时间维度设置

```   
// 该函数 设置 日期对应的 周/月/季度/年
// 目前该函数是 按照 自然日历, 计算而得的 周/月/季度/年
// 公司自定义设置, 则在公司模型中, 设置 各阶段的起止时间点
// 在这里读取公司模型的 起止时间点设置
// 根据起止时间点, 计算日期对应的 周/月/季度/年
const getDimDate = td => {

  const year = td.year();
  const month = td.month() + 1;
  const day = td.date();
  const week = td.week() - 1;
  const quarter = td.quarter();

  return {
    date: year + '-' + month + '-' + day,
    year,
    quarter,
    month,
    day,
    week,
    quarterkey: year * 100 + quarter,
    monthkey: year * 100 + month,
    daykey: year * 10000 + month * 100 + day,
    weekkey: year * 100 + week,
  };
};
      
      const Model = odoo.env('olap.dim.date');

      // 根据 日期 查询 时间维度 id
      const date = '2019-1-1'
      const domain = [['date','=',date]]
      const dim = await Model.search(domain);
      const dimData = dim.look()
      const dimId = dim.id
      
      // 创建维度数据
      const date = '2019-1-1'
      const vals = getDimDate(date)
      const dim = await Model.create(vals);
      
```




## 项目经理登录, 管理项目

### 根据自己的用户id, 查询自己的项目信息


```   
      // 查询自己管理的项目的 所有工程节点
      const Model = odoo.env('project.project');
      
      const uid = odoo.user.id
      
      const domain = [['user_id.id', '=', uid]],
      const projects = await Model.search(domain);
      const projectList = projects.look2()

      // 根据id 查询
      const project = await Model.browse(id);
      const project = Model.view(id);
      const projectData = user.look();

      // 更新 项目信息
      const result_bool = await project.write({name,code,user_id});
      const result_bool = await Model.write(project.id, {name,code,user_id});
```

### 管理项目的工程节点

```   
      // 查询自己管理的项目的 所有工程节点
      const Model = odoo.env('project.work');
      
      const uid = odoo.user.id
      
      const domain = [['project_id.user_id.id', '=', uid]],
      const works = await Model.search(domain);
      const workList = works.look2()
      
      // 根据id 查询
      const work = await Model.browse(id);
      const work = Model.view(id);
      const workData = work.look();

      // 创建节点, 
      // 参数: 节点名称, 编码, 类型, 工程技术员, 所属项目, 父节点 
      //   度量单位, 数量, 单价
      // set_amount: 更新父节点的 总金额
      // set_full_name: 根据父节点的名称, 计算自己的全名
      const work = await Model.create({
        name,code,work_type,user_id,project_id,parent_id,
        uom_id, qty, price,
        set_full_name: 1, set_amount: 1 
      });
      
      // 更新 节点信息
      const result_bool = await work.write({
        name,code,work_type,user_id,project_id,parent_id,
        set_full_name: 1, set_amount: 1 
      });
      
      
```

## 工程技术员登录, 每日更新自己的节点的进度

### 查询节点

```   
      // 查询自己管理的 所有工程节点
      const Model = odoo.env('project.work');
      const uid = odoo.user.id
      const domain = [['user_id.id', '=', uid]],
      const works = await Model.search(domain);
      const workList = works.look2()
      
```

### 根据 节点, 查询工单, 创建工单, 提交工单

```   
      const Model = odoo.env('project.worksheet');
      
      // 查询自己管理的 所有工程节点
      // 选择其中一个
      const work_id = 1
      
      // 查询工单
      const domain = [['work_id.id', '=', work_id]],
      const worksheets = await Model.search(domain);
      const worksheetList = worksheets.look2()
      
      // 创建工单
      // 参数: 所属节点, 日期, 当日内工单序号, 本次施工数量
      const worksheet = await Model.create({
        work_id, date, number, qty
      });
      
      // 修改工单
      const result_bool = await worksheet.write({
        work_id, date, number, qty
      });
      
      // 提交工单
      // 功能: 1 更新工单的状态, 
      // 2 将工单的施工数据汇总到 对应的日/周/月/季/报表
      const worresult_boolksheet = await worksheet.post();
      
```


## 所有用户 查询进度信息

```   
      const Model = odoo.env('project.workfact');
      
      // 查询所有报表
      // domain 中可以指定条件, 有选择的查询报表
      const domain = [],
      const workfacts = await Model.search(domain);
      const workfactList = workfacts.look2()
      
      // 根据 id 查询一张报表
      const domain = [],
      const workfact = await Model.browse(id);
      const workfact = Model.view(id);
      const workfactData = workfact.look()
      
      
```

报表内容:

```
  work_id: 节点
  work_ype: 节点类型
  price:  节点单价
  uom_id:  单位
  qty:  设计数量
  amount: 设计产值
  
  date_type: 报表类型 日/周/月/季/年
  date:  报表日期
  year:  
  quarter:
  month:
  week:
  day:
  amount_open:   本期期初产值
  amount_delta:  本期施工产值
  amount_close:  本期期末产值
  qty_open:    本期期初数量
  qty_delta:   本期施工数量
  qty_close:   本期期末数量
  rate:  本期期末 完成率
  
```
