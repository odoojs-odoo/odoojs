import py_utils from './py_utils'

import { is_node } from './utils'
import { is_virtual_id } from './utils'
import { parseTime } from './utils'

// eslint-disable-next-line no-unused-vars
const deep_copy = node => {
  return JSON.parse(JSON.stringify(node))
}

const check_is_rename = ftype => {
  return ['many2one', 'selection'].includes(ftype)
}

class ViewModelBase {
  constructor(payload = {}) {
    const { view, Model } = payload
    this._view = view
    this._Model = Model
  }

  get Model() {
    return this._Model
  }

  get view() {
    return this._view
  }

  get fields() {
    return this.view.view_info.fields
  }

  get env() {
    return this.view.env
  }

  get context() {
    return this.view.context
  }

  get view_columns() {
    // console.log(this.view)
    const columns = (this.view.view_node.children || []).map(item => {
      const fname = item.attrs.name
      const title = item.attrs.string
      return { key: fname, title, node: item }
    })

    return columns.map(item => {
      const fname = item.key
      const title = item.title
      const meta = this.fields[fname] || {}
      // const key = check_is_rename(meta.type) ? `${fname}__name` : fname
      const key = fname
      const nitem = { ...item, key, title, meta }

      if (meta.type === 'boolean') {
        nitem.render = (h, { row, column }) => {
          const true_label = column.true_label || '是'
          const false_label = column.false_label || '否'
          const val = row[column.key] ? true_label : false_label
          return h('span', {}, val)
        }
      }

      return nitem
    })
  }

  with_context(context) {
    // 这个函数 仅仅 修改 Model 的 context, 本身的 context 不变
    const Model = this.Model.with_context({ ...this.context, ...context })
    const view = this.view
    return new this.constructor({ view, Model })
  }

  get view_title() {
    const title = this.view.view_node.attrs.string
    return title
  }

  hide_create() {
    return this.view.hide_create()
  }

  hide_edit() {
    return this.view.hide_edit()
  }
}

const PAGE_SIZE = 10

export class ListViewModel extends ViewModelBase {
  constructor(payload = {}) {
    super(payload)
    this._records = undefined

    this.domain = this._get_list_metadata()
    this.order = undefined
    this.offset = 0
    this.limit = PAGE_SIZE
  }

  get records() {
    return this._records
  }

  get values_list() {
    // 给页面显示用的 数据
    return this.records ? this.records.values_list : []
  }

  _get_list_metadata() {
    const action = this.view.action

    // TBD 需要 active_id, user.id, uid
    // odoo 源码中搜索 <field name="domain">[(
    //
    // const domain1 = action.domain
    //   ? this.env.eval_safe(action.domain, {}, true)
    //   : []

    const domain = action.domain
      ? py_utils.eval(action.domain, this.env.context)
      : []
    // console.log('xxxx,', action.domain, domain1)
    return [...domain]
  }

  get total_length() {
    return this.records ? this.records.total_length : 0
  }

  get ids() {
    return this.records ? this.records.ids : []
  }

  get page_count() {
    return Math.ceil(this.total_length / this.limit)
  }

  get page_number() {
    return this.page_current + 1
  }

  get page_current() {
    return this.offset / this.limit
  }

  set page_current(value) {
    this.offset = value * this.limit
  }

  get view_columns() {
    const cols = super.view_columns

    const cols2 = cols.map(item => {
      const meta = item.meta
      const fname = item.key
      const key = check_is_rename(meta.type) ? `${fname}__name` : fname

      return { ...item, key }
    })

    return cols2
  }

  async pageFirst() {
    this.page_current = 0
    return this._page_browse()
  }

  async pageLast() {
    const page = this.page_count > 0 ? this.page_count - 1 : 0
    this.page_current = page
    return this._page_browse()
  }

  async pagePrev(/*step = 1*/) {
    const page = this.page_current
    if (page <= 0) {
      return this.pageLast()
    }

    this.page_current = page - 1
    return this._page_browse()
  }

  async pageNext(/*step = 1*/) {
    const page = this.page_current
    if (page + 1 >= this.page_count) {
      return this.pageFirst()
    }

    this.page_current = page + 1
    return this._page_browse()
  }

