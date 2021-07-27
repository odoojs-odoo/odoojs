import api from '@/api'
const Mixin = {
  data() {
    // const database = 'test_db'
    const database = 'test_account_0521'

    return {
      form: {
        database,
        username: 'admin',
        password: '123456'
      },

      database_options: []
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
      const db = process.env.VUE_APP_ODOO_DB
      const dbs = await api.web.datebase.list()
      this.database_options = dbs.filter(item => (db ? item === db : true))
    },

    async handleLogin(success, error) {
      try {
        // const res =
        await api.login({
          db: this.form.database,
          login: this.form.username,
          password: this.form.password
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
