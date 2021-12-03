import xml2json from './xml2json.js'
import py_utils from './py_utils'

import { is_node, is_virtual_id, sleep } from './utils'
import AllAddons from './all_addons'

import tools from './tools'

import pivot from '@/odoorpc/pivot'

// eslint-disable-next-line no-unused-vars
const cp = item => JSON.parse(JSON.stringify(item))

const PAGE_SIZE = 10

const get_attrs = node_attr => {
  const list2 = ['class']
  return Object.keys(node_attr).reduce((acc, cur) => {
    if (!list2.includes(cur)) acc[cur] = node_attr[cur]
    return acc
  }, {})
}

const _feilds_buttons_spec = node_in => {
  const result = { field: {}, button: {} }

  const process = node => {
    if (node.tagName === 'field') {
      const name2 = node.attrs.name || '_noname'
      if (!result.field[name2]) result.field[name2] = []
      result.field[name2].push(node)
    } else if (node.tagName === 'button') {
      const btype = node.attrs.type || '_notype'
      const bname = node.attrs.name || '_noname'
      const name2 = `${btype}.${bname}`
      if (!result.button[name2]) result.button[name2] = []
      result.button[name2].push(node)
    } else {
      if (node.children && Array.isArray(node.children)) {
        node.children.forEach(child => {
          if (is_node(child)) process(child)
        })
      }
    }
  }

  process(node_in)

  const buttons_node = result.button
  const fields_node = result.field

  return { buttons_node, fields_node }
}

const _merge_relations = (dest0 = {}, src0 = {}) => {
  const _merge = (dest = {}, src = {}) => {
    const fields = { ...dest, ...src }
    return Object.keys(fields).reduce((acc, fld) => {
      const dest1 = dest[fld]
      const src1 = src[fld]
      if (dest1 && src1) {
        const relations = _merge(dest1.relations, src1.relations)
        acc[fld] = { ...src1, ...dest1, relations }
      } else {
        acc[fld] = dest1 || src1
      }
      return acc
    }, {})
  }

  return _merge(dest0, src0)
}

export const _onchange_spec = view_info => {
  const result = {}

  const process = (node, info, prefix) => {
    if (node.tagName === 'field') {
      const name = node.attrs.name
      const names_list = prefix ? [prefix, name] : [name]
      const names = names_list.join('.')
      if (!Object.keys(result).includes(names))
        result[names] = node.attrs.on_change || ''

      Object.values((info.fields[name] || {}).views || {}).forEach(subinfo =>
        process(xml2json.toJSON(subinfo.arch), subinfo, names)
      )
    } else {
      const children = node.children || []
      children.forEach(child => process(child, info, prefix))
    }
  }

  if (view_info.arch) {
    const root = xml2json.toJSON(view_info.arch)
    process(root, view_info, '')
  }

  const res2 = { ...result }
  delete res2.id

  return res2
}

class ViewBase {
  constructor(payload = {}) {
    const { model, view_type } = payload
    this._model = model
    this._view_type = view_type
    this._view_node = undefined
    this._field_onchange = undefined
  }

  get view_type() {
    return this._view_type
  }

  get view_info() {
    return this.action.views[this.view_type]
  }

  get view_node() {
    if (this._view_node !== undefined) return this._view_node
    if (!this.view_info) return {}

    const _get_view_node2 = () => {
      const view_info = this.view_info
      const view_type = this.view_type

      const arch1 = view_info.arch
      if (!arch1) return {}

      const get_node = () => {
        const node = xml2json.toJSON(arch1)
        if (['list', 'tree'].includes(view_type) && node.tagName === 'tree')
          return {
            ...node,
            children: [
              ...node.children,
              { tagName: 'templates', attrs: {}, class: '', children: [] }
            ]
          }
        else return node
      }

      const node = get_node()
      // console.log('view node,', view_info, view_type, node)

      return this._get_view_node(node)
    }

    const view_node = _get_view_node2()
    this._view_node = view_node
    return this._view_node
  }

  // 测试用函数, 其他情况不得使用
  _debug_node_get(node_name) {
    // 仅仅用于测试时, 取 node, 其他情况不得使用
    const { buttons_node, fields_node } = _feilds_buttons_spec(this.view_node)

    const fn = node_name => {
      const len = node_name.split('.').length
      if (len === 1) {
        return fields_node[node_name]
      } else if (len >= 2) {
        return buttons_node[node_name]
      } else {
        return undefined
      }
    }

    const node_list = fn(node_name) || [undefined]
    // TBD 如果 超过1个, 该如何取舍?
    const node = node_list[0]
    return node
  }

  _get_view_node(node) {
    const node_form = this._view_node_default_html(node)

    // const node_form2 = deep_copy(node_form)
    // console.log('node_form', node_form2)

    return { ...node_form }
  }

  _view_node_default_html(node, parent) {
    if (typeof node !== 'object') return node
    if (Array.isArray(node)) return node
    if (!node) return node

    if (node.tagName === 'field') return this._view_node_field(node, parent)

    if (node.tagName === 'label') return this._view_node_label(node, parent)

    if (node.tagName === 'templates') {
      const node3 = this._get_templates(node, parent)
      const fullName = parent ? `${parent}.templates` : 'templates'
      if (node3)
        return {
          ...node3,
          children: node3.children.map(item =>
            this._view_node_default_html(item, fullName)
          )
        }
      else
        return {
          fullName,
          tagName: 'templates_no_templates',
          attrs: {},
          class: '',
          children: []
        }
    }

    const fullName = parent ? `${parent}.${node.tagName}` : node.tagName

    return {
      fullName,
      tagName: node.tagName,
      attrs: { ...get_attrs(node.attrs) },
      class: node.attrs.class,
      children:
        !node.isParent && node.content
          ? [node.content]
          : (node.children || []).map(item =>
              this._view_node_default_html(item, fullName)
            )
    }
  }

