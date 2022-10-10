<template>
  <span>
    <span>
      {{ title }}
    </span>

    <a-space>
      <a-button
        v-for="btn in buttons"
        :key="btn.key"
        @click="handleOnClickBtn(btn)"
      >
        {{ btn.label }}
      </a-button>
    </a-space>

    <a-range-picker
      v-model="value_date"
      @change="handleChange"
      class="margin-left6"
    />
    <!-- <a-button size="small" @click="handleCommit" class="margin-left6">
      确定
    </a-button> -->
  </span>
</template>

<script>
import moment from 'moment'

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

export default {
  name: 'SearchDefault',

  components: {},

  mixins: [],

  props: {
    title: { type: String, default: undefined },
    value: { type: Array, default: () => [] },
    placeholder: { type: String, default: undefined }
  },

  data() {
    return {
      value_date: [],
      value2: []
    }
  },
  computed: {
    buttons() {
      return [
        {
          key: 'today',
          label: '今天',
          date_get: () => {
            const today = date_tools.today
            return [today, today]
          }
        },
        {
          key: 'last_1_month',
          label: '近一个月',
          date_get: () => {
            const today = date_tools.today
            const last = date_tools.today_last_month
            return [last, today]
          }
        },
        {
          key: 'last_3_months',
          label: '近三个月',
          date_get: () => {
            const today = date_tools.today
            const last = date_tools.today_for_last_month(3)
            return [last, today]
          }
        },
        {
          key: 'last_3_months',
          label: '近半年',
          date_get: () => {
            const today = date_tools.today
            const last = date_tools.today_for_last_month(6)
            return [last, today]
          }
        }
      ]
    }
  },
  watch: {
    value: {
      handler: function (val = []) {
        this.value2 = [...val]
        if (val.length === 2) {
          const [last, today] = val
          const date1 = moment(last)
          const date2 = moment(today)
          this.value_date = [date1, date2]
        } else {
          this.value_date = []
        }
      },
      deep: true
    }
  },

  async created() {},

  mounted() {},

  methods: {
    handleOnClickBtn(btn) {
      const [last, today] = btn.date_get()
      this.value2 = [last, today]
      const date1 = moment(last)
      const date2 = moment(today)
      this.value_date = [date1, date2]
      // console.log(today, today_str)
      this.handleCommit()
    },
    handleChange(date, dateString) {
      this.value2 = [...dateString]
      this.handleCommit()
    },
    handleCommit() {
      console.log(this.value2)
      const val = this.value2.length === 2 ? this.value2 : undefined
      this.$emit('change', val)
    }
  }
}
</script>

<style type="text/css" scoped>
.margin-left6 {
  margin-left: 6px;
}
</style>
