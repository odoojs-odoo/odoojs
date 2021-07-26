import py_utils from './py_utils'
import viewsClass from './view'

class ActionBase {
  constructor(env, payload) {
    const { action_info, fields, views } = payload
    this._env = env
    this._action_info = action_info

    this._fields = fields // 这个没用, 来自于  load view
    this._views = views // 这个是 所有的 view, 来自于  load view 的 fields_views

    this._views_registry = {}
  }

  get xml_id() {
    // 这个 ViewModel 读取 metadata 时 使用
    return this._action_info.xml_id
  }

  // 所有这些参数只是 view_get 有用
  get env() {
    // view get 用
    return this._env
  }

  get res_model() {
    // view get 用
    return this._action_info.res_model
  }

  get views() {
    // view get 用
    return this._views
  }

  get listview() {
    return this.view_get('list')
  }

  get treeview() {
    return this.view_get('tree')
  }

  get kanbanview() {
    return this.view_get('kanban')
  }

  get formview() {
    return this.view_get('form')
  }

  view_get(view_type) {
    if (!this._views_registry[view_type]) {
      this._views_registry[view_type] = this._create_view(view_type)
    }
    return this._views_registry[view_type]
  }

  _create_view(view_type) {
    const views = this.views
    const view_info = views[view_type] || {}
    // console.log(view_type, view_info)
    const View = viewsClass[view_type]
    const view = new View(this.env, {
      model: this.res_model,
      action: this,
      view_type,
      view_info
    })
    // console.log(view)
    return view
  }
}

ActionBase._registry = {}

class ActionRoot extends ActionBase {
  constructor(env, payload) {
    super(env, payload)
  }

  get domain() {
    // 这里是 string,   tree view 做过滤用
    return this._action_info.domain
  }

  static async load(env, action_xml_id, additional_context = {}) {
    /*
        1. xml_id is js.
           account2.action_entry_open,account.move.line.open
           逗号分割, 前面是 自定义的 xml_id, 后面是模型名
           typeof xml_id === string && xml_id.split(',').length === 2
        2. xml_id in odoo.  
           account.action_move_journal_line
           typeof xml_id === string && xml_id.split('.').length === 2
        3. action_id in odoo.  
           1
           typeof xml_id === integer
        4. 子查询,  call  load_sync 函数, 不在 load 里实现
           account.action_move_journal_line;line_ids;partner_id
           分号分割, xml_id,model_name(if js);field_name;field_name
    */
    if (this._registry[action_xml_id]) {
      return this._registry[action_xml_id]
    }

    const get_action = async xml_id => {
      const is_customer =
        typeof xml_id === 'string' && xml_id.split(',').length === 2
      if (is_customer) {
        const [xml_ref, model] = xml_id.split(',')
        // TBD 还未实现
        const action = await this._load_by_model(env, xml_ref, model)
        return action
      } else {
        // 这是 异步 load, 参数是  action.xml_id or action.id
        const action = await this._load(env, xml_id, additional_context)
        return action
      }
    }

    const action = await get_action(action_xml_id)

    await action._load_model_ids()

    this._registry[action._action_info.xml_id] = action
    this._registry[action._action_info.id] = action

    return action
  }

