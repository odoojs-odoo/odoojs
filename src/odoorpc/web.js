class _WEB {
  constructor(payload) {
    const { odoo } = payload
    this._odoo = odoo
  }

  get odoo() {
    return this._odoo
  }
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
    if (cids_str) {
      return cids_str.split(',').map(item => Number(item))
    } else {
      const user_companies = this.session_info.user_companies || {}
      const allowed_companies = user_companies.allowed_companies || []
      return allowed_companies.map(item => item[0])
    }
  }

  set allowed_company_ids(cids = []) {
    const cids_str = cids.join(',')
    this.set_cookie('cids', cids_str || String(this.current_company_id))
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

      if (c_name && c_name === name) {
        return cookie
      }
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

  async load(action_id, additional_context = {}) {
    const url = '/web/action/load'
    const payload = { action_id, additional_context }
    return await this._odoo.json_call(url, payload)
  }
}

export class WEB {
  constructor(payload) {
    this.datebase = new Datebase(payload)
    this.session = new Session(payload)
    this.dataset = new Dataset(payload)
    this.action = new Action(payload)
  }
}

export default { WEB }