  _view_node_label(node, parent) {
    let string = ''
    if (node.attrs.for) {
      const meta = this.view_info.fields[node.attrs.for] || {}
      string = node.attrs.string || meta.string || ''
    } else {
      //
    }

    const fullName = parent ? `${parent}.${node.tagName}` : node.tagName

    return {
      fullName,
      tagName: node.tagName,
      attrs: {
        ...get_attrs(node.attrs),
        string
      },
      class: node.attrs.class,
      children:
        !node.isParent && node.content
          ? [node.content]
          : (node.children || []).map(item =>
              this._view_node_default_html(item, fullName)
            )
    }
  }

  _view_node_field(node, parent) {
    const meta = this.view_info.fields[node.attrs.name]
    const string = (meta && meta.string) || ''
    const fullName = parent ? `${parent}.${node.tagName}` : node.tagName

    return {
      fullName,
      tagName: node.tagName,
      attrs: {
        ...get_attrs(node.attrs),
        string: node.attrs.string || string
      },
      class: node.attrs.class
    }
  }

  _get_templates(node, parent) {
    // console.log('_get_templates1', this, node, parent)
    // console.log('_get_templates', this.action.xml_id, this.view_type, parent)
    // console.log('_get_templates', AllAddons)

    const get_tmpl = () => {
      const paths = this.model.action.xml_id.split(',')

      const xml_id = paths[0]
      const rest = paths
        .slice(1, paths.length)
        .reduce((acc, cur) => [...acc, ...cur.split('.')], [])

      const action_info = AllAddons[xml_id] || { fields_views: {} }
      const action_views = action_info.fields_views

      if (!action_views) return undefined

      const field_views = rest.reduce((acc, cur) => {
        return acc[cur] || {}
      }, action_views)

      const kanban_node =
        parent === 'tree'
          ? field_views.list || field_views.tree || {}
          : field_views[parent] || {}

      const templates = kanban_node.templates
      return templates ? xml2json.toJSON(templates) : undefined
    }

    const tmpl = get_tmpl()

    // console.log('_get_templates', tmpl)

    return tmpl || undefined
  }

  _hide_create_or_edit(attr) {
    // console.log(JSON.parse(JSON.stringify(this.view_node)))
    const val_str = this.view_node.attrs[attr]
    // 只是 简单的  字符串, true or false
    // 都是 js 语法的
    return val_str ? !eval(val_str) : false
  }
}

class View extends ViewBase {
  constructor(payload = {}) {
    super(payload)
  }

  hide_button() {
    return {
      create: this._hide_create_or_edit('create'),
      edit: this._hide_create_or_edit('edit'),
      delete: this._hide_create_or_edit('delete')
    }
  }

  get model() {
    return this._model
  }

  get model_from() {
    return this.action.model_from
  }

  get Model() {
    return this.model.Model
  }

  get action() {
    return this.model.action
  }

  get fields() {
    return this.view_info ? this.view_info.fields : undefined
  }

  get env() {
    return this.model.env
  }

  get context() {
    return this.env.context
  }

  async _action_call(action_id, payload = {}) {
    const { active_context: act, additional_context: add = {} } = payload
    const env = this.env.copy({ ...this.env.context, ...act, ...add })
    const res = await this.action.constructor.action_load(
      env,
      action_id,
      payload
    )
    return res
  }
}

export class TreeViewBase extends View {
  constructor(payload = {}) {
    super(payload)

    this.domain = this._get_list_metadata()

    this._records = undefined
  }

  _get_list_metadata() {
    const action = this.action

    // TBD 需要 active_id, user.id, uid
    // odoo 源码中搜索 <field name="domain">[(
    //

    const globals_dict = { uid: this.env.uid, context: this.env.context }
    const domain =
      action && action.domain
        ? Array.isArray(action.domain)
          ? action.domain
          : py_utils.eval(action.domain, globals_dict)
        : []

    return [...domain]
  }

  // 过滤按钮 需要这个函数
  get pagination() {
    return {}
  }

  get records() {
    return this._records
  }

  set_records(records) {
    this._records = records
  }

  get values_list() {
    return this.records ? this.records.values_list : []
  }
}

export class ListViewBase extends TreeViewBase {
  constructor(payload = {}) {
    super(payload)

    // this.order = 'id desc'
    this.order = undefined
    this.offset = 0
    this.limit = PAGE_SIZE

    this.loadmore_quque = []
  }

  set_limit(value) {
    this.limit = value
  }

  get ids() {
    return this.records ? this.records.ids : []
  }

  get pagination() {
    return {
      current: this.page_current,
      total: this.total_length,
      pageSize: this.limit
    }
  }

  get total_length() {
    return this.records ? this.records.total_length : 0
  }

  get page_count() {
    return Math.ceil(this.total_length / this.limit)
  }

  get page_current() {
    return this.offset / this.limit
  }

  set page_current(value) {
    this.offset = value * this.limit
  }

  async pageGoto(page2 = 1) {
    if (this.page_count <= 0) this.page_current = 0
    else {
      const page = page2 - 1
      if (page <= 0) this.page_current = 0
      else if (page >= this.page_count) this.page_current = this.page_count - 1
      else this.page_current = page
    }

    return this._page_browse()
  }

  async _page_browse() {
    const domain1 = this.domain
    const limit = this.limit
    const order = this.order
    const offset = this.offset

    // console.log(domain1)
    // console.log(this.model.views.search.search_domain)
    const domain2 = this.model.views.search.search_domain
    // console.log('domain,', domain2)
    const domain = [...domain1, ...domain2]
    // const domain = [...domain1]

    const payload = { domain, offset, limit, order }
    return await this.search_browse(payload)
  }

  async search_browse(payload) {
    const fields = this.fields
    const res = await this.Model.search_browse({ ...payload, fields })
    this._records = res
    return this.values_list
  }

