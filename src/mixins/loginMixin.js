import api from '@/api'
const Mixin = {
  data() {
    const database = process.env.VUE_APP_ODOO_DB

    const base_api = process.env.VUE_APP_BASE_API

    const username = base_api === '/dev-api' ? 'admin' : ''
    const password = base_api === '/dev-api' ? '123456' : ''
    // username: 'admin',
    // password: '123456'

    return {
      form2: {
        database,
        username,
        password
      },

      database_options: [],

      rules: {
        database: [
          {
            required: true,
            message: 'Please select database!',
            trigger: ['change', 'blur']
          }
        ],
        username: [
          {
            required: true,
            message: 'Please input your username!',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: 'Please input your password!',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    login_rules() {
      return {
        database: [{ required: true, message: '密码不能为空' }],
        username: [{ required: true, message: '账号不能为空' }],
        password: [{ required: true, message: '密码不能为空' }]
      }
    }
  },
  async created() {},

  methods: {
    async init() {
      // const db = process.env.VUE_APP_ODOO_DB
      const dbs = await api.web.datebase.list()
      // this.database_options = dbs.filter(item => (db ? item === db : true))
      this.database_options = dbs
    },

    async handleLogin(values, success, error) {
      try {
        // const res =
        console.log(values)
        await api.login({
          db: values.database,
          login: values.username,
          password: values.password
        })

        console.log(api.session_info)
        if (success) {
          success(api.session_info)
        }
      } catch (e) {
        console.log(e)
        if (error) {
          error(e)
        }
      }
    },

    async handleLogout() {
      await api.logout()
    }
  }
}

export default Mixin
