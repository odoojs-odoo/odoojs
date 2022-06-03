<template>
  <a-form-model ref="ruleForm" :model="value2" :rules="rules">
    <a-form-model-item :prop="fname">
      <!-- {{ fname }} {{ type }} -->
      <template v-if="type === 'number'">
        <!-- {{ fname }} {{ type }} -->
        <a-input-number
          v-model="value2[fname]"
          :class="className2"
          :id="elementId"
          :placeholder="placeholder"
          @change="onInputChange"
          @pressEnter="onInputEnter"
          @blur="onInputBlur"
        />
      </template>

      <template v-else-if="type === 'text'">
        <!-- {{ fname }} {{ type }} -->
        <a-textarea
          v-model="value2[fname]"
          :class="className2"
          :id="elementId"
          :placeholder="placeholder"
          :rows="4"
          @change="onInputChange"
          @pressEnter="onInputEnter"
          @blur="onInputBlur"
        />
      </template>

      <template v-else>
        <a-input
          :class="className2"
          v-model="value2[fname]"
          :id="elementId"
          :placeholder="placeholder"
          @change="onInputChange"
          @pressEnter="onInputEnter"
          @blur="onInputBlur"
        />
      </template>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
import OInputMixin from './OInputMixin'

export default {
  name: 'OInput',
  components: {},
  mixins: [OInputMixin],

  props: {},

  data() {
    return {
      changed: false
    }
  },
  computed: {},

  watch: {},

  async created() {},

  mounted() {},

  methods: {
    onInputChange() {
      this.changed = true
    },

    _onInputEnterAndBlur(event) {
      if (this.changed) {
        this.changed = false

        this.$refs.ruleForm.validate(valid => {
          // console.log('xxxx', valid)
          if (valid) {
            const value2 = event.target.value
            const value = this.type === 'number' ? Number(value2) : value2

            this.onchange(value)
          } else {
            const value2 = event.target.value
            this.onchange(value2, { local_onchange: 1 })
          }
        })
      }
    },

    onInputEnter(event) {
      this._onInputEnterAndBlur(event)
    },
    onInputBlur(event) {
      this._onInputEnterAndBlur(event)
    }
  }
}
</script>

<style type="text/css" scoped>
.input-required.ant-input {
  background: cornflowerblue;
}
</style>
