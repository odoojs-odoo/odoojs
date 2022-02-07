import api from '@/odooapi'

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
      const dbs = await api.web.database.list()
      // this.database_options = dbs.filter(item => (db ? item === db : true))
      this.database_options = dbs
    },

    async handleLogin(values, success, error) {
      try {
        const info = await api.web.login({
          db: values.database,
          login: values.username,
          password: values.password
        })

        // const html = await api.web.http_call('/my/home')
        // const h1 = html.split('<body>')[1]
        // const h2 = h1.split('</body>')[0]
        // console.log('/my/home', h2)

        // const res2 = toJSON(h2)
        // console.log('/my/home', res2)

        // const { session } = info
        // const User = api.env.model('res.users')
        // const uid = session.uid
        // const fields = ['name', 'email']
        // const user = await User.read(uid, { fields })
        // console.log(user)

        if (success) {
          success(info)
        }
      } catch (e) {
        console.log(e)
        if (error) {
          error(e)
        }
      }
    }
  }
}

export default Mixin
