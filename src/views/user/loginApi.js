import api from '@/odoorpc'

const randInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min
}

const username_env = process.env.VUE_APP_ODOO_USER
const password_env = process.env.VUE_APP_ODOO_PASSWORD
const base_api = process.env.VUE_APP_BASE_API

const default_database = process.env.VUE_APP_ODOO_DB
const default_username = base_api === '/dev-api' ? username_env : ''
const default_password = base_api === '/dev-api' ? password_env : ''

const default_code = String(randInt(1000, 9999))

export default {
  storeVerificationCode: default_code,
  async getDatabaseSelectOptions() {
    return api.web.database.list()
  },
  getVerificationCode() {
    const code = String(randInt(1000, 9999))

    this.storeVerificationCode = code
    return code
  },

  formState: {
    database: default_database,
    username: default_username,
    password: default_password,
    verificationCode: default_code
  },

  checkVerificationCode(values) {
    const { verificationCode } = values
    // console.log('asda', [verificationCode, this.storeVerificationCode])
    return verificationCode
      ? verificationCode === this.storeVerificationCode
      : false
  },

  async handleLogin(values) {
    const { database, username, password, lang } = values
    if (!this.checkVerificationCode(values)) {
      return false
    } else {
      const info = await api.login({
        db: database,
        login: username,
        password: password
      })

      await api.env.set_lang(lang)

      return info
    }
  }
}
