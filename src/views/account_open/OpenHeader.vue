<template>
  <div>
    <Row>
      <Col span="1"> .</Col>
      <Col span="12">
        <span v-for="(btn, index) in header_buttons" :key="index">
          <Button :type="button_type(btn)" size="small" @click="onClick(btn)">
            {{ btn.attrs.string }} </Button
          >.
        </span>
      </Col>
      <Col span="11">
        <!-- {{ header_statusbar_visible }} -->
        <span v-for="(btn, index) in header_statusbar_visible" :key="index">
          <Tag :color="btn[0] === dataDict.state ? 'blue' : undefined">
            {{ btn[1] }}
          </Tag>
        </span>
      </Col>
    </Row>

    <Divider />

    <Row>
      <Col span="1"> </Col>
      <Col span="12">
        <Form label-position="left" :label-width="108">
          <FormItem label-for="date">
            <span slot="label">
              <b> {{ '时间' }} </b>
            </span>

            <div v-if="!editable">{{ dataDict.date }}</div>

            <div v-else>
              <DatePicker
                type="date"
                v-model="move_date"
                transfer
                @on-change="onChangeDate"
              />
            </div>

            <Button
              v-if="dataDict.state === 'draft' && !editable"
              @click="editable = true"
              >编辑日期</Button
            >

            <Button
              v-if="dataDict.state === 'draft' && editable"
              @click="write_move"
              >保存</Button
            >
          </FormItem>
        </Form>
      </Col>
      <Col span="11">
        <Form label-position="left" :label-width="108">
          <FormItem label-for="date">
            <span slot="label">
              <b> {{ '试算平衡' }} </b>
            </span>

            <div>
              {{
                `借:${bal_values.credit || 0}   贷: ${bal_values.debit || 0}`
              }}
            </div>
          </FormItem>
        </Form>
      </Col>
    </Row>

    <Divider />
  </div>
</template>

<script>
export default {
  name: 'OpenHeader',
  components: {},
  mixins: [],

  props: {
    model: { type: Object, default: () => undefined }
  },

  data() {
    return {
      dataDict: {},
      move_date: null,
      move_date_changed: null,

      editable: false,

      bal_values: {}
    }
  },
  computed: {
    header_buttons() {
      const buttons = [
        {
          tagName: 'button',
          attrs: { type: 'object', name: 'action_post', string: '发布' },
          class: 'oe_highlight',
          invisible: ['posted', 'cancel'].includes(this.dataDict.state)
        },
        {
          tagName: 'button',
          attrs: { type: 'object', name: 'button_cancel', string: '取消' },
          invisible: ['cancel'].includes(this.dataDict.state)
        },
        {
          tagName: 'button',
          attrs: { type: 'object', name: 'button_draft', string: '重置为草稿' },
          invisible: ['draft', 'posted'].includes(this.dataDict.state)
        }
      ]

      return buttons.filter(item => {
        return !item.invisible
      })
    },

    header_statusbar() {
      return {
        tagName: 'field',
        attrs: {
          widget: 'statusbar',
          name: 'state',
          string: '状态',
          statusbar_visible: 'draft,posted,cancel'
        }
      }
    },

    header_statusbar_visible() {
      const node_statusbar = this.header_statusbar
      if (node_statusbar) {
        const str = node_statusbar.attrs.statusbar_visible || ''
        if (!str) {
          return []
        }

        const states = str.split(',')
        const fname = node_statusbar.attrs.name

        const current_state = this.dataDict[fname]

        if (current_state && !states.includes(current_state)) {
          states.push(current_state)
        }

        // console.log(this.model)

        const selections2 = this.model ? this.model.fields.state.selection : []
        const selections = selections2.reduce((acc, cur) => {
          return { ...acc, [cur[0]]: cur[1] }
        }, {})

        return states.map(item => [item, selections[item] || item])
      } else {
        return []
      }
    }
  },

  watch: {
    model(newVal) {
      //   console.log('watch, show, val', newVal, oldVal)

      if (newVal) {
        this.init()
      }
    }
  },

  async created() {
    // await this.init()
  },

  mounted() {},
  methods: {
    async init() {
      const model = this.model
      this.dataDict = { ...this.model.values }
      this.move_date = model.values.date

      const Model2 = model.env.model(this.$route.meta.model)
      const Model = Model2.with_context({ default_move_id: model.id })
      //   console.log([Model])
      const bal_line = await Model.open_move_balance_line_get()
      //   console.log(model, bal_line)

      this.bal_values = { ...bal_line.values }
    },

    button_type(btn_node) {
      if ((btn_node.class || '').includes('oe_highlight')) {
        return 'primary'
      }
    },

    onClick(btn) {
      this.handleButtonClicked({ ...btn.attrs })
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
    },

    onChangeDate(value) {
      //   console.log(value)
      this.move_date_changed = value
    },

    async write_move() {
      //   console.log(this.move_date, this.move_date_changed)
      if (this.move_date_changed) {
        await this.model.set_and_onchange('date', this.move_date_changed)
        await this.model.commit()
        this.dataDict = { ...this.model.values }
      }

      this.editable = false
    }
  }
}
</script>

<style type="text/css"></style>