  async export_xlsx_all() {
    const model = this.action.res_model
    const fields = this.view_node.children
      .filter(
        item =>
          !item.attrs.invisible &&
          item.attrs.optional !== 'hide' &&
          item.tagName === 'field'
      )
      .map(item => {
        const { name, string } = item.attrs
        const { store, type, string: string2 } = this.fields[name]
        return { name, label: string || string2, store, type }
      })

    const ids = false
    const domain = this.domain
    const groupby = []
    const context = this.env.context
    const import_compat = false
    const data = { model, fields, ids, domain, groupby, context, import_compat }

    return this.env.odoo.export_xlsx(data)
  }

  async action_call(action, ids) {
    const active_model = this.action.res_model
    const active_id = ids[0]
    const active_ids = ids
    const active_context2 = { active_model, active_id, active_ids }
    const active_domain = this.domain
    const active_context = { ...active_context2, active_domain }
    const res = await this._list_action_call(action.id, { active_context })
    if (res) return res
    await this._page_browse()
    return
  }

  async _list_action_call(action_id, kwargs) {
    const action = await this._action_call(action_id, { ...kwargs })

    if (!action) return action
    if (action.type === 'ir.actions.server') {
      const res = await this.records.call_action_run(action.id)
      if (!res) return
      // TBD: 是否需要 active_context 和 additional_context?
      return this._action_call(null, { action_info: res })
    }

    return action
  }

  async unlink(payload = {}) {
    const { ids = [] } = payload
    if (!ids.length) return true

    const res = await this.Model.unlink(ids)
    await this.pageGoto()
    return res
  }

  async unarchive(ids) {
    // const res =
    await this.Model.action_unarchive(ids)
    await this.pageGoto()
  }

  async archive(ids) {
    // const res =
    await this.Model.action_archive(ids)
    await this.pageGoto()
  }

  // to check. not used.

  get page_number() {
    return this.page_current + 1
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
    if (page <= 0) return this.pageLast()

    this.page_current = page - 1
    return this._page_browse()
  }

  async pageNext(/*step = 1*/) {
    const page = this.page_current
    if (page + 1 >= this.page_count) return this.pageFirst()

    this.page_current = page + 1
    return this._page_browse()
  }

  async _pageLoadMore() {
    if (this.loadmore_quque.length === 1) {
      if (!this.records) {
        // console.log('viewmodel pageLoadMore, new')
        const records = await this.Model.create_record({
          fields: this.fields
        })
        this._records = records
        records.domain = this.domain
        // records.domain = [['name', 'like', '中']]

        records.order = this.order
        records.limit = this.limit
      } else {
        // console.log('viewmodel pageLoadMore, next')
      }
      const res1 = await this.records.pageLoadMore()
      // console.log(
      //   'viewmodel, pageLoadMore return',
      //   res1,
      //   this.records.ids.length
      // )

      const quque = this.loadmore_quque.shift()
      quque.callback({
        call_id: quque.call_id,
        call_finished: this.loadmore_quque.length ? false : true,
        ...res1
      })

      const res = await this._pageLoadMore()
      return res
    } else {
      return undefined
    }
  }

  async pageLoadMore(payload) {
    // const call_id = Math.floor(Math.random() * 1000000000 + 1)
    this.loadmore_quque.push(payload)
    // console.log(
    //   'viewmodel, pageLoadMore',
    //   this.loadmore_quque.map(item => item.call_id)
    // )
    const res = await this._pageLoadMore()
    return res
  }

  // to check. not used
}

export class FormView extends View {
  constructor(payload = {}) {
    super(payload)

    this._record_one = undefined
    this._submodels = {}
    this._relations = {}
  }

  get record_one() {
    return this._record_one
  }

  set_record_one(record_one) {
    this._record_one = record_one
  }

  get relations() {
    return this._relations
  }

  get submodels() {
    return this._submodels
  }

  get id() {
    return this.record_one ? this.record_one.id : null
  }

  get values() {
    return this.record_one ? this.record_one.values : {}
  }

  get values_modifiers() {
    return this.record_one ? this.record_one.values_modifiers : {}
  }

  get fields() {
    if (!this.model_from) return this.view_info.fields

    const views = this.action.views
    const fields_kanban = (views.kanban || { fields: {} }).fields
    const fields_tree = (views.tree || { fields: {} }).fields
    const fields_form = (views.form || { fields: {} }).fields
    const fields = { ...fields_kanban, ...fields_tree, ...fields_form }
    return fields
  }

  get field_onchange() {
    if (!this._field_onchange) {
      if (!this.view_info) return {}
      this._field_onchange = _onchange_spec(this.view_info)
    }

    if (!this.model_from) return this._field_onchange

    const views = this.action.views

    const spec_kb = views.kanban ? _onchange_spec(views.kanban) : {}
    const spec_tree = views.tree ? _onchange_spec(views.tree) : {}
    const spec_form = views.form ? _onchange_spec(views.form) : {}

    const spec = { ...spec_kb, ...spec_tree, ...spec_form }
    const field_onchange = Object.keys(spec).reduce((acc, cur) => {
      acc[cur] = spec_kb[cur] || spec_tree[cur] || spec_form[cur] ? '1' : ''
      return acc
    }, {})

    return field_onchange
  }

  get data_info() {
    // relation 是  o2m 字段 pick one 之后 的 当前记录, 用于刷新 o2m 的 form view

    const relation = Object.keys(this.submodels).reduce((acc, fld) => {
      if (this.submodels[fld].views.form.record_one)
        acc[fld] = this.submodels[fld].data_info
      return acc
    }, {})

    return {
      context: this.env.context,
      dataDict: this.values,
      values_modifiers: this.values_modifiers,
      relation
    }
  }

  async new_and_onchange(kwargs = {}) {
    // console.log('new_and_onchange1,  ', this, kwargs)
    await this.action.load_view_info('form')
    this._record_one = undefined
    const field_onchange = this.field_onchange
    const fields = this.fields
    const kwargs2 = { ...kwargs, fields, field_onchange }
    const one = await this.Model.new_and_onchange(kwargs2)
    this._record_one = one

    // console.log('new_and_onchange2,  ', cp(this.relations))

    for (const field in this.relations) {
      const rel = this.relations[field]
      // console.log('new_and_onchange, call,relation_browse ')
      await this.relation_browse({ ...rel, field })
    }

    return this.values
  }

