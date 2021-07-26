import xml2json from './xml2json.js'
import viewModels from './viewmodel'
import { is_node } from './utils'

const AllFiles = require.context('./addons', true, /\.js$/)

const AllAddons = AllFiles.keys().reduce((models, modulePath) => {
  // const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = AllFiles(modulePath)
  // models = { ...models, [moduleName]: value.default }
  // console.log(value.default)

  return { ...models, ...value.default }
}, {})

console.log(AllAddons)

class ViewBase1 {
  constructor(env, payload = {}) {
    const { model, action, view_type, view_info } = payload
    this._env = env
    this._action = action
    this._res_model = model

    this._view_type = view_type
    this._view_info = view_info

    this._from_view = action._from_view

    // 这个函数用到了 Action 里的一些东西, 需要后调用
    this._view_model = this.get_view_model(env, model, view_info.fields)

    this._field_onchange = _onchange_spec(view_info)

    const _get_view_node2 = () => {
      const arch1 = view_info.arch
      if (!arch1) {
        return {}
      }
      const node = xml2json.toJSON(arch1)
      // console.log('view node,', view_info, node)
      return this._get_view_node(node)
    }

    const view_node = _get_view_node2()
    this._view_node = view_node

    // 仅仅用于测试时, 取 node, 其他情况不得使用
    const { buttons_node, fields_node } = _feilds_buttons_spec(view_node)
    this._debug_view_buttons = buttons_node
    this._debug_view_fields = fields_node
  }

  get_view_model(env, model, fields) {
    // overrid, to get ListViewModel, TreeViewModel, FormViewModel
    const Model = env.model(model, { fields })
    return new viewModels.ListViewModel({ view: this, Model })
  }

  get action() {
    return this._action
  }

  get env() {
    return this._env
  }

  get context() {
    return this.env.context
  }

  get res_model() {
    return this._res_model
  }

  get model() {
    return this._view_model
  }

  get Model() {
    return this.model.Model
  }

  get view_type() {
    return this._view_type
  }

  get view_info() {
    return this._view_info
  }

  get field_onchange() {
    return this._field_onchange
  }

  get view_node() {
    return this._view_node
  }
}

class ViewBase2 extends ViewBase1 {
  constructor(env, payload = {}) {
    super(env, payload)
  }

