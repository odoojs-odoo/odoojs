## contact

1. contact us:
2. odoojs@outlook.com
3. you are welcome.

## Introduce of odoojs

1. odoojs is a solution for odoo separation of frontend and backend.
2. odoo is backend. odoojs has a frontend separated from odoo.
3. odoojs-rpc is odoojs core module.
4. odoojs-rpc is a javascript lib. npm package named 'odoojs'.
5. can be imported just like: import rpc from 'odoojs'
6. odoojs fetch data from odoo server via odoojs-rpc.
7. odoojs define all menu, action, viwe.
8. odoojs base on VUE v3 Framework
9. odoojs use ant-design-vue v3 as ui lib.
10. odoojs do all web function in odoo.
11. odoojs auto find all modules installed in odoo server.
12. odoojs filter menu, action, view by modules installed.
13. the 3rd app module, install in odoo server.
14. the 3rd app module, defind menu, action, view in odoojs.
15. so. odoojs is open, extend
16. odoojs can use other ui lib, instead of ant-design-vue
17. only redo ui components in odoojs
18. odoojs can use other Framework, instead of VUE,
19. and same of odoojs-rpc, menu, action, view
20. odoojs is internationalization. extend local lang just like: 'addons_i10n_zh_CN_odoo' a new folder in your web app.

## blue print map

1. odoojs is separation of frontend from odoo
2. odoojs easy extend, echarts, etc...
3. easy do mobile app by odoojs
4. End user, can DIY( do it yourself) system
5. odoojs + odoo is low code platform

## odoojs view

### odoojs readonly view

1. run odoojs web app, load all menu, action, view.
2. shou menus.
3. pick one menu. get action.
4. from action, get tree view and form view.
5. from view, get model and fields.
6. fetch data from odoo server with model and fields.
7. show data in view with field ui component.
8. field ui component has attr: readonly, visible, required, domain.

### odoojs editable view

1. form view set editable
2. form view create a editmodel.
3. editmodel is in odoojs-rpc.
4. all editable data is in this editmodel.
5. one field value is changed. trigger onchange event
6. push onchange in editmodel event queue. so all onchange is step by step.
7. fetch data from odoo by onchange. udpate data in editmodel.
8. form view show data onchanged
9. from view trigger commit event.
10. commit event is also in editmodel event queue.
11. update data to odoo server with create or write method
12. delete editmodel. form view set no editable.
13. form view call read method from odoo server. show data

### odoojs one2many field

1. main form view show data
2. field ui component show data
3. sub tree view and sub form view of one2many field definded in main form view.
4. one2many field get ids, fieldinfo, sub fields from main form view.
5. one2many field fetch data from odoo server with ids, feildinfo, sub fields.
6. sub tree view show sub data.
7. sub form view show one record of sub data.

### odoojs one2many field editble

1. main form view set editble.
2. sub tree view of one2many, set editble. show create button.
3. pick one record or new record. show sub form view.
4. sub form view create sub editmodel.
5. sub form view trigger onchange. update data to sub editmodel and odoo server
6. sub form view trigger commit. update data to sub tree view
7. sub tree view trigger onchange to main form view
8. main form view get data from sub tree view for commit
9. main form view trigger commit