  async read(ids, kwargs = {}) {
    await this.action.load_view_info('form')

    const field_onchange = this.field_onchange
    const fields = this.fields

    const kwargs2 = { fields, field_onchange, ...kwargs }

    const one = await this.Model.browse(ids, kwargs2)
    this._record_one = one

    for (const field in this.relations) {
      const rel = this.relations[field]
      console.log('read, call,relation_browse ')
      await this.relation_browse({ ...rel, field })
    }

    return this.values
  }

  async copy() {
    const one = await this.record_one.copy()
    this._record_one = one
    return this.values
  }

  async onchange(payload = {}) {
    // console.log('onchange', this, payload)
    const { field, value, text, relation = [] } = payload

    if (!relation.length) return this._onchange({ field, value, text })

    const one = relation[0]
    const next = relation.slice(1, relation.length)
    const sub = this.submodels[one.field]
    return sub.onchange({ ...payload, relation: next })
  }

  async _onchange(payload) {
    // console.log('_onchange', payload)
    const { field, value, text } = payload
    if (!field) {
      await this.new_and_onchange(payload)
      return this.values
    } else {
      const field_onchange = this.field_onchange
      const args = [field, value, { text, field_onchange }]
      const res = await this.record_one.set_and_onchange(...args)
      return res
    }
  }

  async rollback(payload = {}) {
    // 编辑页面的 取消按钮 调用
    const { relation = [] } = payload
    if (!relation.length) {
      this.record_one.rollback()

      console.log(this.values)

      await sleep(10)
    } else {
      const one = relation[0]
      const next = relation.slice(1, relation.length)
      const sub = this.submodels[one.field]
      return sub.rollback({ ...payload, relation: next })
    }
  }

  async commit(payload = {}) {
    // console.log('commit,', this, payload)
    const { relation = [] } = payload
    if (!relation.length) return await this.record_one.commit()

    const one = relation[0]
    const next = relation.slice(1, relation.length)
    return this._commit_tree_update(one, { ...payload, relation: next })
  }

  async _commit_tree_update({ field, row_id }, payload = {}) {
    const subModel = this.submodels[field]
    const subTree = subModel.views.tree
    const subForm = subModel.views.form

    const { relation = [] } = payload
    if (relation.length) {
      const one = relation[0]
      const next = relation.slice(1, relation.length)
      return subTree._commit_tree_update(one, { ...payload, relation: next })
    } else {
      // TBD .  new then new sub 时, subTree.records 还是  空的
      //
      await subTree.records.tree_update(row_id, subForm.record_one, {})
      subForm._record_one = undefined
    }
  }

  async unlink(payload = {}) {
    const { relation = [] } = payload
    if (!relation.length) return await this._unlink()
    const one = relation[0]
    const next = relation.slice(1, relation.length)
    return this._unlink_tree_remove(one, { ...payload, relation: next })
  }

  async _unlink() {
    // TBD  检查 删除异常
    const res = await this.Model.unlink(this.id)
    if (res) this._record_one = undefined
    return res
  }

  async _unlink_tree_remove({ field, row_id }, payload = {}) {
    // const sub = this.submodels[field]

    const subModel = this.submodels[field]
    const subTree = subModel.views.tree

    const { relation = [] } = payload
    if (relation.length) {
      const one = relation[0]
      const next = relation.slice(1, relation.length)
      return subTree._unlink_tree_remove(one, { ...payload, relation: next })
    } else {
      await subTree.records.tree_remove(row_id)
      // sub._record_one = undefined
    }
  }

  _get_selection(payload = {}) {
    const { field, query, node } = payload
    const meta = this.fields[field] || {}
    if (meta.type === 'selection') {
      return meta.selection || []
    }

    const payload2 = { ...payload, name: query }
    delete payload2.node

    delete payload2.query

    if (!node) return this.record_one.get_selection(field, payload2)
    else {
      const row_id = this.record_one.id
      const get_domain = () => {
        const domain1 = []
        const domain_str = node.attrs.domain

        const domain2 = domain_str ? this.eval_safe(domain_str, { row_id }) : []
        const args = [...(domain1 || []), ...(domain2 || [])]
        return args
      }

      const args = get_domain()
      const context = this.get_context({ node, row_id })
      const kwargs2 = { ...payload2, args, context }
      return this.record_one.get_selection(field, kwargs2)
    }
  }

  get_selection(payload) {
    const { relation = [] } = payload
    if (!relation.length) return this._get_selection(payload)
    const one = relation[0]
    const next = relation.slice(1, relation.length)
    console.log('select, ', payload, relation, one, next)
    const sub = this.submodels[one.field]
    console.log('select2, ', this.submodels, one.field, sub)
    return sub.get_selection({ ...payload, relation: next })
  }

  _sub_action(field, { node }) {
    const xml_id = `${this.action.xml_id},form.${field}`
    const meta = this.fields[field]

    const action_info = {
      xml_id,
      name: node.attrs.string,
      view_mode: node.attrs.mode || 'tree',
      res_model: meta.relation,
      context: node.attrs.context
    }

    const views = meta.views
    const fields = {}
    const model_from = { model: this.model, field, node, field_meta: meta }

    const context = this.get_context({ node })
    const env = this.env.copy(context)
    const payload = { action_info, fields, views, model_from }
    const sub_action = new this.action.constructor(env, { ...payload })

    return sub_action
  }

  relation_model(kwargs = {}) {
    const { field, node, view_type, relations } = kwargs
    this._relations = _merge_relations(this.relations, { [field]: kwargs })

    const set_relations = (subModel, rel) => {
      const new_rel = _merge_relations(subModel.views.form.relations, rel)
      subModel.views.form._relations = new_rel
    }

    // 调试 TBD: acc move.line_id.tax_id ?

    if (!(field in this.submodels)) {
      const sub_action = this._sub_action(field, { node })
      const sub_model = sub_action.model
      if (view_type) sub_model._view_type = view_type
      this.submodels[field] = sub_model
      const relations2 = this.relations[field].relations
      set_relations(sub_model, relations2)
    }

    if (relations) {
      const sub_model = this.submodels[field]
      set_relations(sub_model, relations)
    }

    return this.submodels[field]
  }