  async pageGoto(page2 = 1) {
    if (this.page_count <= 0) {
      this.page_current = 0
    } else {
      const page = page2 - 1
      if (page <= 0) {
        this.page_current = 0
      } else if (page >= this.page_count) {
        this.page_current = this.page_count - 1
      } else {
        this.page_current = page
      }
    }

    return this._page_browse()
  }

  async _page_browse() {
    const domain = this.domain
    const limit = this.limit
    const order = this.order
    const offset = this.offset

    const payload = { domain, offset, limit, order }
    return await this.search_browse(payload)
  }

  async search_browse(payload) {
    const fields = this.fields
    const res = await this.Model.search_browse({ ...payload, fields })
    this._records = res
    return this.values_list
  }
}

class ViewModelBase2 extends ViewModelBase {
  // treemode 和 formmode 共享

  constructor(payload = {}) {
    super(payload)
    this._records = undefined
    // const { from_model } = payload
    // this._from_model = from_model
  }

  // ?
  // get from_model() {
  //   return this._from_model
  // }

  get records() {
    return this._records
  }

  set_records(records) {
    this._records = records
  }

  get values_list() {
    // 给页面显示用的 数据
    return this.records ? this.records.values_list : []
  }

  get_values_onchange({ row_id, for_parent }) {
    return this.records.get_values_onchange(row_id, for_parent)
  }

  get_context({ node, row_id }) {
    const context_str = node.attrs.context
    const context3 = context_str ? this.eval_safe(context_str, { row_id }) : {}
    const context = { ...this.env.odoo.env.context, ...context3 }
    return context
  }

  eval_safe(value_str, { row_id }) {
    /*
  // #  使用

  // # 在多公司时, 用户可能 用 allowed_company_ids 中的一个
  // # 允许 用户 在前端 自己在 allowed_company_ids 中 选择 默认的公司
  // # 该选择 需要 存储在 本地 config 中

  // #  全部 odoo 只有这4个 模型 在获取 fields_get时, 需要提供 globals_dict, 设置 domain
  // #  其余的只是需要 company_id
  // #  --- res.partner
  // #  <-str---> state_id [('country_id', '=?', country_id)]

  // #  --- sale.order.line
  // #  <-str---> product_uom [('category_id', '=', product_uom_category_id)]

  // #  --- purchase.order.line
  // #  <-str---> product_uom [('category_id', '=', product_uom_category_id)]

  // #  --- stock.move
  // #  <-str---> product_uom [('category_id', '=', product_uom_category_id)]
  */

    const _get_company_id = () => {
      const session_info = this.env.odoo.session_info
      // # company_id = session_info['company_id']
      const user_companies = session_info.user_companies
      const current_company = user_companies.current_company[0]
      // # allowed_companies = user_companies['allowed_companies']
      // # allowed_company_ids = [com[0] for com in allowed_companies]
      return current_company
    }

    const _get_values_for_domain = () => {
      const values = this.get_values_onchange({ row_id })

      if (!values.company_id) {
        values.company_id = _get_company_id()
      }

      const from_model = this.records && this.records.from_model
      if (from_model) {
        const parent_values = from_model.values_modifiers
        values.parent = parent_values
      }

      return values
    }

    const domain = value_str || false

    if (domain && typeof domain === 'string') {
      const values = _get_values_for_domain()

      const globals_dict = {
        res_model_id: this.Model._model_id,
        // allowed_company_ids: this.env.odoo.session.allowed_company_ids,
        context: this.env.context,
        ...values
      }

      if (!is_virtual_id(row_id)) {
        globals_dict.active_id = row_id || false
      }

      // console.log('xxxx, model, eval,', domain, globals_dict)
      const domain2 = py_utils.eval(domain, globals_dict)
      // console.log('xxxx, model, eval,', domain2)
      return domain2
    } else {
      return domain
    }
  }

