<template>
  <span>
    <a-space>
      <a-button
        size="small"
        type="primary"
        icon="arrow-left"
        @click="setDate(-1)"
      />
      <a-button size="small" type="primary" @click="setDate()"> 今天 </a-button>
      <a-button
        size="small"
        type="primary"
        icon="arrow-right"
        @click="setDate(1)"
      />

      <!-- <div>{{ calendarData }}</div> -->

      <a-radio-group
        default-value="week"
        size="small"
        @change="handleChangeDateType"
      >
        <a-radio-button value="date"> 天 </a-radio-button>
        <a-radio-button value="week"> 周 </a-radio-button>
        <a-radio-button value="month"> 月 </a-radio-button>
        <a-radio-button value="year"> 年 </a-radio-button>
      </a-radio-group>
    </a-space>

    <!-- button-style="solid" -->
  </span>
</template>

<script>
import api from '@/odooapi'

export default {
  name: 'CalendarToolbar',
  components: {},
  mixins: [],

  props: {
    value: { type: Object, default: () => undefined }
  },

  data() {
    return {}
  },
  computed: {
    defaultCalendarData() {
      return api.Views.calendar.default_value()
    },
    calendarData: {
      get() {
        return this.value || this.defaultCalendarData
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },

  mounted() {},

  async created() {},

  methods: {
    handleChangeDateType(e) {
      const value = e.target.value
      this.setDateType(value)
    },

    setDateType(type) {
      const value = api.Views.calendar.onchange_type({
        value: this.calendarData,
        type
      })
      this.calendarData = value

      this.$emit('on-event', 'on-change-calendar', value)
    },

    setDate(step) {
      const value = api.Views.calendar.onchange_step({
        value: this.calendarData,
        step
      })
      this.calendarData = value
    }
  }
}
</script>

<style type="text/css"></style>
