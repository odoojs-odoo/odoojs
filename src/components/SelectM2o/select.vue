<template>
  <div>
    <!-- @on-visible-change="onVisibleChange" -->

    <Dropdown
      trigger="custom"
      :visible="visible"
      transfer
      @on-clickoutside="onClickoutside"
      @on-click="onClick"
    >
      <!-- @on-blur="onBlur" -->
      <i-input
        v-model="query"
        :elementId="elementId"
        :placeholder="placeholder"
        @on-focus="handleOpen"
        @on-change="onInputChange"
        style="width: auto"
      >
        <Icon type="ios-arrow-down" slot="suffix" @click="handleOpen" />
      </i-input>

      <DropdownMenu slot="list">
        <DropdownItem v-if="loading" disabled>加载中</DropdownItem>
        <span v-else-if="options2.length">
          <DropdownItem v-for="op in options2" :key="op[0]" :name="op[0]">
            {{ op[1] }}
          </DropdownItem>
          <span v-if="options.length >= this.limit + 1">
            <div>--------</div>
            <DropdownItem name="_search_more">
              搜索更多
            </DropdownItem>
          </span>
        </span>
        <DropdownItem v-else disabled>无匹配数据</DropdownItem>
      </DropdownMenu>
    </Dropdown>

    <SearchMore
      :show.sync="showMoreMadal"
      :data="dataList"
      @on-select="onMoreSelect"
    />
  </div>
</template>

<script>
import SearchMore from './SearchMore'
export default {
  name: 'SelectM2o',
  components: { SearchMore },
  mixins: [],
  props: {
    // odoo 返回值,  false 表示  None
    value: { type: [String, Number], default: undefined },
    label: { type: [String], default: undefined },
    elementId: { type: [String], default: undefined },
    limit: { type: [Number], default: 7 },
    placeholder: { type: [String], default: '请选择' },
    optionsMethod: { type: Function, default: undefined }
  },

  data() {
    return {
      visible: false,

      query_to_set: undefined,

      select_changed: false,

      options: [],
      loading: false,

      showMoreMadal: false,
      dataList: []
    }
  },
  computed: {
    query: {
      get() {
        if (this.query_to_set === undefined) {
          return this.label
        } else {
          return this.query_to_set
        }
      },
      set(val) {
        this.query_to_set = val
      }
    },
    options2() {
      const ops = this.options
      if (ops.lenght < 8) {
        return [...this.options]
      } else {
        return this.options.slice(0, this.limit)
      }
    }
  },

  watch: {},

  async created() {},

  methods: {
    handleOpen() {
      this.visible = true
      this.get_options({ query: '' })
    },
    handleClose() {
      this.visible = false
    },
    onClickoutside() {
      // console.log(' onClickoutside', [this.query])

      if (this.select_changed) {
        this.select_changed = false
      } else {
        if (this.query) {
          this.query = undefined
        } else {
          if (this.value) {
            this.$emit('on-change', false, '')
          }
        }
      }

      this.handleClose()
    },

    onInputChange() {
      this.visible = true
      // this.onSelect(0, this.query)
      this.get_options({ query: this.query })
    },

    async onClick(value) {
      // 点击下拉菜单项时触发

      if (value === '_search_more') {
        const dataList = await this.optionsMethod({ query: '', limit: 0 })
        this.dataList = dataList.map(item => {
          return { id: item[0], name: item[1] }
        })
        this.showMoreMadal = true
      } else {
        const ops = this.options.filter(item => item[0] === value)
        const text = ops.length ? ops[0][1] : this.query

        this.onSelect(value, text)
      }
    },

    // onVisibleChange(visible) {
    //   // console.log(' onVisibleChange', visible)
    //   //   // if (visible) {
    //   //   //   this.get_options(this.query)
    //   //   // }
    // },

    async get_options({ query }) {
      if (!this.loading) {
        this.loading = true
        const limit = this.limit + 1
        this.options = await this.optionsMethod({ query, limit })
        this.loading = false
      }
    },

    onSelect(value, text) {
      this.query = text
      this.$emit('input', value)
      this.select_changed = true
      this.$emit('on-change', value, text)
    },

    onMoreSelect(value, text) {
      // console.log(' onMoreSelect', value, text)
      this.onSelect(value, text)
    }
  }
}
</script>

<style type="text/css"></style>
