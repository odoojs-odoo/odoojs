<template>
  <div>
    <a-form-model ref="ruleForm" :model="value2" :rules="rules">
      <a-form-model-item :prop="fname">
        <!-- {{ value2 }} -->
        <a-switch v-model="value2[fname]" @change="handleChange" />
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import inputMixin from './inputMixin'

// eslint-disable-next-line no-unused-vars
const cp = item => JSON.parse(JSON.stringify(item))
export default {
  name: 'FSwitch',
  components: {},
  mixins: [inputMixin],
  props: {},

  data() {
    return {}
  },

  computed: {
    flabel() {
      return `${this.fname}__name`
    },

    rules() {
      return {
        [this.fname]: [
          { required: this.required, message: '请选择!!', trigger: ['change'] }
          // { required: true, message: '请选择!!', trigger: ['change'] }
        ]
      }
    }
  },

  async mounted() {
    // const ops = await this.optionsMethod()
    // console.log('mounted:', this.fname, ops)
    // this.options = ops
  },

  methods: {
    handleChange(value) {
      console.log('conchange,switch,', value)
      this.$emit('on-change', value)
    }
  }
}
</script>

<style type="text/css" scoped>
/* .input-required.ant-input {
  background: lightskyblue;
} */
</style>