  async relation_to_browse(kwargs = {}) {
    console.log(' relation_to_browse', this, kwargs.field, kwargs)
    const { field, relation_field } = kwargs

    this._relations = _merge_relations(this.relations, { [field]: kwargs })

    if (!this._record_one) return

    const kwargs2 = this.relations[field]
    const sub_model = this.relation_model({ ...kwargs2, field })

    if (relation_field) {
      return sub_model.relation_to_browse(
        sub_model.views.form.relations[relation_field]
      )
    }

    // const subTreeView = sub_model.views[sub_model.view_type]

    // if (!subTreeView.records)
    await this.relation_browse(kwargs)
  }

  async relation_browse(kwargs = {}) {
    // console.log('relation_browse', kwargs)

    const { field, node } = kwargs
    const context = this.get_context({ node })
    const sub_model = this.relation_model({ ...kwargs, field })
    const subTreeView = sub_model.views[sub_model.view_type]
    const fields = subTreeView.fields
    const kwargs2 = { fields, context }
    const res = await this.record_one.relation_browse(field, kwargs2)

    // console.log('relation_browse2', this)
    subTreeView.set_records(res)
    return sub_model
  }

  async relation_pick_reset(kwargs = {}) {
    console.log('relation_pick_reset', this, kwargs)
    const { field, row_id } = kwargs
    const submodel = this.submodels[field]

    if (row_id) return false

    submodel.views.form._record_one = undefined
    return true
  }

  async relation_pick(kwargs = {}) {
    // console.log('relation pick,', kwargs)
    await this.action.load_view_info('form')
    const { field, row_id } = kwargs
    const submodel = this.submodels[field]

    // console.log('relation pick,', kwargs, submodel)

    const subTreeView = submodel.views[submodel.view_type]
    const subFormView = submodel.views.form
    const from_record = { model: this.record_one, field }

    if (row_id) {
      const is_virtual = is_virtual_id(row_id)
      const ids_to_read = is_virtual ? [] : row_id

      const res = await subFormView.read(ids_to_read, { from_record })

      const old_one = subTreeView.records.tree_pick(row_id)
      subFormView.record_one.update_by_record(old_one)

      return res
    } else {
      return await subFormView.new_and_onchange({ from_record })
    }
  }

  get_context({ node }) {
    const context_str = node.attrs.context
    const context3 = context_str ? this.eval_safe(context_str) : {}
    const context = { ...this.env.odoo.env.context, ...context3 }
    return context
  }

  eval_safe(value_str) {
    // console.log('eval safe', value_str, row_id)
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
      const values = this.record_one.values_onchange

      if (!values.company_id) values.company_id = _get_company_id()

      const from_model = this.record_one && this.record_one.from_model
      if (from_model) values.parent = from_model.values_modifiers

      return values
    }

    const domain = value_str || false

    if (!domain && typeof domain !== 'string') return domain

    const values = _get_values_for_domain()

    const globals_dict = {
      res_model_id: this.Model._model_id,
      // allowed_company_ids: this.env.odoo.session.allowed_company_ids,
      context: this.env.context,
      ...values
    }

    const row_id = this.record_one.id

    if (!is_virtual_id(row_id)) {
      globals_dict.active_id = row_id || false
      globals_dict.id = row_id || false
    }

    // console.log(
    //   'xxxx, model, eval,',
    //   JSON.parse(JSON.stringify(domain)),
    //   JSON.parse(JSON.stringify(globals_dict))
    // )
    const domain2 = py_utils.eval(domain, globals_dict)
    // console.log('xxxx, model, eval,', domain2)
    return domain2
  }

  async _form_action_call(action_id, kwargs) {
    const active_model = this.action.res_model
    const active_id = this.id
    const active_ids = [this.id]
    const active_context = { active_model, active_id, active_ids }
    const action = await this._action_call(action_id, {
      ...kwargs,
      active_context
    })

    if (!action) return action

    if (action.type === 'ir.actions.server') {
      const res = await this.record_one.call_action_run(action.id)
      if (!res) return
      // TBD: 是否需要 active_context 和 additional_context?
      return this._action_call(null, { action_info: res })
    }

    return action
  }

  async _form_button_call(method, kwargs2 = {}) {
    const { additional_context = {}, ...kwargs } = kwargs2
    const res = await this.record_one.call_button(method, {
      ...kwargs,
      context: { ...this.env.context, ...additional_context }
    })
    if (!res) return

    const active_model = this.action.res_model
    const active_id = this.id
    const active_ids = [this.id]
    const active_context = { active_model, active_id, active_ids }

    return this._action_call(null, {
      action_info: { ...res },
      additional_context,
      active_context
    })
  }

  async button_clicked(payload = {}) {
    const { node } = payload
    const { type, name } = node.attrs
    const context_str = node.attrs.context
    const additional_context = context_str ? this.eval_safe(context_str) : {}

    if (type === 'action') {
      return this._form_action_call(name, { additional_context })
    } else if (type === 'object') {
      return this._form_button_call(name, { additional_context })
    } else {
      console.log('btn clicked', type, name)
      throw 'button_clicked, not type'
    }
  }

  async action_call(action) {
    return this._form_action_call(action.id, {})
  }

  async wizard_button_click(payload) {
    console.log(payload)
    // TBD wizard_button_click  携带 自己的 context
    const { node } = payload
    const { type, name } = node.attrs
    if (type === 'object') {
      const res = await this.record_one.wizard_call_button(name)
      if (!res) return
      console.log('wizard call button,', res)
      return res // 返回 ir.actions.act_window_close
      // throw 'wizard call button, return sth, TBD'
    } else {
      console.log('wizard btn clicked', type, name)
      throw 'button_clicked, not object'
    }
  }
}

