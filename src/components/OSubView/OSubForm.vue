<template>
  <div>
    <!-- width="600" -->

    <a-modal
      :title="node.attrs.string"
      :width="800"
      :visible="showModal"
      @cancel="() => (showModal = false)"
    >
      <!-- -->
      <OForm
        :editable="editable"
        :data-info="data"
        :view-info="viewInfo"
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
import api from '@/odooapi'

let global_debug = 0
global_debug = 1

const try_call = async (fn, debug) => {
  if (global_debug || debug) return { result: await fn() }
  try {
    return { result: await fn() }
  } catch (error) {
    return { error }
  }
}

import editMixin from '@/mixins/editMixin'

// eslint-disable-next-line no-unused-vars
const cp = val => JSON.parse(JSON.stringify(val))

export default {
  name: 'OSubForm',
  components: {
    OForm: () => import('@/components/ONode/OForm.vue')
  },
  mixins: [editMixin],

  props: {
    visible: { type: Boolean, default: false },
    editable: { type: Boolean, default: false },

    data: {
      type: Object,
      default: () => {
        return { record: {} }
      }
    },

    viewInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },

  data() {
    return {}
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

    record() {
      return this.data.record || {}
    },

    values() {
      return this.data.values || {}
    },

    viewInfo2() {
      return this.viewInfo
    },

    view() {
      const { view } = this.viewInfo
      return view
    },

    node() {
      const { node } = this.viewInfo
      return node || { attrs: {} }
    }
  },

  watch: {},

  methods: {
    handleSubOnEvent(event_name, ...args) {
      // console.log(' handleSubOnEvent', event_name, ...args)
      if (event_name === 'on-change') {
        this.queue_handleOnchange(...args)
      }
    },

    async handleOnchange(fname, value) {
      // console.log('handleOnchange subform', fname, value)
      // console.log('record subform', cp(this.viewInfo2))
      // console.log('record subform', cp(this.record))
      // console.log('values subform', cp(this.values))
      // console.log('values subform', cp(this.data))

      const res = await try_call(async () => {
        return await api.Node.relation_onchange(this.viewInfo2, {
          record: this.record,
          values: { ...this.values, [fname]: value },
          parentData: this.data.parentData,
          fname
        })
      })

      const { error, result } = res
      // console.log(error, result)
      if (error) {
        this.$error({ title: '用户错误', content: error.data.message })
      } else {
        this.$emit('update:data', result)
      }
    },

    async handleOnRollback() {
      this.call_queue(['onRollback'])
    },

    async onRollback() {
      // console.log('handleOnRollback subform')
      this.$emit('update:data', { ...this.data, values: {} })
      this.showModal = false
    },

    async handleOnRemove() {
      this.call_queue(['onRemove'])
    },

    async onRemove() {
      console.log('handleOnRemove', this.record)
      const vals = [2, this.record.id, false]
      this.$emit('on-event', 'on-commit', vals)
      this.showModal = false
    },

    async handleOnCommit() {
      this.call_queue(['onCommit'])
    },

    async onCommit() {
      // console.log('handleOnCommit subform')
      // console.log('handleOnCommit subform', cp(this.data))

      const values = this.values

      const vals_get = () => {
        if (!this.record.id) {
          return [0, false, values]
        } else {
          return [1, this.record.id, values]
        }
      }

      const vals = vals_get()

      this.$emit('on-event', 'on-commit', vals)
      this.showModal = false
    }
  }
}
</script>

<style type="text/css" scoped></style>
