<template>
  <span style="margin: 0 0 0 2px">
    <!-- {{ groupbyBtnOptions }} -->

    <a-dropdown :trigger="['click']">
      <a-button size="small">
        <a-icon type="menu" @click="e => e.preventDefault()" />
        分组
      </a-button>

      <a-menu slot="overlay">
        <template v-for="(item, index) in groupbyBtnOptions">
          <a-menu-divider v-if="item.type === 'separator'" :key="index" />

          <template v-else-if="item.date">
            <a-sub-menu :key="index" :title="item.string || item.help">
              <template v-for="child in item.children">
                <a-menu-item :key="child.name">
                  <a href="javascript:;" @click="handleOnDropdownSelect(child)">
                    <a-icon type="check" v-show="child.checked" />
                    <a-icon type="plus" v-show="!child.checked" />
                    {{ child.string }}
                  </a>
                </a-menu-item>
              </template>
            </a-sub-menu>
          </template>

          <template v-else>
            <a-menu-item :key="index">
              <a href="javascript:;" @click="handleOnDropdownSelect(item)">
                <a-icon type="check" v-show="item.checked" />
                <a-icon type="plus" v-show="!item.checked" />
                {{ item.string || item.help }}
              </a>
            </a-menu-item>
          </template>
        </template>
      </a-menu>
    </a-dropdown>
  </span>
</template>

<script>
export default {
  name: 'GroupbyBtn',
  components: {},
  mixins: [],

  props: {
    groupbyBtnOptions: { type: Array, default: () => [] }
  },

  data() {
    return {}
  },
  computed: {
    today() {
      // const today = new Date()
      // console.log(today)
      // const year = today.getUTCFullYear()
      // const month = today.getUTCMonth() + 1
      // const quarter = Math.floor((month - 1) / 4) + 1
      // console.log(today, year, month, quarter)
      return ''
    }
  },
  watch: {},

  async created() {},

  mounted() {
    // console.log(this.groupbyBtnOptions)
  },

  methods: {
    handleOnDropdownSelect(item) {
      console.log(item)

      this.$emit('on-search-select', item.name, !item.checked)
    }
  }
}
</script>

<style type="text/css"></style>
