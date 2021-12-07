<template>
  <div>
    <a-form-model ref="ruleForm" :model="value2" :rules="rules">
      <a-form-model-item :prop="fname">
        <!-- {{ value2 }} -->

        <a-select
          :class="required ? 'input-required' : undefined"
          v-model="value2[fname]"
          :id="elementId"
          :placeholder="placeholder"
          style="width: 100%"
          @change="handleChange"
        >
          <a-select-option v-for="d in selectionOptions" :key="d[0]">
            {{ d[1] }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import inputMixin from './inputMixin'

// eslint-disable-next-line no-unused-vars
const cp = item => JSON.parse(JSON.stringify(item))
export default {
  name: 'Selection',
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
    handleChange(value) {
      this.$emit('on-change', value)
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
