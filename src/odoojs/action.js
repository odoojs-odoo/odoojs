import py_utils from './py_utils'
import { WebModel } from './web_models'

// eslint-disable-next-line no-unused-vars
const cp = item => JSON.parse(JSON.stringify(item))

class IrActions {
  constructor(env, payload) {
    const { action_info } = payload
    const context = { ...env.context }
    this._env = env.copy(context)
    this._action_info = action_info
  }

  get env() {
    return this._env
  }

  get action_info() {
    return this._action_info
  }

  get type() {
    // type: "ir.actions.act_window"
    return this._action_info.type
  }

  get action_name() {
    return this._action_info.name
  }

  get id() {
    return this._action_info.id
  }
  get xml_id() {
    return this._action_info.xml_id
  }

  static async action_load(env, action_id, kwargs = {}) {
    return tools.load(env, action_id, kwargs)
  }
}

class IrActionsActClient extends IrActions {
  // action_type = ir.actions.client
  // 菜单  讨论 是 client
  constructor(env, payload) {
    super(env, payload)
  }

  // tag
}

class IrActionsActUrl extends IrActions {
  // action_type = ir.actions.act_url

  // 结算单 预览
  // url: '/my/invoices/6?access_token=850582b0-1ba3-4805-b9f7-71cad1f27a28'
  constructor(env, payload) {
    super(env, payload)
    // console.log(payload)
  }

  get url() {
    return this._action_info.url
  }
}

class IrActionsServer extends IrActions {
  // action_type = ir.actions.server
  // act server 是代码. 直接 run, 之后再返回的是  null 或 其他 action
  constructor(env, payload) {
    super(env, payload)
  }
}

// eslint-disable-next-line no-unused-vars
class IrActionsReport extends IrActions {
  // action_type = ir.actions.report
  constructor(env, payload) {
    super(env, payload)
  }
}

class IrActionsActWindowclose extends IrActions {
  // action_type = ir.actions.act_window_close
  constructor(env, payload) {
    super(env, payload)
  }
}

class IrActionsActWindow extends IrActions {
  // action_type = ir.actions.act_window
  constructor(env, payload) {
    super(env, payload)
    const { fields, views, model_from } = payload

    this._fields = fields // 这个没用, 来自于  load view
    this._views = views // 这个是 所有的 view, 来自于  load view 的 fields_views
    this._model_from = model_from

    const Model = env.model(this.res_model, { fields })
    this._model = new WebModel({ action: this, Model })
    this._search_default = {}
  }

  get target() {
    return this._action_info.target
  }

  get res_model() {
    return this._action_info.res_model
  }

  get res_id() {
    return this._action_info.res_id
  }

  get domain() {
    // 这里是 string,   tree view 做过滤用
    return this._action_info.domain
  }

  get view_mode() {
    // web 页面获取 view_mode
    return this._action_info.view_mode.split(',')
  }

  get model() {
    return this._model
  }

  get fields() {
    return this._fields
  }

  get model_from() {
    return this._model_from
  }

  get views() {
    return this._views
  }

  get search_default() {
    return this._search_default
  }

  get_context() {
    return get_context(this._action_info.context, {})
  }

  //  初始化的时候, o2m字段的 views 页面 可能无  form view
  // 在 relation browse 前, 需要 更新下
  async load_view_info(view_type) {
    // console.log(
    //   'load,11',
    //   this.res_model,
    //   this.views,
    //   this._action_info.view_mode,
    //   view_type
    // )

    if (!this.views[view_type]) {
      const args = [[null, view_type]]
      const info = await this.model.Model.execute('load_views', args)
      console.log('xxxx,', cp(info))

      this.views[view_type] = {
        _is_load_async: 1,
        ...info.fields_views[view_type]
      }
      // console.log(
      //   'load,22',
      //   this.res_model,
      //   this._action_info.view_mode,
      //   view_type
      // )
      // if (!this.view_mode.includes(view_type)) {
      //   const modes = [this._action_info.view_mode, view_type]
      //   this._action_info.view_mode = modes.join(',')
      // }
    }
  }

  async set_env_and_search_default(kwargs) {
    // console.log('set env', this.env.context, kwargs)
    const { additional_context, active_context } = kwargs
    if (additional_context && active_context) {
      this._env = tools._get_env(this.env, this.action_info.context, kwargs)
      await this.set_search_default()
    }
  }

