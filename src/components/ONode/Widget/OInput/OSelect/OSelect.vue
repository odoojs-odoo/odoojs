<template>
  <div>
    <!-- Selection {{ selectionOptions }} -->
    <a-form-model ref="ruleForm" :model="value2" :rules="rules">
      <a-form-model-item :prop="fname">
        <a-select
          v-model="value2[fname]"
          :class="className2"
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
import OInputMixin from '../OInputMixin'

// eslint-disable-next-line no-unused-vars
const cp = item => JSON.parse(JSON.stringify(item))
export default {
  name: 'OSelect',
  components: {},
  mixins: [OInputMixin],
  props: {
    selectionOptions: { type: Array, default: () => [] }
  },

  data() {
    return {}
  },

  computed: {
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
      // console.log('onchange value', value)
      this.$emit('on-change', value)
    }
  }
}
</script>

<style type="text/css" scoped></style>
