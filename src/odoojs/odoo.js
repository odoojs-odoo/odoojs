import { action_load } from './action'

class _ODOO {
  constructor(payload) {
    const { baseURL, timeout = 50000, ODOORPC } = payload
    this._odoorpc = new ODOORPC({ baseURL, timeout })
  }

  get odoorpc() {
    return this._odoorpc
  }

  get web() {
    return this.odoorpc.web
  }

  get env() {
    return this.odoorpc.env
  }

  get session() {
    return this.web.session
  }

  get version_info() {
    return this.odoorpc.version_info
  }

  get version_info_promise() {
    return this.odoorpc.version_info_promise
  }

  get session_info() {
    return this.odoorpc.session_info
  }

  async login({ db, login, password }) {
    await this.odoorpc.login({ db, login, password })
    return true
  }

  async logout() {
    return await this.odoorpc.logout()
  }

  async session_check() {
    return await this.odoorpc.session_check()
  }

  async get_version_info() {
    return await this.odoorpc.get_version_info()
  }
}

export class ODOO extends _ODOO {
  constructor(payload) {
    super(payload)
    const { is_mobile } = payload

    // 适用于移动端
    this.is_mobile = is_mobile

    this._is_user = false
    this._menu_data = {}
  }

  get is_user() {
    return this._is_user
  }

  get menu_data() {
    return { ...this._menu_data }
  }

  async _get_user_info() {
    // website/controllers/main.py/Website._login_redirect
    const is_user = await this.env
      .model('res.users')
      .execute('has_group', 'base.group_user')
    // console.log(is_user)

    this._is_user = is_user

    if (is_user) {
      // web.controller.main.home.web_client
      // const context = await this.odoo.env
      //   .model('ir.http')
      //   .execute('webclient_rendering_context', [])
      // console.log(context)
      //
      // web.controller.main.home.web_load_menus
      // menus = request.env["ir.ui.menu"].load_menus(request.session.debug)
      // const res = await this.web.home.load_menus()
      // console.log(res)

      // base.models.ir_ui_menu.IrUiMenu._search
      // context = {'ir.ui.menu.full_list' }

      const Menu = this.env.model('ir.ui.menu')
      // const menus = await Menu.execute('load_menus', 'assets')
      // 加上这个参数后, 会返回所有的 菜单,
      const context = { ...this.env.context }
      // context['ir.ui.menu.full_list'] = 1
      const menus = await Menu.execute_kw('load_menus', ['1'], { context })

      // mail.menu_root_discuss
      // console.log(JSON.parse(JSON.stringify(menus)))

      this._menu_data = menus
    }
  }

  async login({ db, login, password }) {
    const res = await super.login({ db, login, password })
    await this._get_user_info()
    return res
  }

  async reload() {
    const res = await super.session_check()
    await this._get_user_info()
    return res
  }

  async session_check() {
    const is_new = !this.session_info.uid
    const res = await super.session_check()
    if (is_new && res) await this._get_user_info()
    return res
  }

  async action(xml_id, kwargs = {}) {
    return action_load(this.env, xml_id, {
      ...kwargs,
      is_mobile: this.is_mobile
    })
  }

  download({ filename, filetype, data }) {
    this.odoorpc.download({ filename, filetype, data })
  }
}
