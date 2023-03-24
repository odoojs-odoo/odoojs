<template>
  <div>
    <b> {{ title }}: </b>
    <a-space>
      <a-button
        v-for="btn in buttons"
        :key="btn.key"
        @click="OnClickBtn(btn)"
        size="small"
        type="primary"
        shape="round"
      >
        {{ btn.label }}
      </a-button>

      <a-range-picker
        v-model:value="state.valueObjPair"
        @change="onChange"
        size="small"
        style="max-width: 230px"
      />
    </a-space>
  </div>
</template>

<script setup>
import dayjs from 'dayjs'

import { defineProps, defineEmits, computed, reactive, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps(['modelValue', 'title'])
const emit = defineEmits(['change'])

const state = reactive({ valueStrPair: [], valueObjPair: [] })

watch(
  () => props.modelValue,
  // eslint-disable-next-line no-unused-vars
  (newVal, oldVal) => {
    // 默认值。 todo
    console.log('watch, val,', newVal, oldVal)
  },
  { immediate: true }
)

const buttons = computed(() => [
  {
    key: 'today',
    label: t('timeSearch.today'),
    date_get: () => {
      const today = date_tools.today
      return [today, today]
    }
  },
  {
    key: 'last_1_month',
    label: t('timeSearch.oneMonth'),
    date_get: () => {
      const today = date_tools.today
      const last = date_tools.today_last_month
      return [last, today]
    }
  },
  {
    key: 'last_3_months',
    label: t('timeSearch.threeMonths'),
    date_get: () => {
      const today = date_tools.today
      const last = date_tools.today_for_last_month(3)
      return [last, today]
    }
  },
  {
    key: 'last_6_months',
    label: t('timeSearch.sixMonths'),
    date_get: () => {
      const today = date_tools.today
      const last = date_tools.today_for_last_month(6)
      return [last, today]
    }
  }
])

function onChange(date, dateString) {
  console.log('======  dateString  ======', date, dateString)
  state.valueStrPair = date ? [...dateString] : []
  console.log('======  valueStrPair  ======', state.valueStrPair)
  handleCommit()
}
function handleCommit() {
  const val = state.valueStrPair.length === 2 ? state.valueStrPair : undefined
  console.log('======  val  ======', val)

  emit('change', val)
}

function OnClickBtn(btn) {
  const dateFormat = 'YYYY-MM-DD'
  const [last, today] = btn.date_get()
  console.log('======date1 $$ date2======', last, today)

  state.valueStrPair = [last, today]

  const date1 = dayjs(last, dateFormat)
  const date2 = dayjs(today, dateFormat)
  state.valueObjPair = [date1, date2]

  handleCommit()
}

//
//
//
const date_tools = {
  get one_day() {
    return 1000 * 60 * 60 * 24
  },
  format(date) {
    const year = date.getFullYear().toString().padStart(4, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const today_str = `${year}-${month}-${day}`
    return today_str
  },
  get today() {
    const today = new Date()
    return this.format(today)
  },
  get today_last_month() {
    const today = new Date()
    const date2 = new Date().setDate(10) - this.one_day * 32
    const last_date = new Date(new Date(date2).setDate(today.getDate()))
    return this.format(last_date)
  },

  today_for_last_month(num) {
    const today = new Date()
    const date2 = new Date().setDate(10) - this.one_day * (2 + 30 * num)
    const last_date = new Date(new Date(date2).setDate(today.getDate()))
    return this.format(last_date)
  }
}
</script>

<style type="text/css"></style>
