<template>
  <span>
    <a-dropdown
      :visible="showDropdown[info.key]"
      :trigger="['click']"
      @visibleChange="visible => handelDropdownVisibleChange(visible, info.key)"
    >
      <a-icon :type="info.icon" @click="handleClick(info)" />

      <a-menu slot="overlay" @click="handleSelect">
        <template v-for="op in dropdownData">
          <a-sub-menu v-if="op.children" :key="op.name" :title="op.string">
            <a-menu-item
              v-for="item in op.children"
              :key="item.name"
              :disabled="item.disabled"
            >
              {{ item.string }}
            </a-menu-item>
          </a-sub-menu>

          <a-menu-item v-else :key="op.name" :disabled="op.disabled">
            {{ op.string }}
          </a-menu-item>
        </template>
      </a-menu>
    </a-dropdown>
  </span>
</template>

<script>
// eslint-disable-next-line no-unused-vars
const cp = item => JSON.parse(JSON.stringify(item))

export default {
  name: 'PivotDropdown',
  components: {},
  mixins: [],

  props: {
    info: {
      type: Object,
      default: () => {
        return {}
      }
    },

    dropdownData: { type: Array, default: () => [] }
  },

  data() {
    return {
      hasShowDropdown: false,
      showDropdown: {},
      currentInfo: undefined
    }
  },
  computed: {},

  watch: {},

  async created() {},

  mounted() {},

  methods: {
    handelDropdownVisibleChange(visible, key) {
      // console.log(' handelDropdownVisibleChange', visible, this.hasShowDropdown)
      if (!this.hasShowDropdown)
        this.showDropdown = { ...this.showDropdown, [key]: visible }

      if (!this.showDropdown[key]) this.currentInfo = undefined
    },

    handleClick(info) {
      // console.log(' handleClick', cp(info))

      this.hasShowDropdown = true
      setTimeout(() => {
        this.hasShowDropdown = false
      }, 200)

      const { open, next } = info

      if (open) {
        // close
        const { dims, groupby } = info
        const payload = { command: 'fold', dims, groupby, next }
        // console.log('fold,  ', info, payload)
        this.$emit('on-change', payload)
      } else if (next) {
        // 展开
        const { dims, groupby, domain } = info
        const payload = { dims, groupby, next, domain }
        // console.log('next', payload)
        this.$emit('on-change', payload)
      } else {
        this.currentInfo = info
        // console.log(' select,  ', info)
        const { key } = info
        this.showDropdown = { ...this.showDropdown, [key]: true }
      }
    },

    handleSelect(item) {
      const currentInfo = this.currentInfo
      this.currentInfo = undefined

      // 关闭 dropdown
      this.showDropdown = Object.keys(this.showDropdown).reduce((acc, cur) => {
        return { ...acc, [cur]: false }
      }, {})

      const key = item.key
      const { dims, groupby, domain } = currentInfo
      const payload = { dims, groupby, next: key, domain }
      // console.log(' select,  ', item, currentInfo)
      // console.log(payload)
      this.$emit('on-change', payload)
    }
  }
}
</script>

<style type="text/css"></style>
