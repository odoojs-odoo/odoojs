import { inject, ref, reactive } from 'vue'
import api from '@/odoorpc'

const randInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min
}

const username_env = process.env.VUE_APP_ODOO_USER
const password_env = process.env.VUE_APP_ODOO_PASSWORD
const process_env = process.env.NODE_ENV
// const process_env = 'production'

// console.log(process_env)
// console.log(for_demo)
// console.log(username_env)
// console.log(password_env)
const default_database = process.env.VUE_APP_ODOO_DB

const is_dev = process_env === 'development' || default_database === 'odoojs'

const default_show_db = process_env === 'development'

const default_username = is_dev ? username_env : ''
const default_password = is_dev ? password_env : ''

const default_codenum = String(randInt(1000, 9999))
const default_vcode = is_dev ? default_codenum : ''

export function useLogin() {
  const lang = inject('lang')

  const show_db = default_show_db

  const formState = reactive({
    database: default_database,
    username: default_username,
    password: default_password,
    verificationCode: default_vcode
  })

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
    show_db,
    lang,
    formState,
    databaseOptions,
    load_databaseOptions,
    codeNum,
    onClickCodeNum,
    handleLogin
  }
}
