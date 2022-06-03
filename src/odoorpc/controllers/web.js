import { JsonRequest, FileRequest } from '../request'
JsonRequest._session_info = undefined

class Webclient extends JsonRequest {
  constructor(payload) {
    super(payload)
  }

  static async version_info() {
    const url = '/web/webclient/version_info'
    return this.json_call(url, {})
  }

  // async load_menus() {
  // 直接用 call_kw , 这个接口没有用
  //   const url = '/web/webclient/load_menus'
  //   const session_info = this.odoo.session_info
  //   // const token = session_info.cache_hashes.load_menus

  //   const token =
  //     'b9d683172a28adedb5d38d5b55c2c3d78f01fa8e77f1d805496724bf2abff73a'

  //   const url2 = `${url}/${token}`
  //   return await this.json_get(url2, {})
  // }
}

class Database extends JsonRequest {
  constructor(payload) {
    super(payload)
  }

  static async list() {
    const url = '/web/database/list'
    return this.json_call(url, {})
  }

  static async create(master_pwd, name, lang, password, kwargs = {}) {
    const { demo = false, login, country_code = false, phone } = kwargs
    const url = '/jsonrpc'
    return await this.json_call(url, {
      service: 'db',
      method: 'create_database',
      args: [master_pwd, name, demo, lang, password, login, country_code, phone]
    })
  }

  static async drop(master_pwd, name) {
    const url = '/jsonrpc'
    return await this.json_call(url, {
      service: 'db',
      method: 'drop',
      args: [master_pwd, name]
    })
  }

  static async change_password(master_pwd, master_pwd_new) {
    const url = '/jsonrpc'
    return await this.json_call(url, {
      service: 'db',
      method: 'change_admin_password',
      args: [master_pwd, master_pwd_new]
    })
  }
}

class Dataset extends JsonRequest {
  constructor(payload) {
    super(payload)
  }

  static async call_kw(payload) {
    const { model, method, args, kwargs } = payload
    const url = '/web/dataset/call_kw'
    const url2 = `${url}/${model}/${method}`
    return await this.json_call(url2, { model, method, args, kwargs })
  }

  static async call_button(payload) {
    const { model, method, args, kwargs } = payload
    const url = '/web/dataset/call_button'
    return await this.json_call(url, { model, method, args, kwargs })
  }
}

class Session extends JsonRequest {
  constructor(payload) {
    super(payload)
  }

  static get session_info() {
    return this._session_info
  }

  static get context() {
    return this.user_context
  }

  static get user_context() {
    const session_info = this.session_info
    const context = session_info.user_context || {}
    const allowed_company_ids = this.allowed_company_ids
    // console.log(this.session_info)
    return { ...context, allowed_company_ids }
  }

  static get server_version() {
    const { server_version_info } = this.session_info
    return server_version_info[0]
  }

  static get current_company_id() {
    const { user_companies = {} } = this.session_info || {}
    const { current_company } = user_companies
    return current_company
  }

  static get allowed_companies_for_selection() {
    const { user_companies = {} } = this.session_info || {}
    const { allowed_companies = {} } = user_companies

    const allowed_company_ids = this.allowed_company_ids

    return Object.values(allowed_companies).map(item => {
      const checked = allowed_company_ids.includes(item.id)
      return { ...item, checked }
    })
  }

  static get allowed_company_ids() {
    const cids_str = this.get_cookie('cids')
    if (!cids_str) return [this.current_company_id]

    const cids = cids_str.split(',').map(item => Number(item))

    const { user_companies = {} } = this.session_info || {}
    const { allowed_companies = {} } = user_companies

    const odoo_cids = Object.values(allowed_companies).map(item => item.id)

    const to_remove_cids = cids.filter(item => !odoo_cids.includes(item))
    if (!to_remove_cids.length) return cids

    const todo = cids.filter(item => odoo_cids.includes(item))
    if (todo.length) {
      this.allowed_company_ids = todo
      return todo
    }

    const todo2 = odoo_cids.slice(0, 1)
    this.allowed_company_ids = todo2
    return todo2
  }

  static set allowed_company_ids(cids = []) {
    const cids_str = cids.join(',') || String(this.current_company_id)
    this.set_cookie('cids', cids_str)
  }

  static set_first_allowed_company(cid) {
    const oids = this.allowed_company_ids
    const get_ids = () => {
      const oid = oids.find(item => item === cid)
      if (oid) return [cid, ...oids.filter(item => item !== cid)]
      else if (oids.length > 1) return [cid, ...oids]
      else return [cid]
    }
    const cids = get_ids()
    this.allowed_company_ids = cids
  }

