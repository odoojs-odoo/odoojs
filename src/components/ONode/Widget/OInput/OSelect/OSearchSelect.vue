<template>
  <a-form-model ref="ruleForm" :model="value2" :rules="rules">
    <a-form-model-item :prop="fname">
      <!-- {{ value2[fname] }} -->
      <!-- {{ value2 }} -->
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

    <OSearchSelectMore
      :show.sync="showMoreMadal"
      :data="dataList"
      @on-select="onMoreSelect"
    />
  </a-form-model>
</template>

<script>
import OInputMixin from '../OInputMixin'

import OSearchSelectMore from './OSearchSelectMore.vue'

// eslint-disable-next-line no-unused-vars
const cp = item => JSON.parse(JSON.stringify(item))

export default {
  name: 'Select',
  components: {
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes
    },
    OSearchSelectMore
  },
  mixins: [OInputMixin],

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
      // console.log(ops)
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
    initValue(value) {
      // console.log('init', this.fname, value)
      if (this.mode === 'multiple') {
        // console.log('init m2m', this.fname, value)
        this.value2 = {
          [this.fname]: value.map(item => {
            const [key, label] = item
            return { key, label }
          })
        }
      } else {
        if (value) {
          const [key, label] = value
          this.value2 = { [this.fname]: { key, label } }
        } else {
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
      const res = await this.optionsMethod({ name: query, limit })
      this.options = res
      this.fetching = false
    },

    async handleSearchMore() {
      const dataList = await this.optionsMethod({ name: '', limit: 0 })

      this.dataList = dataList.map(item => {
        return { id: item[0], name: item[1] }
      })
      this.showMoreMadal = true
    },

    handleChange(value) {
      // console.log('handleChange', this.mode, value && cp(value))
      // console.log('handleChange2', cp(this.value2))

      this.$refs.ruleForm.validate(valid => {
        // console.log(valid)
        if (valid) {
          if (this.mode === 'multiple') {
            const value2 = value.map(item => [item.key, item.label.trim()])
            // console.log('handleChange3', value2)
            this.onchange(value2)
          } else {
            if (value) {
              const { key, label } = value
              const label2 = label.trim()
              this.onchange([key, label2])
            } else {
              this.onchange(false)
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
