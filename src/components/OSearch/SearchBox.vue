<template>
  <div>
    <a-select
      style="width: 400px"
      mode="multiple"
      size="default"
      show-arrow
      :value="value2"
      placeholder="搜索..."
      :filter-option="false"
      label-in-value
      :open="false"
      @blur="handleOnBlur"
      @deselect="handleOnDeselect"
      @search="handleSearch"
    >
      <a-icon slot="suffixIcon" type="search" />
    </a-select>

    <a-dropdown v-model="dropdownVisible" @visibleChange="handelVisibleChange">
      <a class="ant-dropdown-link" @click="e => e.preventDefault()">
        <span style="height:1px"> . </span>
        <!-- <a-icon type="down" /> -->
      </a>

      <a-menu slot="overlay">
        <template v-for="(item, index) in searchOptions">
          <a-menu-divider v-if="item.type === 'separator'" :key="index" />

          <template v-else>
            <a-menu-item :key="index">
              <a-row>
                <a-col :span="4">
                  <a-icon v-show="!item.arrow" type="ellipsis" />
                  <a-icon
                    v-show="item.arrow"
                    :type="
                      subOptions[item.name] && subOptions[item.name].open
                        ? 'caret-down'
                        : 'caret-right'
                    "
                    @click="handleOnClickArrow(item)"
                  />
                </a-col>
                <a-col :span="20">
                  <a href="javascript:;" @click="handleOnDropdownSelect(item)">
                    搜索 <i> {{ item.string }} </i> 为 {{ searchText }}
                  </a>
                </a-col>
              </a-row>
            </a-menu-item>

            <template
              v-if="subOptions[item.name] && subOptions[item.name].open"
            >
              <template v-if="subOptions[item.name].options.length">
                <a-menu-item
                  v-for="sub in subOptions[item.name].options"
                  :key="sub[0]"
                >
                  <a-row>
                    <a-col :span="8"> </a-col>
                    <a-col :span="16">
                      <a
                        href="javascript:;"
                        @click="handleOnDropdownSelect(item, sub)"
                      >
                        {{ sub[1] }}
                      </a>
                    </a-col>
                  </a-row>
                </a-menu-item>
              </template>
              <template v-else>
                <a-row :key="item.name">
                  <a-col :span="4"> </a-col>
                  <a-col :span="20"> (无结果) </a-col>
                </a-row>
              </template>
            </template>
          </template>
        </template>
      </a-menu>
    </a-dropdown>

    <br />
  </div>
</template>

<script>
export default {
  name: 'SearchViewBox',
  components: {},
  mixins: [],

  props: {
    value: { type: Array, default: () => [] },
    searchFields: { type: Array, default: () => [] },
    modelGet: { type: Function, default: () => undefined }
  },

  data() {
    return {
      searchText: '',
      dropdownVisible_ctrl: false,
      arrowClicked: false,

      subOptions: {}
    }
  },
  computed: {
    value2: {
      get() {
        return this.value
      },
      set(val) {
        console.log(val)
      }
    },

    searchOptions() {
      return this.searchFields
    },

    dropdownVisible: {
      get() {
        return this.dropdownVisible_ctrl
      },
      set(val) {
        // console.log(val)
        if (!this.arrowClicked) {
          this.dropdownVisible_ctrl = val
        } else {
          this.arrowClicked = false
        }
      }
    }
  },
  watch: {
    dropdownVisible(newVal) {
      if (!newVal) {
        this.subOptions = {}
      }
    }
  },

  async created() {},

  mounted() {},

  methods: {
    get_searchOptions() {
      console.log('sssss ops ')
      const fs = this.searchFields.reduce((acc, cur) => {
        acc.push(cur)
        // console.log(this.subOptions, cur.name)
        if (this.subOptions[cur.name]) {
          const sub = this.subOptions[cur.name].map(item => {
            return {
              is_sub: 1,
              name: `${cur.name},${item[0]}`,
              string: item[1]
            }
          })

          console.log(sub)

          acc = [...acc, ...sub]
        }
        return acc
      }, [])

      console.log('sssss ops ', fs)

      return fs
    },

    handelVisibleChange(value) {
      console.log('handelVisibleChange  ', value)
      this.dropdownVisible_ctrl = value
    },
    async handleSearch(query) {
      // 搜索内容变化, 暂存搜索内容, 显示下拉菜单
      // console.log(' handleSearch,', [this.dropdownVisible, query])
      this.searchText = query
      this.dropdownVisible_ctrl = query ? true : false
    },

    handleOnBlur() {
      // 失去焦点, 清空搜索文本, 隐藏下拉菜单

      if (!this.arrowClicked) {
        // console.log('handleOnBlur  ')
        this.searchText = ''

        this.dropdownVisible = false
      }
    },

    handleOnDeselect(value) {
      // 清除选择项

      this.$emit('on-search-select', value.key, false)
    },

    async handleOnClickArrow(item) {
      // 展开  m2o / Selection 字段的搜索
      console.log('handleOnClickArrow', item, this.viewInfo)
      this.arrowClicked = true

      const kwargs = {
        field: item.name,
        query: this.searchText,
        limit: 8
      }
      const model = this.modelGet()

      const options = await model.call('search', 'get_selection', kwargs)
      console.log(options)

      this.subOptions = {
        ...this.subOptions,
        [item.name]: { open: true, options }
      }
    },

    handleOnDropdownSelect(item, sub) {
      // 选中 搜索项
      console.log('handleOnDropdownSelect', item, sub)
      this.dropdownVisible_ctrl = false
      const value = sub || this.searchText
      const name = sub ? `id_${sub[0]}` : `name_${this.searchText}`

      this.$emit('on-search-select', `${item.name}-${name}`, value)
      this.searchText = ''
    }
  }
}
</script>

<style type="text/css">
.one_row {
  display: inline-block;
}
</style>
