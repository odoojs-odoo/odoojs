<template>
  <div>
    <a-space>
      <a-dropdown :trigger="['click']">
        <!-- style="margin-left: 8px" -->
        <a-button type="primary" size="small">
          测量
          <a-icon type="down" />
        </a-button>

        <a-menu slot="overlay" @click="handleSelect">
          <template v-for="(measure, index) in measuresDropdownData">
            <a-menu-divider v-if="measure.divider" :key="index" />
            <a-menu-item v-else :key="measure.name">
              <a-icon type="check" v-show="measure.checked" />
              <a-icon type="plus" v-show="!measure.checked" />
              {{ measure.string }}
            </a-menu-item>
          </template>
        </a-menu>
      </a-dropdown>

      <template v-if="viewType === 'pivot'">
        <a-button size="small" icon="swap" @click="handleSwap" />
        <a-button size="small" icon="drag" @click="handleUnfold" />
      </template>
    </a-space>
  </div>
</template>

<script>
// const cp = item => JSON.parse(JSON.stringify(item))

export default {
  name: 'PivotToolbar',
  components: {},

  mixins: [],

  props: {
    viewType: { type: String, default: 'pivot' },
    pivotInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },

  data() {
    return {
      columns: [],
      rows: []
    }
  },
  computed: {
    measuresDropdownData() {
      const { measures_all, measures } = this.pivotInfo
      const ms = Object.keys(measures_all).map(fld => {
        const meta = measures_all[fld]
        return {
          name: fld,
          string: meta.string,
          type: meta.type,
          checked: measures.includes(fld)
        }
      })

      return [
        ...ms,
        { divider: 1 },
        {
          name: '__count',
          string: '个数',
          checked: measures.includes('__count')
        }
      ]
    }
  },

  watch: {},

  async created() {},
  async mounted() {},

  methods: {
    handleSelect(measure) {
      const key = measure.key
      const ms = this.measuresDropdownData
      // console.log(key, ms)
      const item = ms.find(item => item.name === key) || {}
      const payload = { type: 'measure', field: key, value: !item.checked }
      // console.log(cp(ms), payload)

      this.$emit('on-change', payload)
    },

    handleUnfold() {
      this.$emit('on-change', { command: 'unfold' })
    },
    handleSwap() {
      this.$emit('on-change', { command: 'swap' })
    }
  }
}
</script>

<style scoped></style>
