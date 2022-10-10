import formBaseMixin from './formBaseMixin'

import api from '@/odoorpc'

function sleep(millisecond) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, millisecond)
  })
}

export default {
  components: {},
  mixins: [formBaseMixin],
  props: {
    action: { type: String, default: undefined },
    resId: { type: Number, default: 0 }
  },

  data() {
    return {
      res_id: undefined
    }
  },
  computed: {
    title() {
      if (this.view) {
        const action_info = this.view.action_info
        return action_info.name
      } else {
        return ''
      }
    },

    arch_buttons() {
      if (!this.view) {
        return []
      }

      return this.view.arch_buttons(this.record, this.values)
    }
  },
  watch: {},

  async created() {},

  async mounted() {},

  methods: {
    async init() {
      //
      console.log('init', this.action, this.resId)
      const res_id = this.resId

      this.res_id = res_id
      const view = api.env.formview(this.action)

      this.view = view
      this.fields = await view.load_fields()
      this.viewInfo = view.view_info

      await sleep(10)

      await this.load_relation()

      await sleep(10)

      await this.load_data(res_id)

      // 根据状态 判断 是否 编辑

      this.set_editable()
      this.editable = true

      //   const view = api.env.wizardview(this.action, {
      //     active_ids: this.actionIds
      //   })
      //   this.view = view
      console.log('init', view)
    },

    async set_editable() {
      this.formValues = this.view.set_editable(this.record)
      this.values = {}
    },

    async handelCommit() {
      const validate = async done => {
        await sleep(100)
        this.$refs.refForm.validate(async valid => {
          // console.log('form commit valid', valid)
          done(valid)
        })
      }

      const id_ret = await this.view.commit({ validate })

      if (id_ret) {
        await this.load_data(id_ret)
        this.editable = false
      } else {
        // 校验失败
      }
    }
  }
}
