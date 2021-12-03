class _WEB {
  constructor(payload) {
    const { odoo } = payload
    this._odoo = odoo
    // this._menu_data = {}
    // this._is_user = false
  }

  get odoo() {
    return this._odoo
  }

  // get is_user() {
  //   return this._is_user
  // }

  // get menu_data() {
  //   return { ...this._menu_data }
  // }
}

class Home extends _WEB {
  constructor(payload) {
    super(payload)
  }

  async login({ db, login, password }) {
    await this.odoo.web.session.authenticate({ db, login, password })
    //

    // const is_user = await this.odoo.env
    //   .model('res.users')
    //   .execute('has_group', 'base.group_user')
    // // console.log(is_user)

    // this._is_user = is_user

    // if (is_user) {
    //   // web.controller.main.home.web_client
    //   // const context = await this.odoo.env
    //   //   .model('ir.http')
    //   //   .execute('webclient_rendering_context', [])
    //   // console.log(context)
    //   //
    //   //
    //   // web.controller.main.home.web_load_menus
    //   // menus = request.env["ir.ui.menu"].load_menus(request.session.debug)
    //   const menus = await this.odoo.env
    //     .model('ir.ui.menu')
    //     .execute('load_menus', ['1'])
    //   // console.log(menus)

    //   this._menu_data = menus
    // }

    return true
  }

  async signup(payload = {}) {
    const url = '/web2/signup'
    return await this._odoo.json_call(url, payload)
  }

  // async load_menus() {
  // 直接用 call_kw , 这个接口没有用
  //   const url = '/web/webclient/load_menus'
  //   const session_info = this.odoo.session_info
  //   // const token = session_info.cache_hashes.load_menus

  //   const token =
  //     'b9d683172a28adedb5d38d5b55c2c3d78f01fa8e77f1d805496724bf2abff73a'

  //   const url2 = `${url}/${token}`
  //   return await this._odoo.json_get(url2, {})
  // }
}

class Datebase extends _WEB {
  constructor(payload) {
    super(payload)
  }

  async list() {
    const url = '/web/database/list'
    return await this._odoo.json_call(url, {})
  }

  async create(master_pwd, name, lang, password, kwargs = {}) {
    const { demo = false, login, country_code = false, phone } = kwargs
    const url = '/jsonrpc'
    return await this._odoo.json_call(url, {
      service: 'db',
      method: 'create_database',
      args: [master_pwd, name, demo, lang, password, login, country_code, phone]
    })
  }

  async drop(master_pwd, name) {
    const url = '/jsonrpc'
    return await this._odoo.json_call(url, {
      service: 'db',
      method: 'drop',
      args: [master_pwd, name]
    })
  }

  async change_password(master_pwd, master_pwd_new) {
    const url = '/jsonrpc'
    return await this._odoo.json_call(url, {
      service: 'db',
      method: 'change_admin_password',
      args: [master_pwd, master_pwd_new]
    })
  }
}

class Session extends _WEB {
  constructor(payload) {
    super(payload)
    this._session_info = {}
  }

  get session_info() {
    // const session_info = {
    //   uid: 2,
    //   is_system: true,
    //   is_admin: true,
    //   user_context: { lang: 'zh_CN', tz: false, uid: 2 },
    //   db: 'test_db',
    //   server_version: '13.0-20200908',
    //   server_version_info: [13, 0, 0, 'final', 0, ''],
    //   name: 'Administrator',
    //   username: 'admin',
    //   partner_display_name: 'Administrator',
    //   company_id: 1,
    //   partner_id: 3,
    //   'web.base.url': 'http://localhost:8080',
    //   user_companies: {
    //     current_company: [1, 'My Company'],
    //     allowed_companies: [[1, 'My Company']]
    //   },
    //   currencies: {
    //     '7': { symbol: '\u00a5', position: 'before', digits: [69, 2] },
    //     '1': { symbol: '\u20ac', position: 'after', digits: [69, 2] },
    //     '2': { symbol: '$', position: 'before', digits: [69, 2] }
    //   },
    //   show_effect: true,
    //   display_switch_company_menu: false,
    //   cache_hashes: {
    //     load_menus: 'f37a9da35cebb704e3d78c4c3ae3d6348277b17c',
    //     qweb: '30990e60012bf69c4df1f0621548910b76caec89',
    //     translations: 'f508320a8a5786b44e159970d680ffd68c380f3f'
    //   },
    //   web_tours: []
    // }

    return { ...this._session_info }
  }

  get context() {
    const context = this.session_info.user_context || {}
    const allowed_company_ids = this.allowed_company_ids
    // console.log(this.session_info)
    return { ...context, allowed_company_ids }
  }