  async set_search_default() {
    const search_defaults = {}
    for (const item in this.env.context) {
      if (item.slice(0, 14) === 'search_default') {
        console.log('search', item)
        const field = item.slice(15)
        const meta = this.fields[field] || {}
        if (['many2one', 'selection'].includes(meta.type)) {
          const key = `${field}-id_${this.env.context[item]}`
          const val = this.env.context[item]
          search_defaults[key] =
            meta.type === 'many2one'
              ? (await this.env.model(meta.relation).name_get([val])).find(
                  item => item[0] === val
                )
              : meta.selection.find(item => item[0] === val)
        } else {
          search_defaults[field] = 1
        }
      }
    }
    this._search_default = search_defaults
    // console.log('search_default2', search_defaults)
  }
}

export const action_load = async (env, action_xml_id, kwargs2 = {}) => {
  /*
     *    1. load menu 之后, menu 中的 action 为 action_ref
     *      如: account.action_move_journal_line
           判断方式: typeof xml_id === string && xml_id.split('.').length === 2
        2. 自定义菜单, 也是提供 action_ref
        3. listview 和 formview 的 toolbar 中, 或者 formview 的 button 中,
           action 为 action_id, 整形值 如: 1
           为了 保证唯一性, 我们把 parent action 一起传过来
           格式为数组: [parent_action_id,action_id]
           判断方式: Arrar.isArray( xml_id) && typeof xml_id[xml_id.length-1] === integer
             注意 buttonclick 事件中, 是否要先转换为 number
        4. 自定义的 xml_id. 该功能保留. 暂时不需要
          //  格式 需要再完善 与 上一条冲突
           格式 account2.action_entry_open,account.move.line.open
           逗号分割, 前面是 自定义的 xml_id, 后面是模型名
           判断方式: typeof xml_id === string && xml_id.split(',').length === 2
 
    */

  // 自定义 action TBD
  // const is_customer =
  //   typeof xml_id === 'string' && xml_id.split(',').length === 2
  // if (is_customer) {
  //   throw 'Not define'
  //   // const [xml_ref, model] = xml_id.split(',')
  //   // TBD 还未实现
  //   // const action = await this._load_by_model(env, xml_ref, model)
  //   // return action
  // }

  // 如果是 action_ref 先 获取 action_id

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

  return tools.load(env, action_id, kwargs2)
}

