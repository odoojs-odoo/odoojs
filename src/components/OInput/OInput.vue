<template>
  <a-input
    v-model="value2"
    :style="compute_style"
    @change="onInputChange"
    @pressEnter="onInputEnter"
    @blur="onInputBlur"
  />
</template>

<script>
export default {
  name: 'OInput',
  props: {
    value: { type: String, default: null },
    width: { type: String, default: undefined }
  },

  data() {
    return {
      value_changed: undefined
    }
  },
  computed: {
    compute_style() {
      if (this.width) {
        return `width: ${this.width}`
      } else {
        return undefined
      }
    },
    value2: {
      get() {
        return this.value
      },

      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    onInputChange(value) {
      this.value_changed = value
      this.changed = true
    },

    onInputEnter(event) {
      this._onInputEnterAndBlur(event)
    },
    onInputBlur(event) {
      this._onInputEnterAndBlur(event)
    },

    // eslint-disable-next-line no-unused-vars
    _onInputEnterAndBlur(event) {
      if (this.changed) {
        this.changed = false

        this.handleChange(this.value_changed)
      }
    },

    handleChange(e) {
      this.$emit('change', e.target.value)
    }
  }
}
</script>

<style scoped></style>
