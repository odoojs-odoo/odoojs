<template>
  <a-space>
    <a-button
      size="small"
      type="primary"
      icon="arrow-left"
      @click="setDate(-1)"
    />
    <a-button size="small" type="primary" @click="setDate()">
      今天
    </a-button>
    <a-button
      size="small"
      type="primary"
      icon="arrow-right"
      @click="setDate(1)"
    />
    <a-button size="small" @click="setDateType('date')">天</a-button>
    <a-button size="small" @click="setDateType('week')">周</a-button>
    <a-button size="small" @click="setDateType('month')">月</a-button>
    <a-button size="small" @click="setDateType('year')">年</a-button>

    <!-- <div>{{ calendarData }}</div> -->
  </a-space>
</template>

<script>
const ONE_DAY = 24 * 60 * 60 * 1000
const dateHelper = {
  // firstDateOfMonth(date) {
  //   const dt = new Date(date)
  //   dt.setDate(1)
  //   return parseTime(dt)
  // },

  // lastDateOfMonth(date) {
  //   const dt = new Date(date)
  //   dt.setDate(1)
  //   const dt2 = new Date(dt - -40 * 24 * 60 * 60 * 1000)
  //   dt2.setDate(1)
  //   const dt3 = new Date(dt2 - 24 * 60 * 60 * 1000)
  //   return parseTime(dt3)
  // },

  step(date, num) {
    if (num) return new Date(date - -num * ONE_DAY)
    else return new Date()
  },

  toYearMonthDate: dt =>
    `${dt.getFullYear()}年${dt.getMonth() + 1}月${dt.getDate()}日`,

  toYearMonth: dt => `${dt.getFullYear()}年${dt.getMonth() + 1}月`,
  toYear: dt => `${dt.getFullYear()}年`,

  weekRangeStr(date) {
    const fst = new Date(date - date.getDay() * ONE_DAY)
    const lst = new Date(fst - -6 * ONE_DAY)

    const toYMD = this.toYearMonthDate
    const toMD = dt => `${dt.getMonth() + 1}月${dt.getDate()}日`
    const toD = dt => `${dt.getDate()}日`

    const str1 = toYMD(fst)

    const str2 =
      fst.getFullYear() !== lst.getFullYear()
        ? toYMD(lst)
        : fst.getMonth() !== lst.getMonth()
        ? toMD(lst)
        : toD(lst)

    // console.log(' weekRangeStr', str1, str2)

    return `${str1} - ${str2}`
  }
}

import { parseTime } from '@/odoorpc/utils'

export default {
  name: 'CalendarToolbar',
  components: {},
  mixins: [],

  props: {},

  data() {
    const dateNowObj = new Date()
    dateNowObj.setHours(0)
    dateNowObj.setMinutes(0)
    dateNowObj.setSeconds(0)

    return {
      calendarData: {
        title: parseTime(dateNowObj, '{y}年{m}月{d}日'),
        today: parseTime(dateNowObj, '{y}-{m}-{d}'),
        date: dateNowObj,
        type: 'week'
      }
    }
  },
  computed: {},

  mounted() {
    this.setDateTitle()
  },

  async created() {},

  methods: {
    setDateTitle() {
      const type = this.calendarData.type
      const date = this.calendarData.date
      const title =
        type === 'week'
          ? dateHelper.weekRangeStr(date)
          : type === 'year'
          ? dateHelper.toYear(date)
          : type === 'month'
          ? dateHelper.toYearMonth(date)
          : type === 'date'
          ? dateHelper.toYearMonthDate(date)
          : dateHelper.toYearMonthDate(date)

      this.calendarData.title = title

      this.$emit('on-event', 'on-change-calendar', {
        ...this.calendarData,
        date: parseTime(this.calendarData.date, '{y}-{m}-{d}')
      })
    },

    setDateType(type) {
      this.calendarData.type = type
      this.setDateTitle()
    },

    setDate(step) {
      this.calendarData.date = dateHelper.step(this.calendarData.date, step)
      this.setDateTitle()
    }
  }
}
</script>

<style type="text/css"></style>
