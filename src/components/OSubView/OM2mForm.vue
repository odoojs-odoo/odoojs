<template>
  <div>
    <a-modal
      :title="node.attrs.string"
      :width="800"
      :visible="showModal"
      @cancel="() => (showModal = false)"
    >
      <!-- {{ recordsOld }} -->
      <!-- {{ dataInfo }} -->
      <OForm :editable="false" :data-info="dataInfo" :view-info="viewInfo" />

      <template slot="footer">
        <a-space v-if="editable">
          <a-button key="rollback" @click="() => (showModal = false)">
            取消
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
    <div>
      <div>&nbsp;</div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
const cp = val => JSON.parse(JSON.stringify(val))

export default {
  name: 'OM2mForm',
  components: {
    OForm: () => import('@/components/ONode/OForm.vue')
  },
  mixins: [],
  props: {
    visible: { type: Boolean, default: false },
    editable: { type: Boolean, default: false },

    recordsOld: { type: Array, default: () => [] },

    dataInfo: {
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
      return this.dataInfo.record || {}
    },

    values() {
      return this.dataInfo.values || {}
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

  created() {},

  mounted() {},

  methods: {
    async handleOnRemove() {
      // console.log(this.recordsOld, this.record)
      const recs = this.recordsOld.filter(item => item.id !== this.record.id)
      const ids = recs.map(item => item.id)
      const vals = [6, false, ids]
      this.$emit('on-event', 'on-commit', { value: vals, m2m_records: recs })
      this.showModal = false
    }
  }
}
</script>

<style type="text/css"></style>