  static async _load(env, action_xml_id, additional_context = {}) {
    const get_action_id = async xml_id => {
      if (typeof xml_id === 'string' && xml_id.split('.').length === 2) {
        const action = await env.ref(xml_id)
        const action_id = action.id
        return action_id
      } else {
        return xml_id
      }
    }

    const action_id = await get_action_id(action_xml_id)
    const action_info = await env.odoo.web.action.load(
      action_id,
      additional_context
    )

    // console.log(env)
    const get_context = () => {
      if (!action_info.context) {
        return {}
      }

      // TBD 不同的action, 其 context 内容 eval 时, 需要参数,
      // 如果 eval 时报错, 那么查找下, 缺少哪个参数, 在这里补充
      // 目前看有 active_id 和 allowed_company_ids 都是 centext 里的 内容,
      // 而 centext 来自于 页面点击按钮跳转时, 那个按钮应该携带的
      // 如果是从 菜单 点击跳转的 action，应该 没有 context , active_id

      //
      // odoo 中搜索 <field name="context">
      // 有 active_id, allowed_company_ids[0], uid
      //

      // env.context 是 调用 该 action 的 上下文, 里面应该有这些东西

      // console.log(action_info.context, env.context)
      // const context = env.eval_safe(action_info.context, env.context)

      const context = py_utils.eval(action_info.context, env.context)
      // console.log(action_info.context, env.context, context)
      return context
    }

    const context = get_context()
    const env2 = env.copy({ ...env.odoo.env.context, ...context })

    return this.load_by_info(env2, action_info)
  }

  static async load_by_info(env, action_info) {
    const views_result = await this._load_views(
      env,
      action_info.res_model,
      action_info.views
    )

    const views = views_result.fields_views
    const fields = views_result.fields
    const action2 = new this(env, { action_info, fields, views })
    return action2
  }

  static async _load_views(env, model, views) {
    const method = 'load_views'
    const Model = env.model(model)
    const res = await Model.execute_kw(method, [], { views })
    return res
  }

  async _load_model_ids() {
    const get_all_models = views => {
      return Object.keys(views).reduce((acc, view_type) => {
        const fields = views[view_type].fields
        const models = Object.keys(fields).reduce((acc_field, fld) => {
          const relation = fields[fld].relation
          if (relation) {
            acc_field[relation] = 1
            const child_models = get_all_models(fields[fld].views)
            acc_field = { ...acc_field, ...child_models }
          }

          return acc_field
        }, {})
        acc = { ...acc, ...models }
        return acc
      }, {})
    }

    const all_models2 = get_all_models(this.views)
    const all_models = { [this.res_model]: 12, ...all_models2 }
    await this.env._set_model_registry(Object.keys(all_models))
  }
}

class SubAction extends ActionRoot {
  constructor(env, payload) {
    super(env, payload)
    const { from_view } = payload
    // formview 定义子 o2m 的 action 时, 需要这个
    this._from_view = from_view
  }

  static load_sync(env, payload = {}) {
    const { from_view } = payload
    const { viewmodel: from_viewmodel, field: from_field } = from_view
    // console.log(from_view)

    const parent_xml_id = from_viewmodel.view.action.xml_id
    const view_type = from_viewmodel.view.view_type
    const xml_id = `${parent_xml_id},${view_type}.${from_field}`
    // console.log(xml_id)
    if (this._registry[xml_id]) {
      return this._registry[xml_id]
    }

    const action = this._load_sync(env, { ...payload, xml_id })
    this._registry[action._action_info.xml_id] = action
    this._registry[action._action_info.id] = action

    return action
  }

  static _load_sync(env, payload = {}) {
    const { from_view, xml_id } = payload
    const { viewmodel: from_viewmodel, field: from_field } = from_view
    // console.log(from_view)

    const meta = from_viewmodel.view.view_info.fields[from_field]
    // console.log(meta)

    const action_info = {
      id: xml_id,
      domain: false,
      res_model: meta.relation,
      views: [
        [false, 'list'],
        [false, 'form']
      ],
      xml_id
    }

    const fields = {}
    const views = meta.views
    const action_payload = { action_info, fields, views, from_view }
    return new this(env, { ...action_payload })
  }
}

export class Action extends SubAction {
  constructor(env, payload) {
    super(env, payload)
  }
}

//   id: 132,
//   domain: false,
//   context: "{'default_is_company': True}",
//   res_model: 'res.partner',
//   views: [
//     [124, 'kanban'],
//     [117, 'list'],
//     [121, 'form'],
//     [false, 'activity']
//   ],
//   xml_id: 'contacts.action_contacts',

