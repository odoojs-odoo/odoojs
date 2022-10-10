<template>
  <div>
    <!-- data picker
    {{ value }} -->

    <a-date-picker
      v-model="value2"
      :show-time="showTime"
      @change="onChange"
      @ok="onOK"
    />
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'ODatePicker',
  props: {
    value: { type: String, default: null },
    width: { type: String, default: undefined },
    showTime: { type: Boolean, default: false }
  },

  data() {
    return {
      value_changed: undefined
    }
  },
  computed: {
    date_format() {
      return this.showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'
    },
    compute_style() {
      if (this.width) {
        return `width: ${this.width}`
      } else {
        return undefined
      }
    },
    value2: {
      get() {
        return this.value ? moment(this.value, this.date_format) : this.value
      },

      set(val) {
        const dateString = val.format(this.date_format)
        // console.log(val, dateString)
        this.$emit('input', dateString)
      }
    }
  },
  methods: {
    onOK(date) {
      const dateString = date.format(this.date_format)
      //   console.log('onOK', date, dateString)
      this.$emit('change', dateString)
    },

    // eslint-disable-next-line no-unused-vars
    onChange(date, dateString) {
      //   console.log('onChange', date, dateString)
      //   this.$emit('change', e.target.value)
    }
  }
}
</script>

<style scoped></style>