  get_selection(fname, payload = {}) {
    // console.log('xxxx, base', fname, payload)
    const { query, node, row_id } = payload

    const payload2 = { ...payload, name: query }
    delete payload2.node
    delete payload2.row_id
    delete payload2.query

    const get_domain = () => {
      const domain1 = []
      const domain_str = node.attrs.domain

      const domain2 = domain_str ? this.eval_safe(domain_str, { row_id }) : []
      const args = [...(domain1 || []), ...(domain2 || [])]
      return args
    }

    if (!node) {
      return this.records.get_selection(fname, payload2)
    } else {
      const args = get_domain()
      const context = this.get_context({ node, row_id })
      const kwargs2 = { ...payload2, args, context }
      return this.records.get_selection(fname, kwargs2)
    }
  }

  _get_modifiers(node, attr, values) {
    if (!node.attrs.modifiers) {
      return null
    }

    const modifiers = JSON.parse(node.attrs.modifiers)
    if (modifiers[attr] !== undefined) {
      const result = compute_domain(modifiers[attr], values)

      return result
    } else {
      return null
    }
  }
}

class FormViewModelBase extends ViewModelBase2 {
  constructor(payload = {}) {
    super(payload)
    this._subviewmodels = {}
    this._select_options = {}
  }

  get subviewmodels() {
    return this._subviewmodels
  }

  get select_options() {
    return this._select_options
  }

  get id() {
    return this.records ? this.records.id : null
  }

  get values() {
    // 给页面显示用的 数据
    return this.records ? this.records.values : {}
  }

  get values_onchange() {
    return this.records ? this.records.values_onchange : {}
  }

  get values_modifiers() {
    return this.records ? this.records.values_modifiers : {}
  }

  async read(ids) {
    // 读取数据, id 是页面送过来的,
    const one = await this.Model.browse(ids, { fields: this.fields })
    this._records = one
    return this.values
  }

  _get_subaction(fname, { context, node }) {
    const Action = this.view.action.constructor
    const env = this.env.copy(context)
    const subaction = Action.load_sync(env, {
      from_view: { viewmodel: this, field: fname, node }
    })
    return subaction
  }

  _get_subviewmodel(fname, { node, context }) {
    // console.log('get_subviewmodel 1', fname, node, context)

    const get_mode = node => {
      const mode1 = node.attrs.mode || 'tree'
      const mode = mode1.includes('tree')
        ? 'tree'
        : mode1.includes('kanban')
        ? 'kanban'
        : 'tree'

      return mode
    }

    const subaction = this._get_subaction(fname, { context, node })
    const mode = get_mode(node)
    const view_type = `${mode}view`

    // console.log('get_subviewmodel 2', fname, mode, view_type)

    const subviewmodel = subaction[view_type].model
    return subviewmodel
  }

  get_subviewmodel(fname, { node }) {
    // console.log('get_subviewmodel', fname, node.fullName)

    const sub_name = `${node.fullName},${fname}`

    const sub = this.subviewmodels[sub_name]
    if (sub) {
      return sub
    }
    const context = this.get_context({ node, row_id: this.id })
    const subviewmodel = this._get_subviewmodel(fname, { node, context })
    this.subviewmodels[sub_name] = subviewmodel
    return subviewmodel
  }

  async relation_browse(fname, kwargs = {}) {
    const { node } = kwargs
    if (!node) {
      // m2m 不需要 node
      await this.records.relation_browse(fname)
      return this.values
    }

    const context = this.get_context({ node, row_id: this.id })

    const subviewmodel = this._get_subviewmodel(fname, { node, context })
    const fields = subviewmodel.fields

    // console.log([subviewmodel])

    const res = await this.records.relation_browse(fname, {
      fields,
      row_id: this.id,
      context
    })

    subviewmodel.set_records(res)

    return this.values
  }

  get_selection(fname, payload) {
    // console.log('xxxx, form', fname, payload)
    return super.get_selection(fname, { ...payload, row_id: this.records.id })
  }

  async onchange(fname, value, text) {
    const field_onchange = this.view.field_onchange
    if (!fname) {
      const one = await this.Model.new_and_onchange({
        fields: this.fields,
        field_onchange
      })
      this._records = one
      return this.values
    } else {
      const args = [fname, value, { text, field_onchange }]
      const res = await this.records.set_and_onchange(...args)
      return res
    }
  }

