// eslint-disable-next-line no-unused-vars
const cp = val => JSON.parse(JSON.stringify(val))

function sleep(millisecond) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, millisecond)
  })
}

export default {
  components: {},
  mixins: [],
  props: {},

  data() {
    return {
      view: undefined, // 对象, 接口函数的入口
      viewInfo: {},
      fields: {}, // 模型的字段信息

      record: {},
      values: {},

      formValues: {}, // 编辑页面用
      editable: false // 编辑状态
    }
  },

  computed: {
    dataInfo() {
      return { record: this.record, values: this.values }
    },

    rules_edit() {
      // console.log(this.fields)

      return Object.values(this.fields).reduce((acc, meta) => {
        if (meta.required) {
          const required =
            typeof meta.required === 'function'
              ? meta.required({
                  record: { ...this.record, ...this.values }
                })
              : meta.required

          if (required) {
            acc[meta.name] = [
              { required: true, message: '不能为空!', trigger: ['change'] }
            ]
          }
        }
        return acc
      }, {})
    }
  },

  watch: {},

  created() {},

  mounted() {},

  methods: {
    meta_get(fname) {
      return this.fields[fname] || {}
    },

    invisible_get(meta = {}) {
      return typeof meta.invisible === 'function'
        ? meta.invisible({ record: { ...this.record, ...this.values } })
        : meta.invisible
    },

    async load_relation() {
      let relations = {}

      // 自定义 a-form-model
      if (this.$refs.refForm) {
        if (this.$refs.refForm.load_relation) {
          const rels = await this.$refs.refForm.load_relation()
          relations = { ...relations, ...(rels || {}) }
        }
      }

      // 对于自定义 页面
      // realtion field 必须 定义 ref 参数
      // 且命名为 以 refRelation 开头 如: refRelation_child_ids
      const refRelations = Object.keys(this.$refs).filter(
        item => item.slice(0, 11) === 'refRelation'
      )

      for (const strRef of refRelations) {
        const ref = this.$refs[strRef]

        if (ref) {
          const rels = await ref.load_relation()
          relations = { ...relations, ...(rels || {}) }
        }
      }

      const refFields = this.$refs.refField || []
      for (const refField of refFields) {
        const rels = await refField.load_relation()
        relations = { ...relations, ...(rels || {}) }
      }

      this.view.load_relations_done(relations)
      console.log('relations', this.view, relations)
    },

    async load_data(res_id) {
      const view = this.view
      const record = await view.read(res_id)
      this.record = record
      this.values = {}
      await sleep(10)
      await this.load_relation_data()
    },

    async load_relation_data(for_new) {
      // for_new=true, only for wizard form
      if (this.$refs.refForm) {
        if (this.$refs.refForm.load_relation_data) {
          const res = await this.$refs.refForm.load_relation_data(for_new)
          // TODO: values_write
        }
      }

      const refRelations = Object.keys(this.$refs).filter(
        item => item.slice(0, 11) === 'refRelation'
      )

      for (const strRef of refRelations) {
        const ref = this.$refs[strRef]

        if (ref) {
          await ref.load_relation_data(for_new)
          // TODO: values_write
        }
      }

      const refFields = this.$refs.refField || []
      for (const refField of refFields) {
        await refField.load_relation_data(for_new)
        // TODO: values_write
      }
    },

    // 任何字段 change时 触发
    async handleChange(fname, value) {
      // console.log('handleChange', fname, value)

      const validate = async (done, { formValues, values }) => {
        this.formValues = { ...this.formValues, ...formValues }
        this.values = { ...this.values, ...values }
        await sleep(100)
        this.$refs.refForm.validate(async valid => {
          // console.log('form valid', valid)
          done(valid)
        })
      }

      const result = await this.view.onchange(fname, { value, validate })

      // console.log('handleChange ok', fname, value, result)

      const { values: values2 = {} } = result
      this.values = values2
      this.formValues = { ...this.formValues, ...values2 }
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
        if (this.res_id) {
          await this.load_data(id_ret)

          this.editable = false
        } else {
          const menu = this.$route.query.menu
          const query = { menu, view_type: 'form', id: id_ret }
          const path = this.$route.path
          this.$router.replace({ path, query })
        }
      } else {
        // 校验失败
      }
    }
  }
}
