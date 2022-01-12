<template>
  <div>
    <!-- <button @click="testClickBtn">test</button> -->
    <a-dropdown
      v-model="dropdownVisible"
      @visibleChange="handelVisibleChange"
      :trigger="['click']"
    >
      <a-select
        ref="refSelect"
        style="width: 400px"
        mode="multiple"
        size="default"
        show-arrow
        :value="value2"
        placeholder="搜索..."
        :filter-option="false"
        label-in-value
        :open="false"
        @focus="handleOnFocus"
        @blur="handleOnBlur"
        @deselect="handleOnDeselect"
        @search="handleSearch"
      >
        <a-icon slot="suffixIcon" type="search" />
      </a-select>

      <a-menu slot="overlay" @click="handleMenuClick">
        <template v-for="(item, index) in searchOptions">
          <a-menu-divider v-if="item.type === 'separator'" :key="index" />

          <template v-else>
            <a-menu-item :key="item.name">
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
                  <span>
                    搜索 <i> {{ item.string }} </i> 为 {{ searchText }}
                  </span>
                </a-col>
              </a-row>
            </a-menu-item>

            <template
              v-if="subOptions[item.name] && subOptions[item.name].open"
            >
              <template v-if="subOptions[item.name].options.length">
                <a-menu-item
                  v-for="sub in subOptions[item.name].options"
                  :key="`${item.name},${sub[0]}`"
                >
                  <a-row>
                    <a-col :span="8"> </a-col>
                    <a-col :span="16">
                      <span> {{ sub[1] }} </span>
                    </a-col>
                  </a-row>
                </a-menu-item>
              </template>
              <template v-else>
                <a-row :key="`${item.name},no`">
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
// 功能要求：
// 1. 搜索 输入
// 2. 出现下拉
// 3. 点击 下拉框中的 m2o 箭头
// 4. 此时 要求 不触发 下拉菜单的点击事件，仅仅是 更新 下拉框的二级选择项目
// 5. 实际上  点击 下拉框中的 m2o 箭头 会触发 下拉菜单的点击事件
// 6. 并 导致 搜索框失去焦点 / 搜索 输入内容被清空

// 解决方案:
// 1. 在 点击 下拉框中的 m2o 箭头 的 点击事件中, 设置标志
// 2. 在 下拉菜单的点击事件中 判断 是否上述标志. 从而 作出正确动作
// 3. 在 搜索框失去焦点 事件中 判断 是否上述标志. 并 手动设置 搜索框 得到焦点
// 4. 目前找不到 设置 搜索框 的搜索内容 的方法。
// 5. TODO

export default {
  name: 'SearchViewBox',
  components: {},
  mixins: [],

  props: {
    value: { type: Array, default: () => [] },
    searchFields: { type: Array, default: () => [] },

    optionMethod: { type: Function, default: () => undefined }
  },

  data() {
    return {
      searchText: '',
      dropdownVisible: false,
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
    // testClickBtn() {
    //   console.log('testClickBtn', this.$refs.refSelect)

    //   // this.$refs.refSelect.focus()
    // },
    handelVisibleChange(/*value*/) {
      // console.log('handelVisibleChange  ', [value, this.searchText])
      this.dropdownVisible = false
    },

    async handleSearch(query) {
      // 搜索内容变化, 暂存搜索内容, 显示下拉菜单

      console.log('testClickBtn', this.$refs.refSelect)

      this.searchText = query
      this.dropdownVisible = query ? true : false
    },

    handleOnFocus() {
      // console.log('handleOnFocus searchText ', [this.searchText])
      this.dropdownVisible = this.searchText ? true : false
    },

    handleOnBlur() {
      console.log('handleOnBlur searchText ')
      // console.log(new Date().toISOString())
      if (!this.arrowClicked) {
        // 失去焦点, 清空搜索文本, 隐藏下拉菜单
        this.searchText = ''
        this.dropdownVisible = false
      } else {
        this.arrowClicked = false
        this.$refs.refSelect.focus()
        // console.log('handleOnBlur searchText2 ', [this.searchText])
        // const ref = this.$refs.refSelect
        // const ref2 = ref.$refs.vcSelect
        // const ref3 = ref2.inputRef
        // console.log('handleOnBlur searchText3', ref)
        // ref3.value = this.searchText
      }
    },

    handleMenuClick({ key }) {
      console.log('handleMenuClick', key, this.arrowClicked)
      // console.log(new Date().toISOString())
      if (!this.arrowClicked) {
        const keys = key.split(',')
        const item = this.searchOptions.find(it => it.name === keys[0])
        const sub =
          keys.length > 1
            ? this.subOptions[keys[0]].options.find(
                it =>
                  it[0] ===
                  (typeof it[0] === 'number' ? Number(keys[1]) : keys[1])
              )
            : undefined
        // console.log('handleMenuClick2', key, item, this.searchText)
        const value = sub || this.searchText
        const name = sub ? `id_${sub[0]}` : `name_${this.searchText}`
        this.$emit('on-search-select', `${item.name}-${name}`, value)
        this.dropdownVisible = false
      }
    },

    async handleOnClickArrow(item) {
      // 展开  m2o / Selection 字段的搜索
      console.log('handleOnClickArrow', item)
      // console.log(new Date().toISOString())
      this.arrowClicked = true

      const kwargs = {
        field: item.name,
        name: this.searchText
      }
      const options = await this.optionMethod(kwargs)

      // console.log('handleOnClickArrow,xxxx', this.$refs.refSelect)

      this.subOptions = {
        ...this.subOptions,
        [item.name]: { open: true, options }
      }

      // this.arrowClicked = false
    },

    handleOnDeselect(value) {
      // 清除选择项
      this.$emit('on-search-select', value.key, false)
    }
  }
}
</script>

<style type="text/css">
.one_row {
  display: inline-block;
}
</style>
