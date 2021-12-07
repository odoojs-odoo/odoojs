<template>
  <a-form-model ref="ruleForm" :model="value2" :rules="rules">
    <a-form-model-item :prop="fname">
      <!-- {{ value2[fname] }} -->
      <!-- {{ value2 }}      -->
      <!-- {{ [required] }} -->
      <!-- :not-found-content="fetching ? undefined : null" -->
      <a-select
        :class="required ? 'input-required' : undefined"
        v-model="value2[fname]"
        :id="elementId"
        :mode="mode"
        show-search
        :showArrow="false"
        :allowClear="true"
        label-in-value
        :placeholder="placeholder"
        style="width: 100%"
        :filter-option="false"
        @search="handleSearch"
        @change="handleChange"
        @dropdownVisibleChange="dropdownVisibleChange"
      >
        <a-spin v-if="fetching" slot="notFoundContent" size="small" />

        <div slot="dropdownRender" slot-scope="menu">
          <v-nodes :vnodes="menu" />
          <a-divider style="margin: 4px 0" v-if="options.length >= limit + 1" />
          <div
            v-if="options.length >= limit + 1"
            style="padding: 4px 8px; cursor: pointer"
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

    <SelectMore
      :show.sync="showMoreMadal"
      :data="dataList"
      @on-select="onMoreSelect"
    />
  </a-form-model>
</template>

<script>
import inputMixin from './inputMixin'

import SelectMore from './SelectMore.vue'

// const cp = item => JSON.parse(JSON.stringify(item))

const check_array_equ = (listA, listB) => {
  let result =
    listA.length === listB.length &&
    listA.every(a => listB.some(b => a === b)) &&
    listB.every(_b => listA.some(_a => _a === _b))

  return result
}

const check_array_equ2 = (listA, listB) => {
  let result =
    listA.length === listB.length &&
    listA.every(a => listB.some(b => check_array_equ(a, b))) &&
    listB.every(_b => listA.some(_a => check_array_equ(_a, _b)))

  return result
}

export default {
  name: 'Select',
  components: {
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes
    },
    SelectMore
  },
  mixins: [inputMixin],

  props: {
    mode: { type: String, default: undefined },
    optionsMethod: { type: Function, default: () => [] },
    limit: { type: [Number], default: 7 }
  },

  data() {
    return {
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
          { required: this.required, message: '请选择!!', trigger: ['change'] }
          // { required: true, message: '请选择!!', trigger: ['change'] }
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

  async created() {},

  mounted() {},

  methods: {
    set_value_in_watch(newValue, oldValue) {
      if (this.mode === 'multiple') {
        // console.log('xxx0,', this.fname, { newValue, oldValue })

        const valold = oldValue[this.fname] || []
        const valnew = newValue[this.fname] || []
        const myval = this.value2[this.fname] || []

        const valold2 = oldValue[this.frecord] || []
        const valnew2 = newValue[this.frecord] || []

        // console.log('xxx1,', { valold, valnew })

        const todo1 =
          !check_array_equ(valold, valnew) &&
          !check_array_equ(
            valnew,
            myval.map(item => item.key)
          )

        // console.log('xxx2,', { valold2, valnew2 })

        const todo2 =
          !check_array_equ2(valold2, valnew2) &&
          !check_array_equ2(
            valnew2,
            myval.map(item => [item.key, item.label])
          )

        const todo = todo1 || todo2

        if (todo) {
          const labels = newValue[this.frecord] || []
          this.value2 = {
            [this.fname]: labels.map(item => {
              return { key: item[0], label: item[1] }
            })
          }
        }
      } else {
        const valold = oldValue[this.fname]
        const valnew = newValue[this.fname]
        const myval = this.value2[this.fname] || {}

        if (valnew && valold !== valnew && valnew !== myval.key) {
          const label = newValue[this.flabel]
          this.value2 = { [this.fname]: { key: valnew, label } }
        } else if (!valnew && myval.key) {
          this.value2 = { [this.fname]: undefined }
        }
      }
    },
    set_value_in_mounted() {
      if (this.mode === 'multiple') {
        const valnew = this.dataDict[this.fname] || []
        const myval = this.value2[this.fname] || []
        const mykey = myval.map(item => item.key)

        const valnew2 = this.dataDict[this.frecord] || []

        const todo1 = !check_array_equ(valnew, mykey)
        const todo2 = !check_array_equ2(
          valnew2,
          myval.map(item => [item.key, item.label])
        )
        // console.log('mounted select:', this.fname, valnew, valnew2, myval)

        const todo = todo1 || todo2
        if (todo) {
          const labels = this.dataDict[this.frecord]
          this.value2 = {
            [this.fname]: labels.map(item => {
              return { key: item[0], label: item[1] }
            })
          }
        }
      } else {
        const valnew = this.dataDict[this.fname]
        const myval = this.value2[this.fname] || {}
        if (valnew && valnew !== myval.key) {
          const label = this.dataDict[this.flabel]
          this.value2 = { [this.fname]: { key: valnew, label } }
        } else if (!valnew && myval.key) {
          this.value2 = { [this.fname]: undefined }
        }
      }
    },

    dropdownVisibleChange(openValue) {
      // console.log('dropdownVisibleChange')
      if (openValue) {
        this.handleSearch('')
      }
    },

    async handleSearch(query) {
      // console.log('handleSearch', [query])
      this.options = []
      this.fetching = true
      const limit = this.limit + 1
      const res = await this.optionsMethod({ query, limit })
      this.options = res
      this.fetching = false
    },

    async handleSearchMore() {
      // console.log('handleSearchMore')

      const dataList = await this.optionsMethod({ query: '', limit: 0 })
      this.dataList = dataList.map(item => {
        return { id: item[0], name: item[1] }
      })
      this.showMoreMadal = true
    },

    handleChange(value) {
      // console.log('handleChange', value && cp(value))
      // console.log('handleChange2', cp(this.value2))

      this.$refs.ruleForm.validate(valid => {
        // console.log(valid)
        if (valid) {
          if (this.mode === 'multiple') {
            const value_text = value.map(item => [item.key, item.label.trim()])
            const value_ids = value.map(item => item.key)
            // console.log('handleChange3', value_ids, value_text)
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
        }
      })
    },

    onMoreSelect(value) {
      // console.log(' onMoreSelect', value)
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

<style type="text/css">
.input-required .ant-select-selection__rendered {
  background: lightskyblue;
}
</style>
