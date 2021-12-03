<template>
  <div>
    <!-- width="600" -->
    <a-modal
      :title="node.attrs.string"
      :width="800"
      :visible="showModal"
      @cancel="() => (showModal = false)"
    >
      <!-- {{ editable }} -->

      <!-- {{ fname }}
      {{ subDataInfo }}
      {{ subViewInfo }} -->

      <OFormView
        :parent-span="12"
        :editable="editable"
        :loading="loading"
        :data-info="subDataInfo"
        :view-info="subViewInfo"
        :method-call="subMethodCall"
        @on-event="handleSubOnEvent"
      />

      <template slot="footer">
        <a-space v-if="editable">
          <a-button key="commit" @click="() => handleOnCommit()">
            保存
          </a-button>
          <a-button key="rollback" @click="() => handleOnRollback()">
            丢弃
          </a-button>

          <a-button key="remove" @click="() => handleOnRemove()">
            移出
          </a-button>
        </a-space>

        <a-space v-else>
          <a-button key="back" @click="() => (showModal = false)">
            关闭
          </a-button>
        </a-space>
      </template>
    </a-modal>
  </div>
</template>
<script>
import OMixin from '@/components/OFormView/OMixin'

// eslint-disable-next-line no-unused-vars
const cp = val => JSON.parse(JSON.stringify(val))

// import { sleep } from '@/odoorpc/utils'