export class SearchView extends View {
  constructor(payload = {}) {
    super(payload)
    const search_default = this.action.search_default
    this._search_values = { ...search_default }
  }

  get search_values() {
    return this._search_values
  }

  set_search(names, value) {
    const values = { ...this.search_values }

    const info = this._search_items
    const { filters, fields } = info
    console.log('set_search', names, value, values, filters, fields)

    names.split(',').forEach(name => {
      if (!value) delete values[name]
      else if (filters.filter(item => item.name === name.split('-')[0]).length)
        values[name] = 1
      else if (fields.filter(item => item.name === name.split('-')[0]).length)
        values[name] = value
    })

    console.log('set_search2', values)

    this._search_values = { ...values }
  }

  get search_domain() {
    // filter_domain
    // domain:
    // console.log(this.search_values, this.search_info)

    const _patch_and_one = dms => {
      // console.log('_patch_and_one', dms)
      const return_error = () => {
        console.log('parse domain error:', dms)
        return [0, undefined, dms]
      }

      // console.log('domain:', dms)
      let todo = [...dms]

      if (!todo.length) return [null, todo]
      const item = todo.shift()

      if (Array.isArray(item)) return [1, item, todo]

      if (item === '!') {
        const [noerror, one, next] = _patch_and_one(todo)
        if (!noerror) return return_error()
        const one_ones = noerror === 1 ? [one] : [...one]
        return [2, [item, ...one_ones], next]
      }

      if (!['&', '|'].includes(item)) return return_error()

      const [noerror1, one1, next1] = _patch_and_one(todo)
      if (!noerror1) return return_error()

      const [noerror2, one2, next2] = _patch_and_one(next1)
      if (!noerror2) return return_error()
      const one11 = noerror1 === 1 ? [one1] : [...one1]
      const one21 = noerror2 === 1 ? [one2] : [...one2]
      return [2, [item, ...one11, ...one21], next2]
    }

    const _patch_and = dms => {
      // console.log('_patch_and:', dms)

      const dm = [...dms]
      if (!dm.length) return []

      const [noerror1, one1, next1] = _patch_and_one(dm)
      if (!noerror1) {
        // error
        console.log('parse domain error:', dm)
        return []
      }

      let result = noerror1 === 1 ? [one1] : [...one1]
      let next_todo = [...next1]

      while (next_todo.length) {
        const [noerror, one, next] = _patch_and_one(next_todo)
        if (!noerror) {
          // error
          console.log('parse domain error:', next_todo)
          return []
        }

        const one_ones = noerror === 1 ? [one] : [...one]
        result = ['&', ...result, ...one_ones]
        next_todo = [...next]
      }

      // console.log('_patch_and 9:', result)

      return result
    }

    const to_domain_insert_and = (str, globals_dict = {}) => {
      const dms1 = py_utils.eval(str, globals_dict)
      // console.log(dms1)
      const dms = _patch_and(dms1) // 检查 数组, 补充 and
      // console.log('domain:', dms)
      return dms
    }

    const _to_domain_date_str = (field, { type, year, quarter, month }) => {
      const date2str = date => {
        const year = (date.getFullYear() + 0).toString().padStart(4, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const day = (date.getDate() + 0).toString().padStart(2, '0')
        return `${year}-${month}-${day}`
      }
      const ret_fn = (first, last) => {
        const str1 = date2str(first)
        const str2 = date2str(new Date(last - 24 * 60 * 60 * 1000))
        return `['&', ('${field}', '>=', '${str1}'), ('${field}', '<=', '${str2}')]`
      }
      if (type === 'year')
        return ret_fn(new Date(year, 0, 1), new Date(year + 1, 0, 1))
      else if (type === 'quarter') {
        const fst = new Date(year, (quarter - 1) * 3, 1)
        const lst2 = new Date(fst - -100 * 24 * 60 * 60 * 1000)
        const lst = new Date(lst2.getFullYear(), lst2.getMonth(), 1)
        return ret_fn(fst, lst)
      } else if (type === 'month') {
        const fst = new Date(year, month - 1, 1)
        const lst2 = new Date(fst - -40 * 24 * 60 * 60 * 1000)
        const lst = new Date(lst2.getFullYear(), lst2.getMonth(), 1)
        return ret_fn(fst, lst)
      } else {
        return ''
      }
    }

    const _shift_or = dms => {
      if (!dms.length) return dms
      const dms2 = dms.reduce((acc, cur) => [...acc, ...cur], [])
      return [...new Array(dms.length - 1).fill('|'), ...dms2]
    }

    const to_domain = node => {
      // console.log('to_domain', node)
      const globals_dict = { uid: this.env.uid }

      const _field_to_domain = (node, value) => {
        const field = node.name
        const operator = !Array.isArray(value) ? 'ilike' : node.operator || '='
        const value2 = Array.isArray(value) ? value[0] : value
        return [[field, operator, value2]]
      }

      if (node.type === 'filter') {
        if (node.domain) return to_domain_insert_and(node.domain, globals_dict)
        else if (node.date) {
          return _shift_or(
            node.children.reduce((acc, item) => {
              const child_str = _to_domain_date_str(node.date, item)
              const child_domain = to_domain_insert_and(child_str, globals_dict)
              return [...acc, child_domain]
            }, [])
          )
        }
      } else if (node.type === 'field') {
        if (node.filter_domain) {
          const dms = _shift_or(
            node.children.reduce((acc, item) => {
              const ch_domain = to_domain_insert_and(node.filter_domain, {
                self: item.value
              })
              return [...acc, ch_domain]
            }, [])
          )

          // console.log('field,1', node, node.filter_domain, dms)

          return dms
        } else {
          const dms = _shift_or(
            node.children.reduce((acc, item) => {
              const ch_domain = _field_to_domain(node, item.value)
              return [...acc, ch_domain]
            }, [])
          )

          // console.log('field,2', node, dms)
          return dms
        }
      }
      return []
    }

    // console.log('domain', this.search_info.values)
    const domain = this.search_info.values.reduce((acc, cur) => {
      const dms2 = cur.map(item => to_domain(item))
      const dms = _shift_or(dms2) // dms 补充 or
      // console.log('or', dms)

      if (acc.length) acc = ['&', ...acc, ...dms]
      else acc = [...acc, ...dms]
      return acc
    }, [])

    // console.log(domain)

    return domain
  }

  get _search_items() {
    const info = tools._search_view_info({
      fields: this.view_info.fields,
      node: this.view_node
    })

    const filters = info.items.filter(item => item.type === 'filter')

    const group_bys = info.items.filter(item => item.type === 'group_by')
    const fields = info.items.filter(item => item.type === 'field')
    return { filters, group_bys, fields }
  }

  get search_info() {
    const info = this._search_items
    const { filters, fields } = info

    // const checkeds = filters.filter(item => this.search_values[item.name])
    const checkeds = filters.filter(item =>
      Object.keys(this.search_values)
        .map(item => item.split('-')[0])
        .includes(item.name)
    )
    // console.log(checkeds)

    const _get_today = name => {
      const today = new Date()
      const today_year = today.getUTCFullYear()
      return [today_year - 2, today_year - 1, today_year]
        .reduce((acc, year) => {
          const year_node = {
            name: `${year}-all`,
            string: `${year}年`,
            type: 'year',
            year
          }
          const qts = Array.from(new Array(4).keys()).map(item => {
            return {
              name: `${year}-Q${item + 1}`,
              string: `${year}年Q${item + 1}`,
              type: 'quarter',
              year,
              quarter: item + 1
            }
          })
          const months = Array.from(new Array(12).keys()).map(item => {
            return {
              name: `${year}-${item + 1}`,
              string: `${year}年${item + 1}月`,
              type: 'month',
              year,
              month: item + 1
            }
          })
          acc = [...acc, year_node, ...qts, ...months]
          return acc
        }, [])
        .map(item => {
          return { ...item, name: `${name}-${item.name}` }
        })
    }

    const values = Object.values(
      checkeds.reduce((acc, cur) => {
        if (!acc[cur.filter_group]) acc[cur.filter_group] = []

        const item = !cur.date
          ? cur
          : {
              ...cur,
              children: _get_today(cur.name).filter(
                item => this.search_values[item.name]
              )
            }

        acc[cur.filter_group].push(item)

        return acc
      }, {})
    )

    // console.log(values)

    // console.log('search_info2', this.search_values, fields)

    const fs = fields
      .filter(item =>
        Object.keys(this.search_values)
          .map(item => item.split('-')[0])
          .includes(item.name)
      )
      .map(item => {
        const vals = Object.values(
          Object.keys(this.search_values).reduce((acc, cur) => {
            if (
              cur.split('-')[0] === item.name

              // cur.includes(item.name)
            ) {
              const value = this.search_values[cur]
              const str = Array.isArray(value) ? value[1] : value
              acc[cur] = { name: cur, string: str, value }
            }
            return acc
          }, {})
        )
        return [{ ...item, children: vals }]
      })

    const values2 = [...values, ...fs]

    return { values: values2 }
  }

  async get_selection(payload) {
    // 暂时只发现 m2o 的情况
    const { field, query, ...kwargs } = payload
    const Relation = this.env.model(this.view_info.fields[field].relation)
    return Relation.name_search({ ...kwargs, name: query })
  }
}

export class ListView extends ListViewBase {
  constructor(payload = {}) {
    super(payload)
  }
}

export class ListKanbanView extends ListViewBase {
  constructor(payload = {}) {
    super(payload)
  }
}

export class TreeView extends TreeViewBase {
  constructor(payload = {}) {
    super(payload)
  }
}

export class KanbanView extends TreeViewBase {
  constructor(payload = {}) {
    super(payload)
  }
}

export class OlapView extends TreeViewBase {
  constructor(payload = {}) {
    super(payload)
    const { row, col, measure } = this._init_pivot_data()
    this._pivot_init_data = { rows: row, columns: col, measures: measure }
    this._pivot_values = []
  }