  async commit() {
    return await this.records.commit()
  }

  async unlink() {
    // TBD  检查 删除异常
    const res = await this.Model.unlink(this.id)
    if (res) {
      this._records = undefined
    }
    return res
  }

  async _button_clicked_action(action_info) {
    const Action = this.view.action.constructor
    const env = this.env.copy({ ...action_info.context })
    const action = await Action.load_by_info(env, action_info)
    return action
  }

  async init_selection() {
    const nodes = this.node_selection
    console.log(nodes)

    for (const fld of nodes) {
      const options = await this.get_selection(fld.name, {
        query: '',
        node: fld.node,
        limit: 0
      })

      console.log(fld.name, options)

      this._select_options = {
        ...this._select_options,
        [fld.name]: options
      }
    }
  }

  async button_clicked(type, method) {
    // console.log(type, method)
    if (type === 'object') {
      // console.log(type, method)
      const res = await this.records.constructor.button_execute(method, this.id)

      if (!res) {
        await this.records._after_commit(this.id)
        return
      } else {
        // console.log(type, method, res)
        const action = await this._button_clicked_action(res)
        // console.log(type, method, action)

        const model = action.formview.model
        await model.onchange()
        await model.init_selection()
        return model
      }
    } else if (type === 'action') {
      console.log(type, method)
    } else {
      console.log(type, method)
      throw 'error'
    }
  }

  // 编辑页面的 取消按钮 调用
  rollback() {
    this.records.rollback()
  }
}

class FormViewModel1 extends FormViewModelBase {
  constructor(payload = {}) {
    super(payload)
  }

  get node_selection() {
    const get_selection_widget = node => {
      const invisible = this.get_invisible(node)

      if (node.tagName === 'field' && !invisible) {
        const fname = node.attrs.name
        if (node.attrs.widget === 'selection') {
          return [{ name: fname, node }]
        } else {
          return []
        }
      } else {
        return (node.children || []).reduce((acc, cur) => {
          const child = get_selection_widget(cur)
          acc = [...acc, ...child]
          return acc
        }, [])
      }
    }

    const nodes = get_selection_widget(this.view.view_node)

    console.log(deep_copy(nodes))

    return nodes
  }

  get sheet_one2many_fields() {
    // 页面刷新 自动刷新 所有的 o2m 字段的值

    const get_o2m = node => {
      if (node.tagName === 'field') {
        const fname = node.attrs.name
        const meta = this.fields[fname]
        if (meta.type === 'one2many') {
          const mode1 = node.attrs.mode || 'tree'

          const mode = mode1.includes('tree')
            ? 'tree'
            : mode1.includes('kanban')
            ? 'kanban'
            : 'tree'

          if (meta.views[mode]) {
            return [
              {
                name: fname,
                string: node.attrs.string || meta.string,
                node,
                meta
              }
            ]
          } else {
            return []
          }
        } else {
          return []
        }
      } else {
        return (node.children || []).reduce((acc, cur) => {
          const child = get_o2m(cur)
          acc = [...acc, ...child]
          return acc
        }, [])
      }
    }

    const nodes = get_o2m(this.view.view_node)

    // console.log(deep_copy(nodes))

    return nodes
  }

  get_required(node /*, payload = {} */) {
    if (!is_node(node)) {
      return false
    }

    const required = this._get_modifiers(node, 'required')
    return required
  }

  get_readonly(node /*, payload = {} */) {
    if (!is_node(node)) {
      return true
    }

    const readonly = this._get_modifiers(node, 'readonly')
    return readonly
  }
  _get_modifiers(node, attr) {
    return super._get_modifiers(node, attr, this.values_modifiers)
  }