  static change_allowed_company(cid, checked) {
    const oids = this.allowed_company_ids

    const get_ids = () => {
      const oid = oids.find(item => item === cid)
      if (checked) {
        if (oid) return [...oids]
        else return [...oids, cid]
      } else {
        if (!oid) return [...oids]
        else if (oids.length > 1) {
          const nids = oids.filter(item => item !== cid)
          if (oids[0] !== cid) return nids
          else {
            const cur = this.current_company_id
            if (!nids.find(item => item === cur)) return nids
            else return [cur, ...nids.filter(item => item !== cur)]
          }
        } else {
          return [...oids]
        }
      }
    }

    const cids = get_ids()
    this.allowed_company_ids = cids
  }

  static get_cookie(c_name) {
    var cookies = document.cookie ? document.cookie.split('; ') : []
    // console.log('document.cookie ', document.cookie)
    // console.log('cookies ', cookies)
    for (var i = 0, l = cookies.length; i < l; i++) {
      var parts = cookies[i].split('=')
      var name = parts.shift()
      var cookie = parts.join('=')

      if (c_name && c_name === name) return cookie
    }
    return ''
  }

  static set_cookie(name, value, ttl) {
    ttl = ttl || 24 * 60 * 60 * 365
    document.cookie = [
      name + '=' + value,
      'path=/',
      'max-age=' + ttl,
      'expires=' + new Date(new Date().getTime() + ttl * 1000).toGMTString()
    ].join(';')
  }

  static _session_info_get_after(session_info) {
    const info = { ...session_info }
    const get_user_companies = () => {
      const { server_version_info = [15] } = info
      const ver = server_version_info[0]

      const { user_companies = {} } = info
      if (ver >= 15) return user_companies

      const { current_company, allowed_companies } = user_companies

      return {
        current_company: current_company[0],
        allowed_companies: allowed_companies.reduce((acc, cur) => {
          const [cid, name] = cur
          acc[cid] = { id: cid, name }
          return acc
        }, {})
      }
    }

    const user_companies = get_user_companies()

    return { ...info, user_companies }
  }

  static async authenticate({ db, login, password }) {
    const url = '/web/session/authenticate'
    const payload = { db, login, password }
    const session_info = await this.json_call(url, payload)
    const info = this._session_info_get_after(session_info)
    this._session_info = info
    return info
  }

  static async get_session_info() {
    const url = '/web/session/get_session_info'
    const session_info = await this.json_call(url, {})
    const info = this._session_info_get_after(session_info)
    this._session_info = info
    return info
  }

  static async check() {
    const url = '/web/session/check'
    return await this.json_call(url, {})
  }

  static async destroy() {
    const url = '/web/session/destroy'
    await this.json_call(url, {})
    this._session_info = undefined
    return true
  }

  static async get_lang_list() {
    const url = '/web/session/get_lang_list'
    return await this.json_call(url, {})
  }

  static async modules() {
    const url = '/web/session/modules'
    return await this.json_call(url, {})
  }

  static async change_password({ fields }) {
    // fields 的格式
    // const fields = [
    //   { name: 'old_pwd', value: '123456' },
    //   { name: 'new_password', value: '123456' },
    //   { name: 'confirm_pwd', value: '123456' }
    // ]

    const url = '/web/session/change_password'
    return await this.json_call(url, { fields })
  }
}

async function file2Base64(file) {
  const result = await new Promise(function (resolve, reject) {
    const reader = new FileReader()
    let imgResult = ''
    reader.readAsDataURL(file)
    reader.onload = function () {
      imgResult = reader.result
    }
    reader.onerror = function (error) {
      reject(error)
    }
    reader.onloadend = function () {
      resolve(imgResult)
    }
  })

  const data = result.slice(23)

  return data
}

class Binary2 extends JsonRequest {
  constructor(payload) {
    super(payload)
  }

  static async upload_attachment_one(payload) {
    const { file } = payload
    const datas = await file2Base64(file)
    const vals = { name: file.name, datas }
    const context = Session.user_context
    const attach_id = await Dataset.call_kw({
      model: 'ir.attachment',
      method: 'create',
      args: [vals],
      kwargs: { context }
    })

    const attach = await Dataset.call_kw({
      model: 'ir.attachment',
      method: 'read',
      args: [attach_id, ['name', 'mimetype']],
      kwargs: { context }
    })
    // console.log(attach)
    return attach[0]
  }
}

class Binary extends FileRequest {
  constructor(payload) {
    super(payload)
  }