// const ss = {
//   id: 132,
//   name: '\u66f4\u591a\u8054\u7cfb\u4eba',
//   type: 'ir.actions.act_window',
//   view_id: false,
//   domain: false,
//   context: "{'default_is_company': True}",
//   res_id: 0,
//   res_model: 'res.partner',
//   target: 'current',
//   view_mode: 'kanban,list,form,activity',
//   usage: false,
//   view_ids: [18, 19, 20],
//   views: [
//     [124, 'kanban'],
//     [117, 'list'],
//     [121, 'form'],
//     [false, 'activity']
//   ],
//   limit: 80,
//   groups_id: [],
//   search_view_id: [123, 'res.partner.select'],
//   filter: false,
//   search_view:
//     "{'model': 'res.partner', 'field_parent': False, 'arch': '<search string=\"\u641c\u7d22\u4e1a\u52a1\u4f19\u4f34\">\\n                    <field name=\"name\" filter_domain=\"[\\'|\\', \\'|\\', (\\'display_name\\', \\'ilike\\', self), (\\'ref\\', \\'=\\', self), (\\'email\\', \\'ilike\\', self)]\" modifiers=\"{}\"/>\\n                    <field name=\"parent_id\" domain=\"[(\\'is_company\\', \\'=\\', True)]\" operator=\"child_of\" on_change=\"1\" can_create=\"true\" can_write=\"true\" modifiers=\"{}\"/>\\n                    <field name=\"email\" filter_domain=\"[(\\'email\\', \\'ilike\\', self)]\" on_change=\"1\" modifiers=\"{}\"/>\\n                    <field name=\"phone\" filter_domain=\"[\\'|\\', (\\'phone\\', \\'ilike\\', self), (\\'mobile\\', \\'ilike\\', self)]\" on_change=\"1\" modifiers=\"{}\"/>\\n                    <field name=\"category_id\" string=\"\u6807\u7b7e\" filter_domain=\"[(\\'category_id\\', \\'child_of\\', self)]\" can_create=\"true\" can_write=\"true\" modifiers=\"{}\"/>\\n                    <field name=\"user_id\" can_create=\"true\" can_write=\"true\" modifiers=\"{}\"/>\\n                    <separator/>\\n                    <filter string=\"\u4e2a\u4eba\" name=\"type_person\" domain=\"[(\\'is_company\\', \\'=\\', False)]\"/>\\n                    <filter string=\"\u516c\u53f8\" name=\"type_company\" domain=\"[(\\'is_company\\', \\'=\\', True)]\"/>\\n                    <separator/>\\n                    <filter string=\"\u5df2\u5f52\u6863\" name=\"inactive\" domain=\"[(\\'active\\', \\'=\\', False)]\"/>\\n                        <filter invisible=\"1\" string=\"\u6700\u8fd1\u7684\u6d3b\u52a8\" name=\"activities_overdue\" domain=\"[(\\'activity_ids.date_deadline\\', \\'&lt;\\', context_today().strftime(\\'%Y-%m-%d\\'))]\" help=\"\u663e\u793a\u6240\u6709\u7684\u5728\u4eca\u5929\u4e4b\u524d\u7684\u4e0b\u4e00\u4e2a\u884c\u52a8\u65e5\u671f\u7684\u8bb0\u5f55\" modifiers=\"{&quot;invisible&quot;: true}\"/>\\n                        <filter invisible=\"1\" string=\"\u4eca\u5929\u7684\u6d3b\u52a8\" name=\"activities_today\" domain=\"[(\\'activity_ids.date_deadline\\', \\'=\\', context_today().strftime(\\'%Y-%m-%d\\'))]\" modifiers=\"{&quot;invisible&quot;: true}\"/>\\n                        <filter invisible=\"1\" string=\"\u672a\u6765\u6d3b\u52a8\" name=\"activities_upcoming_all\" domain=\"[(\\'activity_ids.date_deadline\\', \\'&gt;\\', context_today().strftime(\\'%Y-%m-%d\\'))]\" modifiers=\"{&quot;invisible&quot;: true}\"/>\\n                        <separator/>\\n                    \\n                    <separator/>\\n                    <group expand=\"0\" name=\"group_by\" string=\"\u5206\u7ec4\">\\n                        <filter name=\"salesperson\" string=\"\u9500\u552e\u5458\" domain=\"[]\" context=\"{\\'group_by\\' : \\'user_id\\'}\"/>\\n                        <filter name=\"group_company\" string=\"\u516c\u53f8\" context=\"{\\'group_by\\': \\'parent_id\\'}\"/>\\n                        <filter name=\"group_country\" string=\"\u56fd\u5bb6\" context=\"{\\'group_by\\': \\'country_id\\'}\"/>\\n                    </group>\\n                </search>', 'name': 'res.partner.select', 'type': 'search', 'view_id': 123, 'base_model': 'res.partner', 'fields': {'name': {'type': 'char', 'change_default': False, 'company_dependent': False, 'depends': (), 'manual': False, 'readonly': False, 'required': False, 'searchable': True, 'sortable': True, 'store': True, 'string': '\u540d\u79f0', 'translate': False, 'trim': True, 'views': {}}, 'parent_id': {'type': 'many2one', 'change_default': False, 'company_dependent': False, 'context': {}, 'depends': (), 'domain': [], 'manual': False, 'readonly': False, 'relation': 'res.partner', 'required': False, 'searchable': True, 'sortable': True, 'store': True, 'string': '\u5173\u8054\u516c\u53f8', 'views': {}}, 'user_id': {'type': 'many2one', 'change_default': False, 'company_dependent': False, 'context': {}, 'depends': (), 'domain': [], 'help': '\u8d1f\u8d23\u6b64\u8054\u7cfb\u4eba\u7684\u5185\u90e8\u7528\u6237\u3002', 'manual': False, 'readonly': False, 'relation': 'res.users', 'required': False, 'searchable': True, 'sortable': True, 'store': True, 'string': '\u9500\u552e\u5458', 'views': {}}, 'category_id': {'type': 'many2many', 'change_default': False, 'company_dependent': False, 'context': {}, 'depends': (), 'domain': [], 'manual': False, 'readonly': False, 'relation': 'res.partner.category', 'required': False, 'searchable': True, 'sortable': False, 'store': True, 'string': '\u6807\u7b7e', 'views': {}}, 'email': {'type': 'char', 'change_default': False, 'company_dependent': False, 'depends': (), 'manual': False, 'readonly': False, 'required': False, 'searchable': True, 'sortable': True, 'store': True, 'string': 'Email', 'translate': False, 'trim': True, 'views': {}}, 'phone': {'type': 'char', 'change_default': False, 'company_dependent': False, 'depends': (), 'manual': False, 'readonly': False, 'required': False, 'searchable': True, 'sortable': True, 'store': True, 'string': '\u7535\u8bdd', 'translate': False, 'trim': True, 'views': {}}}}",
//   xml_id: 'contacts.action_contacts',
//   help:
//     '<p class="o_view_nocontent_smiling_face">\n            \u5728\u901a\u8baf\u5f55\u4e2d\u521b\u5efa\u8054\u7cfb\u4eba\n          </p><p>\n            Odoo \u5e2e\u52a9\u60a8\u8f7b\u677e\u8ddf\u8fdb\u4e0e\u5ba2\u6237\u76f8\u5173\u7684\u6240\u6709\u6d3b\u52a8\u3002\n          </p>\n        ',
//   binding_model_id: false,
//   binding_type: 'action',
//   binding_view_types: 'list,form',
//   display_name: '\u66f4\u591a\u8054\u7cfb\u4eba',
//   create_uid: [1, 'System'],
//   create_date: '2021-06-09 12:31:59',
//   write_uid: [1, 'System'],
//   write_date: '2021-06-09 12:31:59',
//   __last_update: '2021-06-09 12:31:59',
//   flags: {}
// }