  get allowed_company_ids() {
    const cids_str = this.get_cookie('cids')
    if (cids_str) return cids_str.split(',').map(item => Number(item))
    return [this.current_company_id]
    // const user_companies = this.session_info.user_companies || {}
    // const allowed_companies = user_companies.allowed_companies || []
    // return [allowed_companies[0][0]]
  }

  set allowed_company_ids(cids = []) {
    const cids_str = cids.join(',')
    this.set_cookie('cids', cids_str || String(this.current_company_id))
  }

  set_first_allowed_company(cid) {
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

  change_allowed_company(cid, checked) {
    // console.log(cid, checked)
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

  get current_company_id() {
    const user_companies = this.session_info.user_companies || {}
    const current_company = user_companies.current_company || [0, '']
    return current_company[0]
  }

  get_cookie(c_name) {
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

  set_cookie(name, value, ttl) {
    // set cids,
    // odoo.set_cookie('cids', hash.cids || String(main_company_id));

    ttl = ttl || 24 * 60 * 60 * 365
    document.cookie = [
      name + '=' + value,
      'path=/',
      'max-age=' + ttl,
      'expires=' + new Date(new Date().getTime() + ttl * 1000).toGMTString()
    ].join(';')
  }

  async authenticate({ db, login, password }) {
    const url = '/web/session/authenticate'
    const payload = { db, login, password }
    const session_info = await this._odoo.json_call(url, payload)
    this._session_info = session_info
    return session_info
  }

  async get_session_info() {
    const url = '/web/session/get_session_info'
    const session_info = await this._odoo.json_call(url, {})
    this._session_info = session_info
    return session_info
  }

  async check() {
    const url = '/web/session/check'
    return await this._odoo.json_call(url, {})
  }

  async destroy() {
    try {
      const url = '/web/session/destroy'
      await this._odoo.json_call(url, {})
      this._session_info = {}
      return true
    } catch (e) {
      this._session_info = {}
      throw e
    }
  }

  async get_lang_list() {
    const url = '/web/session/get_lang_list'
    return await this._odoo.json_call(url, {})
  }

  async modules() {
    const url = '/web/session/modules'
    return await this._odoo.json_call(url, {})
  }

  async change_password({ fields }) {
    // fields 的格式
    // const fields = [
    //   { name: 'old_pwd', value: '123456' },
    //   { name: 'new_password', value: '123456' },
    //   { name: 'confirm_pwd', value: '123456' }
    // ]

    const url = '/web/session/change_password'
    return await this._odoo.json_call(url, { fields })
  }

  async csrf_token() {
    const url = '/web2/session/csrf_token'
    return await this._odoo.json_call(url, {})
  }
}

class Dataset extends _WEB {
  constructor(payload) {
    super(payload)
  }

  async call_kw(payload) {
    const { model, method, args, kwargs } = payload
    const url = '/web/dataset/call_kw'
    const url2 = `${url}/${model}/${method}`
    return await this._odoo.json_call(url2, { model, method, args, kwargs })
  }

  async call_button(payload) {
    const { model, method, args, kwargs } = payload
    const url = '/web/dataset/call_button'
    return await this._odoo.json_call(url, { model, method, args, kwargs })
  }
}

class Action extends _WEB {
  constructor(payload) {
    super(payload)
  }

  async load({ action_id, additional_context = {} }) {
    const url = '/web/action/load'
    return await this._odoo.json_call(url, { action_id, additional_context })
  }

  async run({ action_id, context }) {
    const url = '/web/action/run'
    const payload = { action_id, context }
    return await this._odoo.json_call(url, payload)
  }
}

class Export extends _WEB {
  constructor(payload) {
    super(payload)
  }

  async _base(url, data) {
    const payload = { data }
    return await this._odoo.file_export(url, payload)
  }

  async xlsx(data) {
    const url = '/web/export/xlsx'
    return await this._base(url, data)
  }

  async csv(data) {
    const url = '/web/export/csv'
    return await this._base(url, data)
  }
}

class Report extends _WEB {
  constructor(payload) {
    super(payload)
  }

  async check_wkhtmltopdf() {
    const url = '/report/check_wkhtmltopdf'
    return await this._odoo.json_call(url, {})
  }

  async download(data, context) {
    const url = '/report/download'
    const payload = { data, context }
    return await this._odoo.file_export(url, payload)
  }
}

export class WEB {
  constructor(payload) {
    this.home = new Home(payload)
    this.datebase = new Datebase(payload)
    this.session = new Session(payload)
    this.dataset = new Dataset(payload)
    this.action = new Action(payload)
    this.export = new Export(payload)
    this.report = new Report(payload)
  }
}

export default { WEB }