  // static async upload({ file }) {
  //   // '/web/binary/upload'
  //
  // }

  static async upload_attachment(payload) {
    const url = '/web/binary/upload_attachment'
    const { model, id, ufile } = payload
    const payload2 = { model, id, ufile }
    return await this.file_import(url, payload2)
  }

  static async _bak_upload_attachment_json({ res_model, res_id, file }) {
    // '/web/binary/upload_attachment'
    // odoo 原本是 http 请求. 这里是 json 实现 的样例. 暂存
    // 在上面的函数中 upload_attachment, 已经可以直接发送 http 请求

    const datas = await file2Base64(file)
    const vals = { name: file.name, res_model, res_id, datas }
    const context = Session.user_context
    const attach_id = await Dataset.call_kw({
      model: 'ir.attachment',
      method: 'create',
      args: [vals],
      kwargs: { context }
    })

    await Dataset.call_kw({
      model: 'ir.attachment',
      method: 'register_as_main_attachment',
      args: [attach_id],
      kwargs: { force: false }
    })

    return attach_id
  }
}

class Action extends JsonRequest {
  constructor(payload) {
    super(payload)
  }

  static async load({ action_id, additional_context = {} }) {
    const url = '/web/action/load'
    return await this.json_call(url, { action_id, additional_context })
  }

  static async run({ action_id, context }) {
    const url = '/web/action/run'
    const payload = { action_id, context }
    return await this.json_call(url, payload)
  }
}

class Export extends FileRequest {
  constructor(payload) {
    super(payload)
  }

  static async _base(url, data2) {
    const data = JSON.stringify(data2)
    return await this.file_export(url, { data })
  }

  static async xlsx(data) {
    const url = '/web/export/xlsx'
    return await this._base(url, data)
  }

  static async csv(data) {
    const url = '/web/export/csv'
    return await this._base(url, data)
  }
}

class Report extends FileRequest {
  constructor(payload) {
    super(payload)
  }

  static async check_wkhtmltopdf() {
    const url = '/report/check_wkhtmltopdf'
    return await this.json_call(url, {})
  }

  static async print({ report_name, active_ids, report_type, context }) {
    // call check_wkhtmltopdf 是否安装了 wkhtmltopdf
    // if true then
    // else: 可能 pattern 不同

    if (report_type == 'qweb-pdf') {
      const res = await this.check_wkhtmltopdf()
      // console.log(res)

      if (res !== 'ok') {
        throw 'wkhtmltopdf not ok '
        // return false
      }
    }

    const pattern = report_type == 'qweb-pdf' ? '/report/pdf/' : '/report/text/'
    const url = `${pattern}${report_name}/${active_ids.join(',')}`
    const data = [url, report_type]

    const data2 = JSON.stringify(data)
    const context2 = JSON.stringify(context)

    const res = await this.download(data2, context2)

    // console.log(res)
    return res
  }

  static async download(data, context) {
    const url = '/report/download'
    const payload = { data, context }
    return await this.file_export(url, payload)

    // data: ["/report/pdf/sale.report_saleorder/13,12","qweb-pdf"]
    // context: {"lang":"zh_CN","tz":"Asia/Shanghai","uid":2,"allowed_company_ids":[1]}
    // token: dummy-because-api-expects-one
    // csrf_token: a295fd8dd9bb53b7b551903cbc2797085aebeba5o1674440795
  }
}

class Home extends FileRequest {
  constructor(payload) {
    super(payload)
  }

  static get session_info() {
    return Session.session_info
  }

  static get is_user() {
    return (this._login_info || {}).is_user
  }

  static get menu_data() {
    return (this._login_info || {}).menus
  }

  async signup(payload = {}) {
    const url = '/web2/signup'
    return await this.json_call(url, payload)
  }

  static async login({ db, login, password }) {
    const session = await Session.authenticate({ db, login, password })
    const info = await this._get_user_info(session)

    return {
      session,
      context: Session.user_context,
      ...info
    }
  }

  static async logout() {
    try {
      await Session.destroy()
      this._login_info = undefined
      return true
    } catch {
      return true
    }
  }

  static _check_is_group_user() {
    const context = Session.user_context

    return Dataset.call_kw({
      model: 'res.users',
      method: 'has_group',
      args: ['base.group_user'],
      kwargs: { context }
    })
  }

