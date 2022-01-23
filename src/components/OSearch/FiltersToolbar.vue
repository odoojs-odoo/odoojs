<template>
  <span style="margin: 0 0 0 2px">
    <a-dropdown
      :trigger="['click']"
      
      v-model="visible"
      @visibleChange="handelOnVisibleChange"
    >
      <a-button size="small">
        <a-icon type="star" theme="filled" @click="e => e.preventDefault()" />
        收藏
      </a-button>

      <a-menu class="at-stared" slot="overlay">
        <template v-for="(item, index) in options">
          <a-menu-item :key="index">
            <a href="javascript:;" @click="handleOnDropdownSelect(item)">
              <a-icon type="check" v-show="item.checked" />
              <a-icon type="plus" v-show="!item.checked" />
              {{ item.name }}
            </a>

            <a-icon
              type="rest"
              theme="filled"
              @click="handleOnDropdownDelete(item)"
            />
          </a-menu-item>
        </template>
        <a-menu-divider />
        <a-menu-item v-show="!showSubmit" @click="handleOnDropdownSave">
          保存当前搜索
        </a-menu-item>
        <a-menu-item v-show="showSubmit">
          <div>
            <div>
              <a-input v-model="filters_name"></a-input>
            </div>
            <!-- <div>
              <a-checkbox v-model="filters_is_default"> 默认使用 </a-checkbox>
            </div> -->
            <div>
              <a-checkbox v-model="filters_is_public">
                与其他用户共享
              </a-checkbox>
            </div>
            <div>
              <a-button type="primary" @click="handleOnDropdownSubmit">
                保存
              </a-button>
            </div>
          </div>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </span>
</template>

<script>
// eslint-disable-next-line no-unused-vars
const cp = item => JSON.parse(JSON.stringify(item))

export default {
  name: 'FiltersToolbar',
  components: {},
  mixins: [],

  props: {
    action_name: { type: String, default: undefined },
    options: { type: Array, default: () => [] }
  },

  data() {
    return {
      visible: false,
      showSubmit: false,
      filters_name_local: undefined,
      filters_is_default_local: undefined,
      filters_is_public_local: undefined
    }
  },
  computed: {
    filters_name: {
      get() {
        return this.filters_name_local !== undefined
          ? this.filters_name_local
          : this.action_name
      },
      set(val) {
        this.filters_name_local = val
      }
    },
    filters_is_default: {
      get() {
        return this.filters_is_default_local !== undefined
          ? this.filters_is_default_local
          : false
      },
      set(val) {
        this.filters_is_default_local = val
      }
    },
    filters_is_public: {
      get() {
        return this.filters_is_public_local !== undefined
          ? this.filters_is_public_local
          : false
      },
      set(val) {
        this.filters_is_public_local = val
      }
    }
  },
  watch: {
    filters_is_public(val) {
      if (val) {
        this.filters_is_default = false
      }
    },
    filters_is_default(val) {
      if (val) {
        this.filters_is_public = false
      }
    }
  },

  async created() {},

  mounted() {},

  methods: {
    handelOnVisibleChange(visible) {
      console.log('handelOnVisibleChange', visible)
      if (!visible) {
        this.showSubmit = false
      }
      // this.visible = visible
    },

    handleOnDropdownSelect(item) {
      console.log(cp(item))

      const name = `ir.filters,${item.id}`
      this.$emit('on-search-select', name, !item.checked)
      this.visible = false
    },

    handleOnDropdownDelete(item) {
      console.log(cp(item))
      this.$emit('on-search-unlink', item.id, res => {
        if (res) {
          this.visible = false
        }
      })

      this.visible = false
    },
    handleOnDropdownSave(e) {
      console.log(e)

      this.showSubmit = true
    },

    async handleOnDropdownSubmit(e) {
      // console.log(this.form)
      const valus = {
        name: this.filters_name,
        is_public: this.filters_is_public,
        is_default: this.filters_is_default
      }
      this.$emit('on-search-submit', valus, res => {
        if (res) {
          this.showSubmit = false
          this.visible = false
        }
      })
    }
  }
}
</script>

<style lang="less">
  .at-stared {
    .ant-dropdown-menu-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      a:hover {
        color: #0c79f5;
        // text-decoration: underline;
      }
      i:hover {
        color: #0c79f5;
        // text-decoration: underline;
      }
    }
  }
</style>