  get_invisible(node /*, payload = {} */) {
    // console.log('1', node.tagName, node)
    // console.log('2', node.tagName, node)
    // console.log('3', invisible, node.tagName, node)
    // console.log('3', node.tagName, node)
    // console.log('4', node.tagName, node)
    // console.log('5', children, node.tagName, node)

    if (!is_node(node)) {
      return false
    }

    if (node.attrs.invisible) {
      return true
    }

    const invisible = this._get_modifiers(node, 'invisible')

    if (invisible) {
      return invisible
    }

    if ((node.children || []).length === 0) {
      return invisible
    }

    const children = (node.children || []).reduce((acc, cur) => {
      acc = acc && this.get_invisible(cur)
      return acc
    }, true)

    return children
  }
}

export class FormViewModel extends FormViewModel1 {
  // TBD check
  constructor(payload = {}) {
    super(payload)
  }

  get_view_node() {
    console.log(deep_copy(this.view.view_node))
    return this.view.view_node
  }

  avatar_url(field_name) {
    if (this.id) {
      const baseURL = this.env.odoo.baseURL

      const imgUrl = '/web/image'
      const model = this.Model._name
      const res_id = this.id
      const field = field_name
      const now = parseTime(new Date(), '{y}{m}{d}{h}{i}{s}')
      const url = `${baseURL}${imgUrl}?model=${model}&id=${res_id}&field=${field}&unique=${now}`
      // console.log(url)

      return url
    } else {
      return undefined
    }
  }
}

export class TreeViewModel1 extends ViewModelBase2 {
  constructor(payload = {}) {
    super(payload)

    const { view } = payload
    this._from_view = view._from_view
    this._record_edit = undefined
  }

  get from_view() {
    return this._from_view
  }

  get record_edit() {
    return this._record_edit
  }

  get currentrow() {
    // 给页面控制用
    return this.record_edit ? { id: this.record_edit.id } : {}
  }

  get values_edit() {
    if (this.record_edit) {
      return this.record_edit.values
    } else {
      return {}
    }
  }

  set_current(row_id) {
    const rec = this.records.tree_pick(row_id)
    if (rec) {
      this._record_edit = rec
    }
  }

  async relation_browse(fname, { row_id }) {
    // m2m 使用, 查询
    // o2m 使用, 仅仅查询, 不存在后续编辑, 因此不需要 node
    return await this.records.relation_browse(fname, { row_id })
  }

  async onchange_row(row_id, fname, value, text) {
    // 页面调用 更新数据到服务器
    // 一定是 触发 record_edit 的 onchange
    const rec_edit = this.record_edit
    if (rec_edit && rec_edit.id === row_id) {
      const field_onchange = this.view.field_onchange
      await rec_edit.set_and_onchange(fname, value, { text, field_onchange })
    }
  }

  get_selection(fname, payload = {}) {
    console.log('xxxx, tree', fname, payload)
    const { row_id } = payload
    // 页面调用 读取下拉框的options数据
    // 一定是 触发 record_edit 的 get_selection
    // TBD 检查 node 的作用,
    // res.partner 中暂时没有用

    const rec_edit = this.record_edit
    if (rec_edit && rec_edit.id === row_id) {
      // console.log(fname, payload)
      return super.get_selection(fname, payload)
    } else {
      return []
    }
  }

  async new() {
    // 页面调用

    // account.move 模型,
    // new line_ids 时, context 中 有 line_ids, 作用是自动计算借贷
    // 因此 o2m 的 new, 需要实时获取 context
    // 其他 o2m 的 请求 实际上也是需要 实时 计算 context.
    // TBD, 这里 暂时 没这样处理

    // console.log('  o2m new', this)
    const from_view = this.from_view
    const node = from_view.node
    const parent = from_view.viewmodel
    const context = parent.get_context({ node, row_id: parent.id })

    const field_onchange = this.view.field_onchange

    // new 之前 需要先 browse 下, 确保 this.records 不为空
    // 因此 下面的判断时 冗余处理
    if (!this.records) {
      const Model = this.Model.with_context(context)
      this._records = Model.browse([], {
        fields: this.fields,
        from_record: {
          model: from_view.viewmodel.records,
          field: from_view.field
        }
      })
    }

    const one = await this.records.tree_new({
      context,
      field_onchange
    })

    console.log(one)

    this._record_edit = one

    return this._record_edit
  }

