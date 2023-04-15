import { inject, ref, reactive } from 'vue'
import api from '@/odoorpc'

// const randInt = (min, max) => {
//   return Math.floor(Math.random() * (max - min)) + min
// }

// const default_codenum = String(randInt(1000, 9999))

const randInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min
}

const username_env = process.env.VUE_APP_ODOO_USER
const password_env = process.env.VUE_APP_ODOO_PASSWORD
const base_api = process.env.VUE_APP_BASE_API

const is_dev = base_api === '/dev-api'

const default_database = process.env.VUE_APP_ODOO_DB
const default_username = is_dev ? username_env : ''
const default_password = is_dev ? password_env : ''
const default_codenum = String(randInt(1000, 9999))
const default_vcode = is_dev ? default_codenum : ''

export function useLogin() {
  const lang = inject('lang')

  const formState = reactive({
    database: default_database,
    username: default_username,
    password: default_password,
    verificationCode: default_vcode
  })

  // console.log(formState)

  const databaseOptions = ref([])
  async function load_databaseOptions() {
    const ops = await api.web.database.list()
    databaseOptions.value = ops.map(item => {
      return { value: item, label: item }
    })
  }

  const codeNum = ref(default_codenum)

  function onClickCodeNum() {
    codeNum.value = String(randInt(1000, 9999))
  }

  async function handleLogin(values) {
    const { verificationCode, ...values2 } = values
    const codeNum2 = codeNum.value
    // console.log('onFinish:', values2, verificationCode, codeNum2)

    if (verificationCode !== codeNum2) {
      return false
    } else {
      const { database, username, password } = values2

      const kw = { db: database, login: username, password: password }

      // next for odoojs
      const info = await api.login(kw)
      await api.env.set_lang(lang.value)

      // last for odoojs
      // next for vwat
      // const info = await api.web.login(kw)
      // last for vwat

      return info
    }
  }

  return {
    lang,
    formState,
    databaseOptions,
    load_databaseOptions,
    codeNum,
    onClickCodeNum,
    handleLogin
  }
}