  static async _menus_get() {
    const call_odoo = async () => {
      // web.controller.main.home.web_client

      //
      // web.controller.main.home.web_load_menus
      // menus = request.env["ir.ui.menu"].load_menus(request.session.debug)
      // const res = await web.home.load_menus()
      // console.log(res)

      // base.models.ir_ui_menu.IrUiMenu._search
      // context = {'ir.ui.menu.full_list' }

      // 加上这个参数后, 会返回所有的 菜单,
      const context2 = Session.user_context
      const context = { ...context2, 'ir.ui.menu.full_list': true }

      const menus = await Dataset.call_kw({
        model: 'ir.ui.menu',
        method: 'load_menus',
        args: ['1'],
        kwargs: { context }
      })

      // mail.menu_root_discuss
      // console.log(JSON.parse(JSON.stringify(menus)))

      return menus
    }

    const for_odoo_14 = menus => {
      // console.log(menus)

      const filter_fn = item =>
        item.action ||
        (item.children && Array.isArray(item.children) && item.children.length)

      const to_filter_children = children => {
        const res = children
          .filter(filter_fn)
          .map(item => {
            return {
              ...item,
              children: to_filter_children(item.children || [])
            }
          })
          .filter(filter_fn)

        return res
      }

      const { children } = menus
      const children2 = to_filter_children(children)
      // console.log(cp(menus), cp(children2))
      return { ...menus, children: children2 }
    }

    const for_odoo_15 = menus => {
      // console.log(menus)

      const to_filter_children = children => {
        const filter_fn = item =>
          item.action ||
          (item.children &&
            Array.isArray(item.children) &&
            item.children.length)

        const res = children
          .filter(filter_fn)
          .map(item => {
            const children2 = (item.children || []).map(menuid => menus[menuid])
            return {
              ...item,
              children: to_filter_children(children2)
            }
          })
          .filter(filter_fn)

        return res
      }

      const children = Object.values(menus).filter(item => !item.parent_id)
      const children2 = to_filter_children(children)
      // console.log(cp(menus), cp(children2))
      return { children: children2 }
    }

    const menus = await call_odoo()

    const ver = Session.server_version
    if (ver <= 14) return for_odoo_14(menus)

    return for_odoo_15(menus)
  }

  static async _get_user_info() {
    // website/controllers/main.py/Website._login_redirect
    const is_user = await this._check_is_group_user()

    if (is_user) {
      const menus = await this._menus_get()
      // this._qweb_xml = await this._get_qweb()

      this._login_info = { is_user, menus }
      return { is_user, menus }
    } else {
      // portal/controllers/portal.py/CustomerPortal.home
      this._login_info = { is_user }
      return { is_user }
    }
  }

  static async get_session() {
    if (!this.session_info) {
      await Session.get_session_info()
    }
    const session = Session.session_info

    if (!this._login_info) {
      await this._get_user_info(session)
    }

    const login_info = this._login_info
    return {
      session,
      context: Session.user_context,
      ...login_info
    }
  }

  static async session_check() {
    try {
      if (this.session_info && this._login_info) {
        await Session.check()
      }
      await this.get_session()

      return true
    } catch (error) {
      return false
    }
  }

  static async content(payload) {
    // const { xmlid, model = 'ir.attachment', id, field = 'datas' } = payload
    // const { filename, filename_field = 'name', unique, mimetype } = payload
    // const { download, data, access_token } = payload

    const { model = 'ir.attachment', id, field = 'datas' } = payload
    const { filename, filename_field = 'name' } = payload
    const { download } = payload

    // model: ir.attachment
    // id: 665
    // field: datas
    // filename_field: name
    // filename: 3.jpg
    // download: true
    // data: null
    // token: dummy-because-api-expects-one
    // csrf_token: 55a066a3b01d20a5a1e490513c87b6938eb5089co1674436701

    const url = '/web/content'
    const payload2 = { model, id, field, filename, filename_field, download }
    return await this.file_export(url, payload2)
  }
}

Home._login_info = undefined

// async _get_qweb() {
//   const Model = this.env.model('ir.module.module')

//   const domain = [['state', '=', 'installed']]

//   const mods2 = await Model.search_read({ domain, fields: ['name'] })
//   const mods = mods2.map(item => item.name).join(',')
//   // console.log(mods, this.session_info.cache_hashes.qweb)
//   // /web/webclient/qweb

//   const hash_id = this.session_info.cache_hashes.qweb

//   const url = `/web/webclient/qweb/${hash_id}?mods=${mods}`
//   const res = await this.odoorpc.json_get(url, {})
//   console.log(res)
//   return res
// }

export const web = Home

web.webclient = Webclient
web.database = Database
web.session = Session
web.dataset = Dataset
web.binary = Binary
web.binary2 = Binary2

web.action = Action
web.export = Export

export const report = Report

export default {
  web,
  report
}
