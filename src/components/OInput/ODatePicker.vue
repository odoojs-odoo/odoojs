<template>
  <div>
    <!-- data picker {{ mVal }} -->

    <a-date-picker
      v-model:value="mVal"
      :show-time="showTime"
      :placeholder="placeholder"
      :style="compute_style"
      @change="onChange"
      @ok="onOK"
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'

import dayjs from 'dayjs'

const props = defineProps(['modelValue', 'width', 'placeholder', 'showTime'])
const emit = defineEmits(['update:modelValue', 'change'])

const compute_style = computed(() =>
  props.width ? `width: ${props.width}` : undefined
)

const date_format = computed(() =>
  props.showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'
)

function format_date(date) {
  const year = date.getFullYear().toString().padStart(4, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')

  const hh = date.getHours().toString().padStart(2, '0')
  const mm = date.getMinutes().toString().padStart(2, '0')
  const ss = date.getSeconds().toString().padStart(2, '0')

  const today_str = `${year}-${month}-${day} ${hh}:${mm}:${ss}`
  return today_str
}

const mVal = computed({
  get() {
    //  return this.value ? moment(this.value, this.date_format) : this.value
    const val = props.modelValue
    // console.log(props.modelValue)
    if (val) {
      const str = typeof val === 'object' ? format_date(val) : val
      //   console.log(dayjs(str, date_format.value))
      return dayjs(str, date_format.value)
    }

    return undefined
  },
  // eslint-disable-next-line no-unused-vars
  set(value) {
    // console.log(value)
    // const dateString = value.format(date_format.value)
    // console.log(value, dateString)
    // emit('update:modelValue', dateString)
  }
})

// eslint-disable-next-line no-unused-vars
function onOK(date, dateString) {
  //   console.log('onOK', date, dateString)
  //   emit('change', dateString)
}

function onChange(date, dateString) {
  //   console.log('onChange', date, dateString)
  emit('change', dateString)
}
</script>

<style scoped></style>
