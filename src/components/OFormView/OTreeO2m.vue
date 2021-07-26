<template>
  <div>
    <span v-if="editable">
      <!-- {{ columns_edit }}
      {{ form_data }} -->
      <Form ref="formRef" :model="form_data" :rules="form_rule">
        <Table stripe :columns="columns_edit" :data="data2"> </Table>

        <Table
          :show-header="false"
          :columns="columns_action"
          :data="dataAction"
        >
        </Table>
      </Form>
    </span>
    <span v-else-if="columns_readonly.length">
      <Table stripe :columns="columns_readonly" :data="data"> </Table>
    </span>

    <!-- for debug -->
    <!-- <Table :columns="columns_readonly" :data="data"> </Table> -->

    <div>
      <div>&nbsp;</div>
    </div>
  </div>
</template>

<script>
import OMixinO2m from './OMixinO2m'
import SelectM2o from '@/components/SelectM2o'
export default {
  name: 'OTreeO2m',
  components: {},
  mixins: [OMixinO2m],
  props: {
    columns: { type: Array, default: () => [] }
  },
  data() {
    return {
      currentrow: {},
      form_data: {},
      new_data: [],
      data_updated: undefined
    }
  },
  computed: {
    data2() {
      // 正在编辑的行, 数据在 form_data
      // 因此 仅仅 有该行即可
      const data = this.data_updated || this.data
      const new_data = this.new_data
      return [...data, ...new_data]
    },

    dataAction() {
      const action_line = this.editable ? [{ id: '_action_row' }] : []
      return action_line
    },

    columns_readonly() {
      // console.log(this.columns)
      return this.columns
        .filter(item => item.key !== 'sequence')
        .map(item => {
          return {
            ...item,
            key: item.key__name || item.key
          }
        })
    },

    columns_action() {
      return [
        {
          render: (h /*{ row, column }*/) => {
            const onClick = e => {
              e.stopPropagation()
              this.handleOnRowCreate()
            }
            return h('Button', { on: { click: onClick } }, '新增')
          }
        }
      ]
    },

    columns_edit() {
      const cols = this._columns_edit_for_fields
      const actions = [
        { title: ' ', key: '_action', render: this.render_action }
      ]
      return [...cols, ...actions]
    },

    _columns_edit_for_fields() {
      return this.columns
        .filter(item => item.key !== 'sequence')
        .map(item => {
          return {
            ...item,
            render: (h, { row, column }) => {
              // console.log('render.....', row, column.key, column)

              if (row.id === this.currentrow.id) {
                return h('FormItem', { attrs: { prop: column.key } }, [
                  this.render_cell(h, { row, column })
                ])
              } else {
                const key = column.key__name || column.key
                return h('span', {}, row[key])
              }
            }
          }
        })
    },

    form_rule() {
      const model = this.modelMethod()
      if (model && this.currentrow.id) {
        const rules = this.columns.reduce((acc, cur) => {
          const node = cur.node
          console.log(model, node)

          const required = model.get_required(
            this.currentrow.id,
            node,
            this.currentrow
          )

          const validator = (rule, value, callback) => {
            // console.log('rule, -- : ', cur.key, rule, value)
            if (!value) {
              callback(new Error(`${cur.title}不能为空`))
            } else {
              callback()
            }
          }

          if (required) {
            const rule = [{ validator, trigger: 'blur' }]
            const { tag } = cur.render_info
            const is_select = tag === 'select'
            if (is_select) {
              rule.push({ validator, trigger: 'change' })
            }
            acc[cur.key] = rule
          }

          return acc
        }, {})

        return rules
      } else {
        return {}
      }
    }
  },

  watch: {},

  async created() {
    this.data_updated = undefined
  },

  mounted() {
    this.data_updated = undefined
  },

  methods: {
    async handleOnchange(rid, field, value, text) {
      console.log('handleOnchange', { rid, field, value, text })
      const model = this.modelMethod()

      if (model) {
        await model.onchange_row(rid, field, value, text)

        this.currentrow = { ...model.currentrow }
        console.log('handleOnchange', this.currentrow)
        this.form_data = { ...model.values_edit }
        // 新增或 编辑后的 onchange
        // 无需 更新 this.new_data
        // this.new_data = []
      }
    },

    async handleOnRowCreate() {
      console.log('handleOnRow Create')
      const model = this.modelMethod()
      if (model) {
        await model.new()

        this.currentrow = { ...model.currentrow }
        console.log('handleOnRow New', this.currentrow)
        const values = model.values_edit
        this.form_data = { ...values }
        // this.new_data 仅仅是 占 row 用的, 其数据 不重要
        // this.form_data 中是 正在编辑的数据
        this.new_data = [{ ...values }]
        console.log(values)

        // TBD, 打开编辑时 , 初始化  selection 的 options
        // await model.init_selection()
      }
    },

    async handleOnRowEdit(row) {
      console.log('handleOnRow Edit', row.id, row)
      const model = this.modelMethod()
      if (model) {
        model.set_current(row.id, row)
        this.currentrow = { ...model.currentrow }
        console.log('handleOnRow Edit', this.currentrow)
        this.form_data = { ...model.values_edit }
        this.new_data = []

        // TBD, 打开编辑时 , 初始化  selection 的 options
        // await model.init_selection()
      }
    },

    async onRowDel(row) {
      const model = this.modelMethod()
      if (model) {
        await model.remove(row.id)

        this.currentrow = { ...model.currentrow }
        this.new_data = []
        this.form_data = {}
        console.log(model.values_list)
        this.data_updated = [...model.values_list]
      }
    },

    async handleOnRowDel(row) {
      console.log('handleOnRow Del', row.id, row)
      this.$Modal.confirm({
        title: '确认删除',
        content: '<p>要删除么?</p><p>点击确认或取消</p>',
        onOk: async () => {
          try {
            await this.onRowDel(row)
          } catch (e) {
            console.log(e)
            // await sleep(300)
            this.$Modal.error({
              title: '错误',
              content: e.data.message
            })
          }
        },

        onCancel: () => {
          // this.$Message.info('Clicked cancel')
        }
      })
    },

    async handleOnRowSave(row) {
      console.log('click handleOnRowSave', row.id, row)
      // await sleep(1000)
      // this.$refs['formRef'].validateField('name')
      // this.$refs['formRef'].validateField('account_id')

      this.$refs['formRef'].validate(async valid => {
        //   console.log('click handleOnRowSave', valid)
        if (valid) {
          const model = this.modelMethod()
          if (model) {
            await model.commit_row(row.id)
            this.currentrow = { ...model.currentrow }
            this.new_data = []
            this.form_data = {}
            console.log(model.values_list)
            this.data_updated = [...model.values_list]
          }
        }
      })
    },

    async handleOnRowCancel(row) {
      console.log('click handleOnRowCancel', row.id, row)
      const model = this.modelMethod()
      if (model) {
        model.rollback(row.id)
        this.currentrow = { ...model.currentrow }
        this.new_data = []
        this.form_data = {}
      }
    },

    render_action(h, { row }) {
      const render_button = (h, { icon, onclick }) => {
        const onClick = e => {
          e.stopPropagation()
          onclick()
        }
        return h('Button', { attrs: { icon }, on: { click: onClick } })
      }

      const render_edit = (h, { row }) => {
        return render_button(h, {
          icon: 'ios-create-outline',
          onclick: () => this.handleOnRowEdit(row)
        })
      }

      const render_del = (h, { row }) => {
        return render_button(h, {
          icon: 'ios-trash-outline',
          onclick: () => this.handleOnRowDel(row)
        })
      }

      const render_save = (h, { row }) => {
        return render_button(h, {
          icon: 'ios-checkmark',
          onclick: () => this.handleOnRowSave(row)
        })
      }

      const render_cancel = (h, { row }) => {
        return render_button(h, {
          icon: 'ios-undo',
          onclick: () => this.handleOnRowCancel(row)
        })
      }

      const isCurrent = row.id === this.currentrow.id
      // const btn1 = isCurrent
      //   ? render_save(h, { row })
      //   : render_edit(h, { row })
      // const btn2 = isCurrent
      //   ? render_cancel(h, { row })
      //   : render_del(h, { row })
      // const btns =  [btn1, ' ', btn2]

      const btns = isCurrent
        ? [render_save(h, { row }), ' ', render_cancel(h, { row })]
        : [render_edit(h, { row }), ' ', render_del(h, { row })]

      return h('span', btns)
    },

    render_cell(h, { row, column }) {
      console.log('render_cell', row, column.key, column)
      const { tag, type: input_type } = column.render_info
      if (tag === 'input') {
        return this.render_input(h, { row, column, input_type })
      } else if (tag === 'select') {
        return this.render_select(h, { row, column })
        // return h('span', {}, [column.key, 'is select'])
      } else if (tag === 'select2') {
        // return this.render_select(h, { row, column })
        return h('span', {}, [column.key, ' is select2'])
      } else {
        return h('span', {}, [column.key, 'to set render_info'])
      }
    },

    render_input(h, { column, input_type }) {
      const self = this
      return h('Input', {
        attrs: {
          value: self.form_data[column.key],
          type: input_type,
          number: input_type === 'number'
        },
        on: {
          input: function(value) {
            self.form_data = { ...self.form_data, [column.key]: value }
          },
          // eslint-disable-next-line no-unused-vars
          'on-blur': event => {
            // const value = event.target.value
            // console.log(
            //   'blur:',
            //   column.key,
            //   value,
            //   typeof value,
            //   self.form_data
            // )

            const value = self.form_data[column.key]

            self.handleOnchange(self.form_data.id, column.key, value)
          }
        }
      })
    },

    render_select(h, { column }) {
      const self = this
      return h(SelectM2o, {
        attrs: {
          value: self.form_data[column.key],
          label: self.form_data[`${column.key}__name`],
          placeholder:
            column.node.attrs.placeholder ||
            column.node.attrs.string ||
            '请选择',
          optionsMethod: ({ query, limit }) => {
            // console.log('xxxxxx,', column)
            return self.get_options(self.form_data.id, column.key, {
              query,
              limit,
              node: column.node
            })
          }
        },
        on: {
          input(value) {
            self.form_data = { ...self.form_data, [column.key]: value }
          },
          'on-change': function(value, text) {
            self.handleOnchange(self.form_data.id, column.key, value, text)
          }
        }
      })
    },

    async get_options(row_id, field, { query, limit, node }) {
      const model = this.modelMethod()
      if (model) {
        return await model.get_selection(field, { query, limit, node, row_id })
      } else {
        return []
      }
    }
  }
}
</script>

<style type="text/css"></style>