  _init_pivot_data() {
    const fs = this._init_get_node_info()
    return fs.reduce(
      (acc, item) => {
        const { name, type = 'row' } = item
        acc[type].push(name)
        return acc
      },
      { row: [], col: [], measure: [] }
    )
  }

  _init_get_node_info() {
    const fields = this.model.action.fields
    const globals_dict = {}
    const fs = (this.view_node.children || [])
      .filter(fld => {
        const invisible = fld.attrs.invisible
          ? py_utils.eval(fld.attrs.invisible, globals_dict)
          : false
        return !invisible
      })
      .map(item => {
        // eslint-disable-next-line no-unused-vars
        const { name, type, interval = 'month', widget } = item.attrs || {}
        // console.log(name, type, interval, widget, fields[name].type)
        // type in [ 'row', 'col', 'measure'] 或 undefind
        // interval in [ 'year', 'month', 'day']
        // widget in ['timesheet_uom', 'float_time'], 暂时不 处理 该属性

        const name2 = ['date', 'datetime'].includes(fields[name].type)
          ? `${name}:${interval}`
          : name

        // if (['date', 'datetime'].includes(fields[name].type)) {
        //   acc[type].push(`${name}:${interval}`)
        // } else {
        //   acc[type].push(name)
        // }

        return { name: name2, type }
      })

    // console.log(fs)
    return fs
  }

  get pivot_datalist() {
    return this.records ? this.records.pivot_datalist : []
  }

  get pivot_params() {
    const domain1 = this.domain
    const domain2 = this.model.views.search.search_domain
    const domain = [...domain1, ...domain2]
    const fields = this.model.action.fields

    return { fields, domain, ...this._pivot_init_data }
  }

  // async search_browse(payload) {
  //   // //
  //   // const res = await this.Model.search_browse({ domain, fields })
  //   // this._records = res
  //   // return this.values_list
  // }
}

export class GraphView extends OlapView {
  constructor(payload = {}) {
    super(payload)
  }

