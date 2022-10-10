<template>
  <a-input-number
    v-model="value2"
    @change="onInputChange"
    @pressEnter="onInputEnter"
    @blur="onInputBlur"
  />
</template>

<script>
export default {
  name: 'OInput',
  props: {
    value: { type: Number, default: 0 }
  },

  data() {
    return {
      value_changed: undefined
    }
  },
  computed: {
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

    handleChange(value) {
      this.$emit('change', value)
    }
  }
}
</script>

<style scoped></style>
