<template>
  <a-form-model ref="ruleForm" :model="value2" :rules="rules">
    <a-form-model-item :prop="fname">
      <!-- {{ this.value2 }} -->
      <template v-if="type === 'number'">
        <a-input-number
          v-model="value2[fname]"
          :class="required ? 'input-required' : undefined"
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
          :class="required ? 'input-required' : undefined"
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
          :class="required ? 'input-required' : undefined"
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
import inputMixin from './inputMixin'

export default {
  name: 'Input',
  components: {},
  mixins: [inputMixin],

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

        // console.log('xxxx', this.$refs.ruleForm)

        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            const value2 = event.target.value
            const value = this.type === 'number' ? Number(value2) : value2

            this.onchange(value)
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
