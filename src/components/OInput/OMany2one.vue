<template>
  <a-select
    v-model="value2"
    label-in-value
    @change="handleChange"
    :style="compute_style"
  >
    <a-select-option v-for="op in options" :key="op[0]" :value="op[0]">
      {{ op[1] }}
    </a-select-option>
  </a-select>
</template>

<script>
export default {
  name: 'OInput',
  props: {
    value: { type: Array, default: null },
    options: { type: Array, default: () => [] },
    width: { type: String, default: undefined }
  },

  data() {
    return {}
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
        return this.value ? { key: this.value[0] } : {}
      },

      set(val) {
        const { key, label } = val
        const label2 = label.trim()
        this.$emit('input', [key, label2])
      }
    }
  },
  methods: {
    handleChange(value) {
      const { key, label } = value
      const label2 = label.trim()
      this.$emit('change', [key, label2])
    }
  }
}
</script>

<style scoped></style>
