import api from '@/api'

const Mixin = {
  data() {
    return {
      model: undefined,
      dataDict: {},
      formData: {},
      editable: false
    }
  },
  computed: {},

  watch: {},

  async created() {},

  mounted() {},

  methods: {
    async init() {
      const query = this.$route.query
      // 这里的  model_name 都是  odoorpc.addons 中, 自定义的 扩展 model
      // 不是 odoo 的 原生 model.
      // 自定义的 扩展 model 中, 补充了 default_fields 信息

      const model_name = this.$route.meta.model
      const Model = api.env.model(model_name)

      this.dataDict = {}
      this.formData = {}

      const rid = query.id ? Number(query.id) : false
      const rec = rid ? await Model.browse(rid) : await Model.new_and_onchange()

      if (!rid) {
        this.editable = true
      }

      this.dataDict = { ...rec.values }
      this.formData = { ...rec.values }

      console.log('init,', rec, rec.values)
      this.model = rec
    },

    handleOnWrite() {
      console.log(' handleOnWrite ')
      // this.$emit('on-btn-write')
      this.editable = true
    },

    async handleOnUnlink() {
      console.log(' handleOnUnlink ')
      // to be override .  to show dialog
      await this.handleUnlink()
    },

    async handleUnlink(success, error) {
      console.log(' handleUnlink ')
      try {
        await this.model.unlink()
        if (success) {
          success(true)
        }
      } catch (e) {
        console.log(e)
        if (error) {
          error(e)
        }
      }
    },

    async handleOnCommit() {
      // to be override .  to show dialog
      await this.handleCommit()
    },

    async handleCommit(success, error) {
      console.log(' handleOnCommit ')
      try {
        await this.model.commit()

        this.dataDict = { ...this.model.values }
        this.formData = { ...this.model.values }
        this.editable = false
        if (success) {
          success(true)
        }
      } catch (e) {
        console.log(e)
        if (error) {
          error(e)
        }
      }
    },

    goto_treeform() {
      const action_ref = this.$route.meta.name
      const path = `/web/${action_ref}/list`
      this.$router.replace({ path })
    },

    handleOnCancel() {
      const query = this.$route.query
      const rid = query.id ? Number(query.id) : false

      if (!rid) {
        this.goto_treeform()
      } else {
        this.model.rollback()
        this.dataDict = { ...this.model.values }
        this.formData = { ...this.model.values }
        this.editable = false
      }
    },

    async handleOnchange(fname, value, { text }) {
      console.log('handleOnchange', [fname, value, text])
      await this.model.set_and_onchange(fname, value, { text })
      this.dataDict = { ...this.model.values }
      this.formData = { ...this.model.values }

      console.log('handleOnchange3', this.model.values)
    },

    async get_options(payload) {
      const { field, query, limit } = payload
      // console.log(' get_options, ', field, this.model.select_options)
      const kwargs = { query, limit }
      const options = await this.model.get_selection(field, kwargs)
      return options
    },

    async handleButtonClicked(payload = {}) {
      //   console.log(payload)
      const { type, name } = payload
      const res = await this.model.button_clicked(type, name)

      if (!res) {
        this.dataDict = { ...this.model.values }
      } else {
        // 返回 action 自行处理
        // console.log(res, deep_copy(res.view.view_node))
      }
    }
  }
}

export default Mixin