  // 测试用函数, 其他情况不得使用
  _debug_node_get(node_name) {
    const fn = node_name => {
      const len = node_name.split('.').length
      if (len === 1) {
        return this._debug_view_fields[node_name]
      } else if (len >= 2) {
        return this._debug_view_buttons[node_name]
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
    if (typeof node !== 'object') {
      return node
    }

    if (Array.isArray(node)) {
      return node
    }

    if (!node) {
      return node
    }

    if (node.tagName === 'field') {
      return this._view_node_field(node, parent)
    }
    if (node.tagName === 'label') {
      return this._view_node_label(node, parent)
    }

    if (node.tagName === 'templates') {
      const node3 = this._get_templates(node, parent)
      const fullName = parent ? `${parent}.templates` : 'templates'

      return {
        ...node3,
        children: node3.children.map(item =>
          this._view_node_default_html(item, fullName)
        )
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
    // console.log('_get_templates', node)
    // console.log('_get_templates', this.action.xml_id, parent)
    // console.log('_get_templates', AllAddons)

    const get_tmpl = () => {
      const paths = this.action.xml_id.split(',')

      const xml_id = paths[0]
      const rest = paths.slice(1, paths.length).reduce((acc, cur) => {
        return [...acc, ...cur.split('.')]
      }, [])

      const action_views = AllAddons[xml_id]
      if (!action_views) {
        return undefined
      }

      const field_views = rest.reduce((acc, cur) => {
        return acc[cur] || {}
      }, action_views)

      const templates = field_views[parent].templates

      if (templates) {
        return xml2json.toJSON(templates)
      } else {
        return undefined
      }
    }

    const tmpl = get_tmpl()

    // console.log('_get_templates', tmpl)

    if (tmpl) {
      return tmpl
    } else {
      return node
    }
  }
}

class ViewBase extends ViewBase2 {
  constructor(env, payload = {}) {
    super(env, payload)
  }

  _hide_create_or_edit(attr) {
    const val_str = this.view_node.attrs[attr]

    // 只是 简单的  字符串, true or false
    // 都是 js 语法的

    if (val_str) {
      // const res = this.env.eval_safe(val_str, {})
      const res = eval(val_str)
      return !res
    } else {
      return false
    }
  }

  hide_create() {
    return this._hide_create_or_edit('create')
  }

  hide_edit() {
    return this._hide_create_or_edit('edit')
  }
}

export class ListView extends ViewBase {
  constructor(env, payload = {}) {
    super(env, payload)
  }

  get_view_model(env, model, fields) {
    // overrid, to get ListViewModel, TreeViewModel, FormViewModel
    const Model = env.model(model, { fields })
    return new viewModels.ListViewModel({ view: this, Model })
  }
}

export class TreeView extends ViewBase {
  constructor(env, payload = {}) {
    super(env, payload)
  }

  get_view_model(env, model, fields) {
    // overrid, to get ListViewModel, TreeViewModel, FormViewModel
    const Model = env.model(model, { fields })
    return new viewModels.TreeViewModel({ view: this, Model })
  }
}

export class KanbanView extends ViewBase {
  constructor(env, payload = {}) {
    super(env, payload)
  }

  get_view_model(env, model, fields) {
    // overrid, to get ListViewModel, TreeViewModel, FormViewModel
    const Model = env.model(model, { fields })
    return new viewModels.KanbanViewModel({ view: this, Model })
  }
}

export class FormView extends ViewBase {
  constructor(env, payload = {}) {
    super(env, payload)
  }

  get_view_model(env, model, fields) {
    // overrid, to get ListViewModel, TreeViewModel, FormViewModel
    const Model = env.model(model, { fields })
    return new viewModels.FormViewModel({ view: this, Model })
  }
}

export default {
  list: ListView,
  tree: TreeView,
  kanban: KanbanView,
  form: FormView
}

const get_attrs = node_attr => {
  const list2 = ['class']
  return Object.keys(node_attr).reduce((acc, cur) => {
    if (!list2.includes(cur)) {
      acc[cur] = node_attr[cur]
    }
    return acc
  }, {})
}

const _onchange_spec = view_info => {
  // call by env _init_columns fields_view_get
  const result = {}

  const process = (node, info, prefix) => {
    if (node.tagName === 'field') {
      const name = node.attrs.name
      const names_list = prefix ? [prefix, name] : [name]
      const names = names_list.join('.')
      if (!Object.keys(result).includes(names)) {
        result[names] = node.attrs.on_change || ''
      }
      Object.values((info.fields[name] || {}).views || {}).forEach(subinfo => {
        process(xml2json.toJSON(subinfo.arch), subinfo, names)
      })
    } else {
      const children = node.children || []
      children.forEach(child => {
        process(child, info, prefix)
      })
    }
  }

  if (view_info.arch) {
    const root = xml2json.toJSON(view_info.arch)
    process(root, view_info, '')
  }

  const res2 = { ...result }
  delete res2.id
  // console.log('res,', res2)

  return res2
}

const _feilds_buttons_spec = node_in => {
  const result = { field: {}, button: {} }

  const process = node => {
    if (node.tagName === 'field') {
      const name2 = node.attrs.name || '_noname'
      if (!result.field[name2]) {
        result.field[name2] = []
      }
      result.field[name2].push(node)
    } else if (node.tagName === 'button') {
      const btype = node.attrs.type || '_notype'
      const bname = node.attrs.name || '_noname'
      const name2 = `${btype}.${bname}`
      if (!result.button[name2]) {
        result.button[name2] = []
      }
      result.button[name2].push(node)
    } else {
      if (node.children && Array.isArray(node.children)) {
        node.children.forEach(child => {
          if (is_node(child)) {
            process(child)
          }
        })
      }
    }
  }

  process(node_in)

  const buttons_node = result.button
  const fields_node = result.field

  return { buttons_node, fields_node }
}