const tools = {
  _registry: {},
  _registry_for_non_menu: {},

  async load(env, action_id, kwargs2 = {}) {
    //  is_mobile 的作用? TBD
    // const { is_mobile, ...kwargs2 } = kwargs
    // action.is_mobile = is_mobile
    //
    // * from web, 是 菜单点击事件  这时 只有 action_id
    // * from web, 是 点击按钮之后的reload , 这时, 有额外的 active_id
    //
    // * from view.js 时:
    // { active_context, additional_context} = kwargs2
    // 1. 如果有 action_info, 是 button click 后, 返回 action_info 那么
    //    context = env.odoo.env.context + additional_context + active_context + action_info.context
    // 2. TBD:  若无, 则是 view.js call_action,
    //    ?context = env.odoo.env.context + additional_context + active_context + action_info.context

    const { active_id, ...kwargs } = kwargs2

    // console.log('xxxxx,load', kwargs2)

    const _for_menu = async () => {
      if (tools._registry[action_id]) {
        const action = tools._registry[action_id]
        return action
      } else {
        const action = await tools._load(env, action_id, kwargs)
        if (!action) return action
        if (action.id) tools._registry[action.id] = action
        return action
      }
    }

    const _for_non_menu = async active_id => {
      const active_context = { active_id, active_ids: [active_id] }

      if (action_id && tools._registry_for_non_menu[action_id]) {
        const action = tools._registry_for_non_menu[action_id]
        if (action.type === 'ir.actions.act_window')
          await action.set_env_and_search_default({ active_context })
        return action
      } else {
        const action = await tools._load(env, action_id, { active_context })
        // 貌似应该 写入 tools._registry
        // if (!action) return action
        // if (action.id) tools._registry_for_non_menu[action.id] = action
        return action
      }
    }

    const _for_inner = async () => {
      // TBD. 需要确认下 不能 从 tools._registry_for_non_menu . reload
      const action = await tools._load(env, action_id, kwargs)
      if (!action) return action
      if (action.id) tools._registry_for_non_menu[action.id] = action
      return action

      // if (action_id && tools._registry_for_non_menu[action_id]) {
      //   const action = tools._registry_for_non_menu[action_id]
      //   if (action.type === 'ir.actions.act_window')
      //     await action.set_env_and_search_default(kwargs)
      //   return action
      // } else {
      //   const action = await tools._load(env, action_id, kwargs)
      //   if (!action) return action
      //   if (action.id) tools._registry_for_non_menu[action.id] = action
      //   return action
      // }
    }

    const { additional_context } = kwargs2
    // view.js  内部调用
    if (additional_context) return _for_inner()

    // console.log('xxxxx,load1', kwargs2)

    // 页面 菜单 调用
    if (!active_id) return _for_menu()

    // 页面 非菜单 调用
    if (active_id) return _for_non_menu(active_id)
  },

  async _load(env, action_id, kwargs = {}) {
    const { action_info, additional_context, active_context } = kwargs
    let action_info2 = action_info

    if (!action_info) {
      action_info2 = await env.odoo.web.action.load({
        action_id,
        additional_context: {
          ...env.context,
          ...(additional_context || {}),
          ...(active_context || {})
        }
      })
    }

    const action = await this._load_by_info(env, action_info2, kwargs)

    return action
  },

  async _load_by_info(env, action_info, kwargs) {
    // console.log('action_info', action_info)

    if (action_info.type === 'ir.actions.act_window') {
      return await tools.load_act_window(env, action_info, kwargs)
    } else if (action_info.type === 'ir.actions.act_window_close') {
      return await tools.load_act_window_close(env, action_info, kwargs)
    } else if (action_info.type === 'ir.actions.client') {
      return await tools.load_act_client(env, action_info, kwargs)
    } else if (action_info.type === 'ir.actions.act_url') {
      return await tools.load_act_url(env, action_info, kwargs)
    } else if (action_info.type === 'ir.actions.server') {
      return await tools.load_server(env, action_info, kwargs)
    } else {
      console.log(' TBD  action', action_info.type, action_info, kwargs)
      throw 'TBD action'
    }
  },

  _get_env(env, context_str, kwargs) {
    // context = env.odoo.env.context + additional_context + active_context + action_info.context
    // console.log(env.context, env.odoo.env.context, kwargs)
    const { additional_context = {}, active_context = {} } = kwargs
    const globals = { ...env.context, ...active_context }
    const context2 = get_context(context_str, globals)
    const context = { ...context2, ...additional_context, ...active_context }
    return env.copy({ ...env.odoo.env.context, ...context })
  },

  async load_server(env2, action_info, kwargs) {
    const env = this._get_env(env2, action_info.context, kwargs)
    return new IrActionsServer(env, { action_info })
  },

  async load_act_url(env2, action_info, kwargs) {
    const env = this._get_env(env2, action_info.context, kwargs)
    return new IrActionsActUrl(env, { action_info })
  },

  async load_act_client(env2, action_info, kwargs) {
    const env = this._get_env(env2, action_info.context, kwargs)
    return new IrActionsActClient(env, { action_info })
  },

  async load_act_window_close(env2, action_info, kwargs) {
    const env = this._get_env(env2, action_info.context, kwargs)
    return new IrActionsActWindowclose(env, { action_info })
  },

  async load_act_window(env2, action_info, kwargs = {}) {
    const env = this._get_env(env2, action_info.context, kwargs)
    const search_view_id = action_info.search_view_id
    const model = action_info.res_model
    const kwargs2 = {
      views: [...action_info.views, [(search_view_id || [false])[0], 'search']],
      options: { action_id: action_info.id, toolbar: true, load_filters: true }
    }

    const views_result = await tools._load_views(env, model, kwargs2)
    // {filters, fields_views,fields, } = views_result
    const { fields_views: views, fields } = views_result

    await tools._load_model_ids(env, model, views)

    // console.log('load_act_window', env.context, kwargs)
    const action = new IrActionsActWindow(env, { action_info, fields, views })
    await action.set_search_default()
    return action
  },

  async _load_model_ids(env, model, views) {
    // 读取 action 的所有 子model 的 model_id , 并 set env
    // 目的是 设置 model_id 为 pyeval 服务
    //
    // TBD 只对 act_window 有用? 其他 类型是什么情况?

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

    const all_models2 = get_all_models(views)
    const all_models = { [model]: 12, ...all_models2 }
    await env._set_model_registry(Object.keys(all_models))
  },

  async _load_views(env, model, { views, options }) {
    const method = 'load_views'
    const Model = env.model(model)
    const res = await Model.execute_kw(method, [], { views, options })

    return res
  }
}

const get_context = (todo_str, globals_dict = {}) => {
  if (!todo_str) return {}

  // act_sever run 之后 返回的东西,  context 不是字符串, 无需转换
  if (typeof todo_str !== 'string') return todo_str

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

  const context = py_utils.eval(todo_str, globals_dict)
  // console.log(action_info.context, env.context, context)
  return context
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
