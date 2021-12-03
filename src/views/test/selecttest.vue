<template>
  <div>
    selecttest

    {{ value2 }}

    <a-form-model ref="ruleForm" :model="value2" :rules="rules">
      <a-form-model-item :prop="fname">
        <a-select
          v-model="value2[fname]"
          :mode="mode"
          show-search
          :allowClear="true"
          label-in-value
          :placeholder="placeholder"
          style="width: 100%"
          :filter-option="false"
          :not-found-content="fetching ? undefined : null"
          @search="handleSearch"
          @change="handleChange"
          @dropdownVisibleChange="dropdownVisibleChange"
        >
          <a-spin v-if="fetching" slot="notFoundContent" size="small" />

          <div slot="dropdownRender" slot-scope="menu">
            <v-nodes :vnodes="menu" />
            <a-divider
              style="margin: 4px 0;"
              v-if="options.length >= limit + 1"
            />
            <div
              v-if="options.length >= limit + 1"
              style="padding: 4px 8px; cursor: pointer;"
              @mousedown="e => e.preventDefault()"
              @click="handleSearchMore"
            >
              <a-icon type="ellipsis" /> 搜索更多
            </div>
          </div>

          <a-select-option v-for="d in options2" :key="d[0]">
            {{ d[1] }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <SearchMore
        :show.sync="showMoreMadal"
        :data="dataList"
        @on-select="onMoreSelect"
      />
    </a-form-model>
  </div>
</template>

<script>
const cp = item => JSON.parse(JSON.stringify(item))

const check_array_equ = (listA, listB) => {
  let result =
    listA.length === listB.length &&
    listA.every(a => listB.some(b => a === b)) &&
    listB.every(_b => listA.some(_a => _a === _b))

  return result
}

import SearchMore from './SearchMore'
export default {
  components: {
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes
    },
    SearchMore
  },

  props: {
    dataDict: {
      type: Object,
      default: () => {
        return {}
      }
    },

    fname: { type: String, default: undefined },
    required: { type: Boolean, default: false },
    placeholder: { type: [String], default: '请选择' },

    mode: { type: String, default: undefined },
    optionsMethod: { type: Function, default: () => [] },
    limit: { type: [Number], default: 7 }
  },
  data() {
    return {
      value2: {},
      options: [],

      fetching: false,
      showMoreMadal: false,
      dataList: []
    }
  },

  computed: {
    flabel() {
      return `${this.fname}__name`
    },

    frecord() {
      return `${this.fname}__record`
    },

    rules() {
      return {
        [this.fname]: [
          // { required: this.required, message: '请选择!!', trigger: ['change'] }
          { required: true, message: '请选择!!', trigger: ['change'] }
        ]
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

  watch: {
    dataDict(newValue, oldValue) {
      // console.log('watch dataDict:', this.fname, cp(newValue), cp(oldValue))
      if (this.mode === 'multiple') {
        const keyold = oldValue[this.fname] || []
        const key = newValue[this.fname] || []
        const myvalue = this.value2[this.fname] || []
        const keyinvalue = myvalue.map(item => item.key)

        // console.log('watch dataDict1:', this.fname, keyold, key, keyinvalue)

        const todo =
          !check_array_equ(keyold, key) && !check_array_equ(key, keyinvalue)

        if (todo) {
          const labels = newValue[this.frecord]
          this.value2 = {
            [this.fname]: labels.map(item => {
              return { key: item[0], label: item[1] }
            })
          }
        }
      } else {
        const keyold = oldValue[this.fname]
        const key = newValue[this.fname]
        const myvalue = this.value2[this.fname] || {}
        const keyinvalue = myvalue.key
        if (key && keyold !== key && key !== keyinvalue) {
          const label = newValue[this.flabel]
          this.value2 = {
            [this.fname]: { key, label }
          }
        }
      }
    }
  },

  async created() {},

  methods: {
    dropdownVisibleChange(openValue) {
      console.log('dropdownVisibleChange')
      if (openValue) {
        this.handleSearch('')
      }
    },

    async handleSearch(query) {
      console.log('handleSearch', [query])
      this.options = []
      this.fetching = true
      const limit = this.limit + 1
      const res = await this.optionsMethod({ query, limit })
      this.options = res
      this.fetching = false
    },

    async handleSearchMore() {
      console.log('handleSearchMore')

      // const dataList = await this.optionsMethod({ query: '', limit: 0 })
      // this.dataList = dataList.map(item => {
      //   return { id: item[0], name: item[1] }
      // })
      this.showMoreMadal = true
    },

    handleChange(value) {
      console.log('handleChange', value && cp(value))
      console.log('handleChange2', cp(this.value2))

      if (this.mode === 'multiple') {
        const value_text = value.map(item => [item.key, item.label.trim()])
        const value_ids = value.map(item => item.key)
        console.log('handleChange3', value_ids, value_text)
        this.$emit('on-change', value_ids, value_text)
      } else {
        if (value) {
          const { key, label } = value
          const label2 = label.trim()
          this.$emit('on-change', key, label2)
        } else {
          this.$emit('on-change', false, '')
        }
      }
    },

    onMoreSelect(value) {
      console.log(' onMoreSelect', value)
      this.showMoreMadal = false

      const get_todo = () => {
        if (this.mode === 'multiple') {
          const { key } = value
          const valold = [...this.value2[this.fname]]
          const index = valold.findIndex(item => item.key === key)
          if (index >= 0) valold.splice(index, 1)
          return [...valold, value]
        } else {
          return value
        }
      }

      const valnew = get_todo()

      this.value2 = { [this.fname]: valnew }

      setTimeout(() => {
        this.$refs.ruleForm.validate()
        this.handleChange(valnew)
      }, 60)
    }
  }
}
</script>

<style scoped></style>
