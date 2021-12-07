<template>
  <div>
    <a-form-model ref="ruleForm" :model="value2" :rules="rules">
      <a-form-model-item :prop="fname">
        <!-- {{ value2 }} -->

        <a-radio-group
          v-model="value2[fname]"
          :selectionOptions="
            selectionOptions.map(item => {
              return { value: item[0], label: item[1] }
            })
          "
          @change="onChangeRadio"
        />
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import inputMixin from './inputMixin'

// eslint-disable-next-line no-unused-vars
const cp = item => JSON.parse(JSON.stringify(item))
export default {
  name: 'SelectionRadio',
  components: {},
  mixins: [inputMixin],
  props: {
    selectionOptions: { type: Array, default: () => [] }
  },

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

  async mounted() {},

  methods: {
    onChangeRadio(event) {
      const value = event.target.value
      // console.log('onChangeRadio', [this.fname, value, this.selectionOptions])
      const kv = this.selectionOptions.find(item => item[0] === value)
      const text = kv ? kv[1] : ''
      this.handleChange(value, text)
    },

    handleChange(value, text) {
      this.$emit('on-change', value, text)
    }
  }
}
</script>

<style type="text/css" scoped>
/* .test {
  background: lightskyblue;
} */
/* .input-required.ant-input {
  background: lightskyblue;
} */
</style>