export default {
  name: 'OSubForm',
  components: {
    OFormView: () => import('@/components/OFormView/index.vue')
  },
  mixins: [OMixin],

  props: {
    visible: { type: Boolean, default: false }
  },

  data() {
    return {
      treeModel: undefined,
      formModel: undefined,
      formNode: { children: [] }
    }
  },

  computed: {
    showModal: {
      get() {
        return this.visible
      },

      set(value) {
        this.$emit('update:visible', value)
      }
    },

    fname() {
      return this.node.attrs.name
    },

    subDataInfo() {
      const relation = this.dataInfo.relation || {}
      const info = relation[this.fname] || {}
      return info
    },

    subViewInfo() {
      const meta = this.viewInfo.fields[this.fname] || {}
      // console.log('sub view info,', this.editable, cp(meta.views))

      const get_info = () => {
        const form_info = meta.views.form || {}
        if (!form_info._is_load_async) return form_info
        if (!this.editable) return form_info

        const tree_info = meta.views.tree || {}
        const field_nodes = tree_info.node.children.filter(
          item => item.tagName === 'field' && item.attrs.name !== 'sequence'
        )

        const grp_node = { tagName: 'group', attrs: {}, children: field_nodes }
        const sheet_node = { tagName: 'sheet', attrs: {}, children: [grp_node] }
        const node = { ...form_info.node, children: [sheet_node] }
        return { ...form_info, fields: tree_info.fields, node }
      }

      const info = { ...get_info(), model: meta.relation }
      return info
    },

    subNode() {
      const subViewInfo = this.subViewInfo
      return subViewInfo.node || { children: [] }
    }
  },

  watch: {},

  methods: {
    subMethodCall(method, ...args) {
      console.log(' subMethodCall ', method, args)

      if (method === 'get_selection') {
        return this.method_get_selection(...args)
      }
    },

    method_get_selection(payload) {
      // console.log(' get_selection ', payload)
      const { relation = [] } = payload
      const relation2 = [
        { field: this.fname, row_id: (this.subDataInfo.dataDict || {}).id },
        ...relation
      ]
      const kwargs = { ...payload, relation: relation2 }
      return this.methodCall('get_selection', kwargs)
    },

    async handleRelationBrowse(payload) {
      // console.log(' handleRelationBrowse 1', payload)
      const { field } = payload

      const parent = {
        relation_field: field,
        field: this.fname,
        res_model: this.res_model,
        node: this.node,
        type: 'one2many',
        relations: { [field]: { ...payload } }
      }

      this.$emit('on-event', 'relation-browse', { ...parent })
    },

    async handleOnchange(payload = {}) {
      const { relation = [] } = payload

      // console.log('handleOnchange subform', this.fullname, payload)
      // console.log('handleOnchange subform fname', this.fname)
      // console.log('handleOnchange subform viewInfo', this.viewInfo)
      // console.log('handleOnchange subform dataInfo', this.dataInfo)
      // console.log('handleOnchange subform dataDict', this.dataDict)
      // console.log('handleOnchange subform node', this.node)
      // console.log('handleOnchange subform subViewInfo', this.subViewInfo)
      // console.log('handleOnchange subform subDataInfo', this.subDataInfo)
      // console.log('handleOnchange subform subNode', this.subNode)

      const relation2 = [
        { field: this.fname, row_id: this.subDataInfo.dataDict.id },
        ...relation
      ]
      const kwargs = { ...payload, relation: relation2 }
      this.$emit('on-event', 'on-change', kwargs)
    },

    async handleOnCommit(payload = {}) {
      // console.log('handleOnRollback subform', this.fullname, payload)
      const { relation = [], callback: callback_relation } = payload
      const relation2 = [
        { field: this.fname, row_id: this.subDataInfo.dataDict.id },
        ...relation
      ]

      const that = this

      const callback = res => {
        console.log('commit ok', res)
        if (callback_relation) {
          callback_relation(res)
        }

        const { error } = res
        if (!error) {
          that.showModal = false
        }
      }

      const kwargs = { ...payload, relation: relation2, callback }

      this.$emit('on-event', 'on-commit', kwargs)
    },

    async handleOnRemove() {
      const row_id = this.subDataInfo.dataDict.id
      this.handleOnUnlink({ row_id })
      // this.$emit('on-event', 'on-unlink', { row_id })

      // const line_id = formModel.id
      // await treeModel.remove_one(line_id)
      // this.showModal = false
      // this.$emit('on-change')
    },

    async handleOnUnlink(payload = {}) {
      console.log('handleOnUnlink subform', this.fullname, payload)
      const { relation = [], callback: callback_relation } = payload
      const relation2 = [
        { field: this.fname, row_id: this.subDataInfo.dataDict.id },
        ...relation
      ]

      const that = this

      const callback = res => {
        console.log('unlink ok')
        if (callback_relation) {
          callback_relation(res)
        }

        const { error } = res
        if (!error) {
          that.showModal = false
        }
      }

      const kwargs = { ...payload, relation: relation2, callback }
      this.$emit('on-event', 'on-unlink', kwargs)
    },

    async handleOnRollback(payload = {}) {
      console.log('handleOnRollback subform', this.fullname, payload)
      const { relation = [] } = payload
      const relation2 = [
        { field: this.fname, row_id: this.subDataInfo.dataDict.id },
        ...relation
      ]
      const kwargs = { ...payload, relation: relation2 }
      this.$emit('on-event', 'on-rollback', kwargs)
      this.showModal = false
    },

    handleSubOnEvent(event_name, ...args) {
      // console.log(' handleSubOnEvent', event_name, ...args)
      if (event_name === 'relation-browse') {
        this.handleRelationBrowse(...args)
      } else if (event_name === 'relation-pick') {
        // console.log('relation-pick, sub1', this.fname, this.res_model)
        console.log('relation-pick, sub2', ...args)
        // this.handleRelationPick(...args)
      } else if (event_name === 'on-change') {
        this.handleOnchange(...args)
      } else if (event_name === 'on-commit') {
        this.handleOnCommit(...args)
      } else if (event_name === 'on-rollback') {
        this.handleOnRollback(...args)
      } else if (event_name === 'on-unlink') {
        this.handleOnUnlink(...args)
      } else if (event_name === 'button-clicked') {
        console.log('button-clicked, sub', ...args)
        // this.handleButtonClicked(...args)
      }

      // this.$emit('on-event', event_name, ...args)
    }
  }
}
</script>

<style type="text/css" scoped></style>
