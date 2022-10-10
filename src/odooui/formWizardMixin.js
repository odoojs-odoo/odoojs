import formBaseMixin from './formBaseMixin'

import api from '@/odoorpc'

import { try_call } from '@/odoorpc/tools'

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
    action: { type: [String, Object], default: undefined },
    actionIds: { type: Array, default: () => [] }
  },

  data() {
    return {
      //
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
      // api
      console.log('init', this.action, this.actionIds)

      const view = api.env.wizardview(this.action, {
        active_ids: this.actionIds
      })
      this.view = view
      console.log('init', view)

      this.fields = await view.load_fields()
      console.log('init', this.fields, view)
      this.viewInfo = view.view_info

      await sleep(10)

      await this.load_relation()

      const dataInfo = await view.onchange_new()
      const { values } = dataInfo

      this.formValues = values
      this.record = {}
      this.values = values

      await sleep(10)

      const res = await this.load_relation_data(true)
      console.log('wizard, init, load rel data:', res, view)
      this.editable = true
    },

    async button_click(btn) {
      console.log(btn)

      // await sleep(1000)

      const { error, result } = await try_call(async () => {
        return await this.view.wizard_button_clicked({
          ...btn
        })
      })

      if (error) {
        console.log('btn click2 error', [error, result])
        this.$error({ title: '用户错误', content: error.data.message })
      } else {
        // if (!result) {
        //   const res_id = this.record.id
        //   this.load_data(res_id)
        // } else {
        //   console.log('todo ret action')
        //   // this._action_return(result)
        // }
      }
    },

    // 任何字段 change时 触发
    // 测试用, 暂时取消 校验
    async handleChange(fname, value) {
      console.log('handleChange', fname, value)
      //
      // const validate = async (done, { formValues, values }) => {
      //   this.formValues = { ...this.formValues, ...formValues }
      //   this.values = { ...this.values, ...values }
      //   await sleep(100)
      //   this.$refs.refForm.validate(async valid => {
      //     // console.log('form valid', valid)
      //     done(valid)
      //   })
      // }
      //
      const result = await this.view.onchange(fname, {
        value
        // validate
      })

      // // console.log('handleChange ok', fname, value, result)

      const { values: values2 = {} } = result
      this.values = values2
      this.formValues = { ...this.formValues, ...values2 }
    },

    async handelCommit() {
      //  wizard form 不需要 handelCommit
    }
  }
}
