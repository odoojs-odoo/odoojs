# 文档结构说明

* test文件夹是测试脚本
* src文件夹是 odoojs的源码


# odoojs

odoojs是一个前端的js库, 封装了odoo api.  
使用odoojs, 可以视作odoojs是一个服务.  
换言之, page页面, 直接调用 odoojs, 获取数据. 

odoo api 是 odoo 对外的接口规范. 参看文档:  
https://gitee.com/odoowww/odoo-patch/blob/master/addons/ow_json/README-api.md

因为odoojs 已经封装 odoo api, 所以在使用odoojs的情况下, 掌握odoo api, 重点是:  
1 odoo定义的数据类型
2 search/search_read方法的参数 domain 的格式  
3 create / write 方法的参数 vals 的格式  

odoo model 参考文档  
https://gitee.com/odoowww/docs/tree/master/odoo/model  

odoojs 使用教程  
https://gitee.com/odoowww/odoojs/blob/master/packages/odoojs-core/tutorial.md