  get graph_datalist() {
    return this.records ? this.records.pivot_datalist_one : []
  }

  get graph_data() {
    const pivot_info = this.records
      ? this.records.pivot_info
      : this._pivot_init_data

    const fields = this.model.action.fields

    const { rows, columns, measures } = pivot_info

    const get_axis = axis => {
      return axis.map(item => {
        const meta = fields[item]

        const name = ['many2one', 'selection'].includes(meta.type)
          ? `${item}__name`
          : item
        return { name, type: meta.type, string: meta.string }
      })
    }
    return {
      rows: get_axis(rows),
      columns: get_axis(columns),
      measures: pivot.measures({ fields, measures }),
      dataList: this.graph_datalist
    }
  }

  async search_browse() {
    const records = await this.Model.mdx_read_one({ ...this.pivot_params })
    this._records = records
    return this.graph_data
  }

  async graph_change(payload) {
    console.log(' graph_change, ', payload)
    await this.records.pivot_change(payload)
    return this.graph_data
  }
}

export class PivotView extends OlapView {
  constructor(payload = {}) {
    super(payload)
  }

  _init_pivot_data2() {
    // console.log('PivotView view_node', this.view_node)

    const fields = this.model.action.fields

    const globals_dict = {}
    const fs = (this.view_node.children || [])
      .filter(fld => {
        const invisible = fld.attrs.invisible
          ? py_utils.eval(fld.attrs.invisible, globals_dict)
          : false
        return !invisible
      })
      .reduce(
        (acc, fld) => {
          // console.log(fld, fld.attrs)

          // eslint-disable-next-line no-unused-vars
          const { name, type, interval = 'month', widget } = fld.attrs || {}
          // console.log(name, type, interval, widget, fields[name].type)
          // type in [ 'row', 'col', 'measure']
          // interval in [ 'year', 'month', 'day']
          // widget in ['timesheet_uom', 'float_time'], 暂时不 处理 该属性

          if (['row', 'col', 'measure'].includes(type)) {
            if (['date', 'datetime'].includes(fields[name].type)) {
              acc[type].push(`${name}:${interval}`)
            } else {
              acc[type].push(name)
            }
          }

          return acc
        },
        { row: [], col: [], measure: [] }
      )

    return fs
  }

  get pivot_data() {
    const pivot_info = this.records
      ? this.records.pivot_info
      : this._pivot_init_data

    const pd = { datalist: this.pivot_datalist, ...pivot_info }

    // console.log('pd,', cp(pd))

    const fields = this.model.action.fields
    const pd2 = {
      measures: pivot.measures({ fields, ...pd }),
      groupbys: pivot.groupbys({ fields, ...pd }),

      rowtree: pivot.rowtree({ fields, ...pd }),
      coltree: pivot.coltree({ fields, ...pd }),
      datadict: pivot.datadict({ fields, ...pd })
    }

    return pd2
  }

  async search_browse() {
    // console.log(' search_browse, ', tools.debug)

    const records = await this.Model.mdx_read({ ...this.pivot_params })
    this._records = records
    return this.pivot_data
  }

  async pivot_change(payload) {
    // console.log(' pivot_change, ', payload)
    await this.records.pivot_change(payload)
    return this.pivot_data
  }
}

export class CalendarView extends TreeViewBase {
  constructor(payload = {}) {
    super(payload)
  }

  _get_domain(calendarData) {
    const { date, type } = calendarData
    const date_start = this.view_node.attrs.date_start

    const get_date_range = () => {
      const ONE_DAY = 24 * 60 * 60 * 1000
      const dt = new Date(date)
      dt.setHours(0)
      dt.setMinutes(0)
      dt.setSeconds(0)
      dt.setMilliseconds(0)
      const _first = () => {
        if (type === 'week') return new Date(dt - dt.getDay() * ONE_DAY)
        if (type === 'month' || type === 'year') dt.setDate(1)
        if (type === 'year') dt.setMonth(0)
        return dt
      }

      const fst = _first()
      const _last = () => {
        if (type === 'week') return new Date(fst - -7 * ONE_DAY)

        const delta = type === 'year' ? 369 : type === 'month' ? 40 : 1
        const lst = new Date(fst - -delta * ONE_DAY)
        lst.setDate(1)

        return lst
      }

      const lst = _last()

      const to_utc_str = dt => {
        const yyyy = (dt.getUTCFullYear() + 0).toString().padStart(4, 0)
        const mm = (dt.getUTCMonth() + 1).toString().padStart(2, 0)
        const dd = (dt.getUTCDate() + 0).toString().padStart(2, 0)
        const hh = (dt.getUTCHours() + 0).toString().padStart(2, 0)
        const mi = (dt.getUTCMinutes() + 0).toString().padStart(2, 0)
        const ss = (dt.getUTCSeconds() + 0).toString().padStart(2, 0)
        return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`
      }

      return [to_utc_str(fst), to_utc_str(lst)]
    }

    const [fst, lst] = get_date_range()

    // console.log('search_browse21', fst, lst)

    return [
      [date_start, '>=', fst],
      [date_start, '<', lst]
    ]
  }

  async search_browse(calendarData) {
    const domain1 = this.domain
    const domain2 = this.model.views.search.search_domain
    const domain3 = this._get_domain(calendarData)
    const domain = [...domain1, ...domain2, ...domain3]

    const fields = {
      ...this.fields,
      display_name: this.action.fields.display_name || {
        type: 'char'
      }
    }

    // const { date, type } = calendarData
    // console.log('search_browse2', date, type, domain, fields)

    const res = await this.Model.search_browse({ domain, fields })
    this._records = res
    return this.values_list
  }
}

export class GanttView extends View {
  constructor(payload = {}) {
    super(payload)
  }
}

export class QWebView extends View {
  constructor(payload = {}) {
    super(payload)
  }
}

export class ActivityView extends View {
  constructor(payload = {}) {
    super(payload)
  }
}