  async commit_row(row_id) {
    // 页面调用
    const rec_edit = this.record_edit
    if (!rec_edit) {
      return
    }

    if (rec_edit.id === row_id) {
      await this.records.tree_update(row_id, rec_edit)
    }

    this._record_edit = undefined
  }

  rollback(row_id) {
    if (this.currentrow.id !== row_id) {
      return
    }
    this._record_edit = undefined
  }

  async remove(row_id) {
    // 页面调用

    await this.records.tree_remove(row_id)

    const parent = this._parent_field_object
    if (parent) {
      console.log('remove o2m')
      await parent.remove(row_id)
    }
  }
}

export class TreeViewModel extends TreeViewModel1 {
  constructor(payload = {}) {
    super(payload)
  }

  get view_columns() {
    const cols = super.view_columns

    const cols2 = cols.map(item => {
      const meta = item.meta
      const fname = item.key

      const get_tag = () => {
        const type = meta.type
        if (['monetary', 'float'].includes(type)) {
          return { tag: 'input', type: 'number' }
        } else if (['many2one'].includes(type)) {
          return { tag: 'select' }
        } else if (['many2many'].includes(type)) {
          return { tag: 'select2' }
        }
        return { tag: 'input', type: 'text' }
      }

      const render_info = get_tag()

      const key__name = check_is_rename(meta.type)
        ? `${fname}__name`
        : undefined

      return { ...item, key__name, render_info }
    })

    return cols2
  }

  get_required(row_id, node /*, payload = {} */) {
    if (!is_node(node)) {
      return false
    }

    // TBD 暂时 这样处理, o2m 的 required, 该如何计算, 需要再找例子
    const required = this._get_modifiers(node, 'required', {})
    return required
  }
}

export class KanbanViewModel extends TreeViewModel {
  constructor(payload = {}) {
    super(payload)
  }

  get_invisible(/* node , payload = {} */) {
    return false
  }

  kanban_templates() {
    const view_node = this.view.view_node
    const templates_node = view_node.children.find(
      item => item.tagName === 'templates'
    )
    return templates_node
  }

  kanban_title() {
    const templates_node = this.kanban_templates()
    if (templates_node) {
      return templates_node.children.find(item => item.attrs.name === 'title')
    } else {
      return undefined
    }
  }

  kanban_content() {
    const templates_node = this.kanban_templates()

    // console.log('test kanban', this.view.view_node)
    // console.log('test kanban', templates_node)

    if (templates_node) {
      return templates_node.children.find(item => item.attrs.name === 'content')
    } else {
      return undefined
    }
  }

  kanban_image_url(payload = {}) {
    const { node, row_id } = payload
    const node_field = node.children[0]
    const fname = node_field.attrs.name

    const baseURL = this.env.odoo.baseURL
    const imgUrl = '/web/image'
    const model = this.Model._name
    const res_id = row_id
    const field = fname

    const now = parseTime(new Date(), '{y}{m}{d}{h}{i}{s}')
    const url = `${baseURL}${imgUrl}?model=${model}&id=${res_id}&field=${field}&unique=${now}`
    return url
  }
}

export default { ListViewModel, TreeViewModel, KanbanViewModel, FormViewModel }

