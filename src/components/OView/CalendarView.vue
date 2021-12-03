<template>
  <div>
    calendar view:
    <!-- {{ calendarData }} -->
    <div>今天日期: {{ calendarData.today }}</div>
    <div>选中日期: {{ calendarData.date }}</div>
    <div>日历类型: {{ calendarData.type }} 取值:year, month, week, date</div>
    <div>时间字段: {{ date_start }}</div>

    <div>
      数据:
      <div v-for="row in dataList" :key="row.id">
        <div>日期: {{ row[date_start] }}:</div>
        <div>名称: {{ row.display_name }}</div>
        <div>其他信息:</div>

        <div>
          <div v-for="(item, index) in children_visible" :key="index">
            <b> {{ item.attrs.string }}</b>
            <span> {{ getValue({ node: item, dataDict: row }) }} </span>
          </div>
        </div>
      </div>

      <a-divider />
    </div>
  </div>
</template>

<script>
import calendarViewMixin from '@/mixins/calendarViewMixin'

export default {
  name: 'CalendarView',
  components: {},

  mixins: [calendarViewMixin],

  props: {},

  data() {
    return {}
  },
  computed: {},

  watch: {
    // eslint-disable-next-line no-unused-vars
    'calendarData.type'(newValue, oldValue) {
      // const type_map = {
      //   year: 'dayGridMonth',
      //   month: 'dayGridMonth',
      //   week: 'timeGridWeek',
      //   date: 'timeGridDay'
      // }
    }
  },

  methods: {}
}
</script>

<style scoped></style>
