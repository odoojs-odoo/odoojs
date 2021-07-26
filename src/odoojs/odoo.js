import { Menu } from './menu'
import { Action } from './action'

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
    const { menuLoad } = payload

    // 自动 从 服务端 读取菜单
    this._menu = new Menu(this.env)

    this.menuLoad = menuLoad
    if (menuLoad) {
      // 初始时 为 false
      // 页面加载后, 设置菜单, 设置为 true
      // 页面跳转时, 检测菜单已经设置过了, 则不再设置,
      this.menu_is_set = false
    } else {
      this.menu_is_set = true
    }
  }

  get menu() {
    return this._menu
  }

  async _get_user_info() {
    await this.menu.load_menus()

    const res = await this.env.model('res.users').read(this.session_info.uid)

    console.log(res)

    // if (this.menuLoad) {
    // }
  }

  async login({ db, login, password }) {
    const res = await super.login({ db, login, password })
    await this._get_user_info()
    return res
  }

  async session_check() {
    const is_new = !this.session_info.uid
    const res = await super.session_check()
    if (is_new && res) {
      await this._get_user_info()
    }
    return res
  }

  async action(xml_id, additional_context = {}) {
    return Action.load(this.env, xml_id, additional_context)
  }

  download({ filename, filetype, data }) {
    this.odoorpc.download({ filename, filetype, data })
  }
}
