import { SearchView, ListKanbanView, ListView } from './view'
import { FormView, TreeView, KanbanView } from './view'
import { GraphView, PivotView, CalendarView } from './view'
import { GanttView, QWebView, ActivityView } from './view'

// ('search', 'Search'),
// ('tree', 'Tree'),
// ('form', 'Form'),
// ('kanban', 'Kanban'),

// ('graph', 'Graph'),
// ('pivot', 'Pivot'),
// ('calendar', 'Calendar'),

// ('gantt', 'Gantt'),
// ('qweb', 'QWeb'),

// ('activity', 'Activity')

class Views {
  constructor(model) {
    this.model = model
    this._registry = {}
  }

  get action() {
    return this.model.action
  }

  get_view(view_type_in) {
    const view_type =
      view_type_in !== 'kanban' || this.model.model_from
        ? view_type_in
        : 'listkanban'

    const ViewClasses = {
      search: SearchView,
      list: ListView,
      listkanban: ListKanbanView,
      tree: TreeView,
      kanban: KanbanView,
      form: FormView,
      graph: GraphView,
      pivot: PivotView,
      gantt: GanttView,
      qweb: QWebView,
      calendar: CalendarView,
      activity: ActivityView
    }

    const ViewClass = ViewClasses[view_type]
    if (!ViewClass) {
      console.log(`${view_type} view Not Defined`)
      throw `${view_type} view Not Defined`
    }

    const view0 = this._registry[view_type]
    if (!view0)
      this._registry[view_type] = new ViewClass({
        model: this.model,
        view_type: view_type_in
        // view_info: this.action.views[view_type_in]
      })

    return this._registry[view_type]
  }

  get search() {
    return this.get_view('search')
  }

  get list() {
    return this.get_view('list')
  }

  get tree() {
    return this.get_view('tree')
  }

  get kanban() {
    return this.get_view('kanban')
  }

  get form() {
    const res = this.get_view('form')
    return res
  }

  get graph() {
    const res = this.get_view('graph')
    return res
  }

  get pivot() {
    const res = this.get_view('pivot')
    return res
  }

  get calendar() {
    const res = this.get_view('calendar')
    return res
  }

  get activity() {
    const res = this.get_view('activity')
    return res
  }

  get views_info() {
    const todos = Object.keys(this.form.submodels).reduce((acc, cur) => {
      acc[cur] = this.form.submodels[cur].view_info
      return acc
    }, {})

    const views = Object.keys(this.action.views).reduce((acc1, cur1) => {
      const view = this.get_view(cur1)
      const fields = Object.keys(view.fields).reduce((acc2, cur2) => {
        const new_view_info = todos[cur2]
        if (!new_view_info) {
          acc2[cur2] = view.fields[cur2]
        } else {
          const subViews = view.fields[cur2].views || {}
          const subViews2 = Object.keys(subViews).reduce((acc3, cur3) => {
            acc3[cur3] = {
              ...subViews[cur3],
              ...((new_view_info.views || {})[cur3] || {})
            }
            return acc3
          }, {})
          acc2[cur2] = { ...view.fields[cur2], views: subViews2 }
        }
        return acc2
      }, {})

      const toolbar = view.view_info.toolbar || {}
      acc1[cur1] = { fields, node: view.view_node, toolbar }
      return acc1
    }, {})

    return {
      model: this.action.res_model,
      view_type: this.model.view_type,
      views
    }
  }

  get views_info_old() {
    const views = Object.keys(this.action.views).reduce((acc, cur) => {
      const view = this.get_view(cur)

      acc[cur] = { fields: view.fields, node: view.view_node }
      return acc
    }, {})

    const info = { model: this.action.res_model, views }

    return info
  }
}

class ModelBase {
  constructor(payload = {}) {
    const { action, Model } = payload
    this._action = action
    this._Model = Model

    // this._view_type = action.view_mode[0]

    const view_mode = action.view_mode.filter(
      mode => !['search', 'form', 'gantt', 'qweb', 'activity'].includes(mode)
    )

    this._view_type = view_mode[0]
    // console.log('xxxxx,', action.view_mode)

    this.views = new Views(this)
  }

  get model_from() {
    return this.action.model_from
  }

  get action() {
    return this._action
  }

  get Model() {
    return this._Model
  }

  get env() {
    return this.Model.env
  }

  get view_type() {
    return this._view_type
  }