const compute_domain = (domain_in, record, debug) => {
  // if (domain_in.length === 7) {
  //   console.log(domain_in, record)
  // }
  if (!Array.isArray(domain_in)) {
    return domain_in
  }
  const domain = [...domain_in]

  const AND = (v1, v2) => {
    // console.log('AND', v1, v2)
    if (debug) {
      return v1 * v2
    } else {
      const val1 = compute_condition(v1)
      const val2 = compute_condition(v2)

      return val1 && val2
    }
  }
  const OR = (v1, v2) => {
    // console.log('OR', v1, v2)
    if (debug) {
      return v1 + v2
    } else {
      const val1 = compute_condition(v1)
      const val2 = compute_condition(v2)
      return val1 || val2
    }
  }
  const NOT = v1 => {
    // console.log('NOT', v1)
    if (debug) {
      return -v1
    } else {
      return !v1
    }
  }

  const OPTIONS = { '&': AND, '|': OR, '!': NOT }

  // let index = 0

  const EQU = (val1, val2) => {
    // console.log('EQU', val1, ',', val2)

    if (!Array.isArray(val1)) {
      return val1 === val2
    }

    if (val1.length === 0 && val2.length === 0) {
      return true
    } else if (val1.length !== val2.length) {
      return false
    }
    //
    throw 'TBD: EQU, array'
  }

  const IN = (val1, val2) => {
    // console.log('IN', val1, ',', val2)
    const ret = val2.includes(val1)
    // console.log('IN', ret)
    return ret
  }

  const compute_condition = condition => {
    if (!Array.isArray(condition)) {
      return condition
    }
    //
    const [field, op, val] = condition
    // console.log('xxxx', field, record[field], op, val)
    const val1 = record[field]
    switch (op) {
      case '=':
      case '==':
        return EQU(val1, val)
      case '!=':
      case '<>':
        // if(field===''){
        //   //
        // }

        return !EQU(val1, val)
      case '<':
        return val1 < val
      case '>':
        return val1 > val
      case '<=':
        return val1 <= val
      case '>=':
        return val1 >= val
      case 'in':
        return IN(val1, val)
      case 'not in':
        return !IN(val1, val)
      // case 'like':
      // // return (fieldValue.toLowerCase().indexOf(this._data[2].toLowerCase()) >= 0);
      // case '=like':
      // // var regExp = new RegExp(this._data[2].toLowerCase().replace(/([.\[\]\{\}\+\*])/g, '\\\$1').replace(/%/g, '.*'));
      // // return regExp.test(fieldValue.toLowerCase());
      // case 'ilike':
      // // return (fieldValue.indexOf(this._data[2]) >= 0);
      // case '=ilike':
      // return new RegExp(this._data[2].replace(/%/g, '.*'), 'i').test(fieldValue);
      default:
        throw 'error'
      // throw new Error(_.str.sprintf(
      //     "Domain %s uses an unsupported operator",
      //     this._data
      // ));
      //
    }
  }

  const fn = (domain, op) => {
    // console.log('1st:index:', index, domain, op)
    // index = index + 1
    if (!domain.length) {
      return [null]
    } else if (op.length === 0 && domain.length === 1) {
      const val = domain[0]
      const val2 = compute_condition(val)
      return [val2]
      // return domain
      // const val = domain[0]
      // if (val === true || val === false) {
      //   console.log('all ret,', domain)
      //   return domain
      // }
    }

    const one = domain.shift()
    if (['&', '|', '!'].includes(one)) {
      // console.log('2.1, &|!:', domain, op, one)
      op.push(one)
      const ret = fn(domain, op)
      // console.log('2.1,&|!,1:', domain, op)
      // console.log('2.1,&|!,ok:', ret)
      return ret
    } else {
      // console.log('2.2:', domain, op, one)
      if (op.length === 0) {
        // op not(!&|)  and domain >1
        // console.log('4 default &', domain, op, one)
        op.push('&')
        op.push(one)
        // console.log('4 default & 1', domain, op)
        const dm2 = fn(domain, op)
        // console.log('4 default & ok', dm2, op)
        return dm2
        // return fn(dm2, op)
      } else {
        // console.log('3 comp:', domain, op, one)
        const comp = op[op.length - 1]
        if (comp === '!') {
          // console.log('3.1 !,:', domain, op, one)
          op.pop()
          const ret = NOT(one)
          // console.log('3.1 !,ok:', [ret, ...domain], op)
          return fn([ret, ...domain], op)
        } else if (comp === '&' || comp === '|') {
          op.push(one)
          return fn(domain, op)
        } else {
          // console.log('3.2 &|,:', domain, op, one)
          const v1 = op.pop()
          const c0 = op.pop()
          const ret = OPTIONS[c0](v1, one)
          // console.log('3.2 &|,ok:', [ret, ...domain], op)
          return fn([ret, ...domain], op)
        }
      }
    }
  }

  const ret = fn(domain, [])

  const ret2 = ret[0]

  // console.log('all,ok', ret2)

  return ret2
}
