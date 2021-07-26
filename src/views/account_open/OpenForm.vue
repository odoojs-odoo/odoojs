<template>
  <div>
    <h1>{{ '期初设置' }}</h1>
    <Divider />

    <span v-if="dataDict.parent_state && dataDict.parent_state === 'draft'">
      <span v-if="editable">
        <Button type="primary" @click="handleOnCommit">保存</Button>
        <Button @click="handleOnCancel">放弃</Button>
      </span>

      <span v-else>
        <Button type="primary" @click="handleOnWrite">编辑</Button>
        <!-- <Button @click="handleOnCreate">创建</Button> -->

        <span> &nbsp;.&nbsp;.&nbsp;&nbsp;.&nbsp;</span>
        <Button @click="handleOnUnlink">删除</Button>
      </span>
    </span>

    <Divider />

    <Row>
      <Col span="1"> .</Col>
      <Col span="12">
        <Form label-position="left" :label-width="108">
          <FormItem label-for="account_id">
            <span slot="label">
              <b> {{ '科目' }} </b>
            </span>
            <span v-if="!editable">
              {{ dataDict.account_id__name }}
            </span>
            <span v-else>
              <SelectM2o
                v-model="formData.account_id"
                element-id="account_id"
                :label="dataDict.account_id__name"
                :limit="7"
                placeholder="选择科目"
                :optionsMethod="
                  ({ query, limit }) =>
                    selectOptionsMethod({ field: 'account_id', query, limit })
                "
                @on-change="
                  (value, text) => onchange('account_id', value, text)
                "
              />
            </span>
          </FormItem>
          <FormItem label-for="debit">
            <span slot="label">
              <b> {{ '借方' }} </b>
            </span>
            <span v-if="!editable">
              {{ dataDict.debit }}
            </span>
            <span v-else>
              <Input2
                v-model="formData.debit"
                element-id="debit"
                type="number"
                :number="true"
                @on-change="value => onchange('debit', value)"
              />
            </span>
          </FormItem>
        </Form>
      </Col>
      <Col span="11">
        <Form label-position="left" :label-width="108">
          <FormItem label-for="name">
            <span slot="label">
              <b> {{ '摘要' }} </b>
            </span>
            <span v-if="!editable">
              {{ dataDict.name }}
            </span>
            <span v-else>
              <Input2
                v-model="formData.name"
                element-id="name"
                type="text"
                @on-change="value => onchange('name', value)"
              />
            </span>
          </FormItem>

          <FormItem label-for="credit">
            <span slot="label">
              <b> {{ '贷方' }} </b>
            </span>
            <span v-if="!editable">
              {{ dataDict.credit }}
            </span>
            <span v-else>
              <Input2
                v-model="formData.credit"
                element-id="credit"
                type="number"
                :number="true"
                @on-change="value => onchange('credit', value)"
              />
            </span>
          </FormItem>
        </Form>
      </Col>
    </Row>

    <Divider />

    <div>
      <div>&nbsp;</div>
    </div>
  </div>
</template>

<script>
import formRpcMixin from '@/mixins/formRpcMixin'

import api from '@/api'

import Input2 from './Input2'
import SelectM2o from '@/components/SelectM2o'

export default {
  name: 'AccountOpenForm',
  components: { Input2, SelectM2o },
  mixins: [formRpcMixin],

  props: {},

  data() {
    return {}
  },
  computed: {},

  watch: {},

  async created() {
    await this.init()
  },

  async mounted() {},

  methods: {
    async init() {
      console.log('init,', this.$route)
      const query = this.$route.query
      const move_id = Number(query.move_id)

      const model_name = this.$route.meta.model
      const Model2 = api.env.model(model_name)
      const Model = Model2.with_context({ default_move_id: move_id })

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

    async handleOnCommit() {
      const error = e => {
        this.$Message.error(e.data.message)
      }
      this.handleCommit(null, error)
    },

    handleOnUnlink() {
      console.log(' handleOnUnlink ')
      //
      this.$Modal.confirm({
        title: '确认删除',
        content: '<p>要删除么?</p><p>点击确认或取消</p>',
        onOk: async () => {
          const success = () => {
            this.goto_treeform()
          }
          const error = e => {
            this.$Message.error(e.data.message)
          }

          await this.handleUnlink(success, error)
        },
        onCancel: () => {
          // this.$Message.info('Clicked cancel')
        }
      })
    },

    async onchange(fname, value, text) {
      this.handleOnchange(fname, value, { text })
    },

    selectOptionsMethod(payload) {
      return this.get_options(payload)
    }
  }
}
</script>

<style type="text/css"></style>