  with_view(view_type) {
    this._view_type = view_type
    return this
  }

  get view() {
    return this.views[this.view_type]
  }

  // view 页面, 是否显示 创建/编辑按钮
  hide_button() {
    return this.view.hide_button()
  }

  get view_info() {
    return this.views.views_info
  }
}

class ModelForList extends ModelBase {
  constructor(payload = {}) {
    super(payload)
  }

  get values_list() {
    return this.view.values_list
  }

  get total_length() {
    return this.view.total_length
  }

  get pagination() {
    return this.view.pagination
  }

  set_limit(value) {
    return this.view.set_limit(value)
  }

  async pageGoto(page) {
    return this.view.pageGoto(page)
  }

  async export_xlsx_all() {
    return await this.views.list.export_xlsx_all()
  }

  async calendar_search_browse(calendarData) {
    return this.views.calendar.search_browse(calendarData)
  }

  async unarchive(ids) {
    await this.views.list.unarchive(ids)
  }

  async archive(ids) {
    await this.views.list.archive(ids)
  }
}

class ModelForForm extends ModelForList {
  constructor(payload = {}) {
    super(payload)
  }

  get data_info() {
    return this.views.form.data_info
  }

  async read(ids, kwargs = {}) {
    // 读取数据, id 是页面送过来的,
    return this.views.form.read(ids, kwargs)
  }

  async onchange(payload = {}) {
    return this.views.form.onchange(payload)
  }

  async rollback(payload = {}) {
    return this.views.form.rollback(payload)
  }

  async commit(payload = {}) {
    return this.views.form.commit(payload)
  }

  async copy() {
    return this.views.form.copy()
  }

  async wizard_button_click(payload) {
    return this.views.form.wizard_button_click(payload)
  }

  async relation_to_browse(payload = {}) {
    return this.views.form.relation_to_browse(payload)
  }

  async relation_pick_reset(payload = {}) {
    return this.views.form.relation_pick_reset(payload)
  }

  async relation_pick(payload = {}) {
    return this.views.form.relation_pick(payload)
  }
  async button_clicked(payload = {}) {
    return this.views.form.button_clicked(payload)
  }
}

class ModelForOlap extends ModelForForm {
  constructor(payload = {}) {
    super(payload)
  }

  get pivot_data() {
    return this.views.pivot.pivot_data
  }

  async pivot_search_browse(payload) {
    // console.log(this, this.views.calendar)
    return this.views.pivot.search_browse(payload)
  }

  async pivot_change(payload) {
    return this.views.pivot.pivot_change(payload)
  }

  get graph_data() {
    return this.views.graph.graph_data
  }

  async graph_change(payload) {
    return this.views.graph.graph_change(payload)
  }

  async graph_search_browse(payload) {
    return this.views.graph.search_browse(payload)
  }
}

class ModelForSearch extends ModelForOlap {
  constructor(payload = {}) {
    super(payload)
  }
  get search_info() {
    return this.views.search.search_info
  }

  set_search(name, value) {
    this.views.search.set_search(name, value)
    this.views[this.view_type].offset = 0
    // console.log(this.views[this.view_type])
  }
}

export class WebModel extends ModelForSearch {
  constructor(payload = {}) {
    super(payload)
  }

  async unlink(payload2 = {}) {
    const { ids, ...payload } = payload2
    if (ids) {
      return this.views.list.unlink({ ids })
    } else {
      return this.views.form.unlink(payload)
    }
  }

  action_call(action, ids) {
    if (ids) {
      return this.views.list.action_call(action, ids)
    } else {
      return this.views.form.action_call(action)
    }
  }

  async print(action, ids) {
    //
    //       report_file: "sale.report_saleorder"
    // report_name: "sale.report_saleorder"
    // report_type: "qweb-pdf"
    // type: "ir.actions.report"

    const active_ids = ids || this.views.form.id

    const { report_name, report_type, type } = action
    // console.log(this.env)
    if (type === 'ir.actions.report') {
      const kw = { report_name, active_ids, report_type }
      return this.env.odoo.report_download(kw)
    } else {
      throw 'not ir.actions.report'
    }

    // return false
  }

  async get_selection(payload) {
    return this.views.form.get_selection(payload)
  }

  call(view, method, ...args) {
    // search.get_selection
    // form.get_selection
    return this.views[view][method](...args)
  }
}
