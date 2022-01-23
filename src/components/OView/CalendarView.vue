<template>
  <div>
    <!-- calendar view: -->
    <!-- {{ calendarData2 }} -->
    <!-- <div>今天日期: {{ calendarData2.today }}</div>
    <div>选中日期: {{ calendarData2.date }}</div>
    <div>日历类型: {{ calendarData2.type }} 取值:year, month, week, date</div>
    <div>时间字段: {{ date_start }}</div> -->

    <div>
      <!-- 数据: {{ records.length }} -->
      <div v-for="row in records" :key="row.id">
        <!-- <div>日期: {{ row[date_start] }}:</div>
        <div>名称: {{ row.display_name }}</div>
        <div>其他信息:</div> -->

        <!-- <div>
          <div v-for="(item, index) in node.children" :key="index">
            <b> {{ item.attrs.string }}</b>
            <span> {{ row[item.attrs.name] }} </span>
          </div>
        </div> -->
      </div>
        
        <FullCalendar ref="myCalendar" :options="calendarOptions" />
          <!-- <a-popover :getPopupContainer="popupNode"
          v-model:visible="apVisible" title="Title" trigger="click">
          <a slot="content" @click="hide">Close</a>
        </a-popover> -->
      <!-- </FullCalendar> -->
      <!-- <a-divider /> -->
      <a-modal
          :title="mEvents.title"
          centered
          :visible="apVisible"
          :footer="null"
          @cancel="apHide(false)"
        >
          <p><b>{{ mEvents.extendedProps?mEvents.extendedProps.extra.date_order:'' }}</b></p>
          <p><b>客户：</b> <span>{{ mEvents.extendedProps?mEvents.extendedProps.extra.partner_id[1]:'' }}</span></p>
          <p><b>合计：</b> <span>{{ mEvents.extendedProps?mEvents.extendedProps.extra.amount_total:'' }}</span></p>
          <p><b>付款条款：</b> <span>{{ mEvents.extendedProps?mEvents.extendedProps.extra.payment_term_id[1]:'' }}</span></p>
        </a-modal>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import calendarViewMixin from '@/mixins/calendarViewMixin'

export default {
  name: 'CalendarView',
  components: {FullCalendar, dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin},

  mixins: [calendarViewMixin],

  props: {},

  data() {
    return {
      mEvents:{},
      popupNode: null,
      apVisible: false,
      calendarOptions: {
        // 引入的插件，比如fullcalendar/daygrid，fullcalendar/timegrid引入后才可显示月，周，日
        plugins: [ dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin ],
        initialView: 'dayGridMonth', // 默认为那个视图（月：dayGridMonth，周：timeGridWeek，日：timeGridDay）
        firstDay: 1, // 设置一周中显示的第一天是哪天，周日是0，周一是1，类推
        locale: 'zh-cn', // 切换语言，当前为中文
        eventColor: '#3BB2E3', // 全部日历日程背景色
        themeSystem: 'bootstrap', // 主题色(本地测试未能生效)
        initialDate: moment().format('YYYY-MM-DD'), // 自定义设置背景颜色时一定要初始化日期时间
        timeGridEventMinHeight: '20', // 设置事件的最小高度
        aspectRatio: 1.65, // 设置日历单元格宽度与高度的比例。
        // displayEventTime: false, // 是否显示时间
        // allDaySlot: false, // 周，日视图时，all-day 不显示
        eventLimit: true, // 设置月日程，与all-day slot的最大显示数量，超过的通过弹窗显示
        headerToolbar: { // 日历头部按钮位置
          left: 'prevYear,prev,next,nextYear',
          center: 'title',
          right: 'today dayGridMonth,timeGridWeek,timeGridDay'
        },
        buttonText: {
          today: '今天',
          month: '月',
          week: '周',
          day: '日'
        },
        slotLabelFormat: {
          hour: '2-digit',
          minute: '2-digit',
          meridiem: false,
          hour12: false // 设置时间为24小时
        },
        eventLimitNum: { // 事件显示数量限制(本地测试未能生效)
          dayGrid: {
            eventLimit: 5
          },
          timeGrid: {
            eventLimit: 2 // adjust to 6 only for timeGridWeek/timeGridDay
          }
        },
        events: [ // 存储 添加的日程
          { title: "放假",
            date:"2021-03-05",
            // start: "",
            end:"2021-03-08",  // 结束日期（不包含当天）
            id: "bianhao1111",
            color: "#82170b", // #F06050
	         }
		    ],
        // 事件
        dateClick: this.handleDateClick,
        eventClick: this.handleEventClick, // 点击日历日程事件
        // eventDblClick: this.handleEventDblClick, // 双击日历日程事件 (这部分是在源码中添加的)
        // eventClickDelete: this.eventClickDelete, // 点击删除标签事件 (这部分是在源码中添加的)
        // eventDrop: this.eventDrop, // 拖动日历日程事件
        // eventResize: this.eventResize, // 修改日历日程大小事件
        // select: this.handleDateSelect, // 选中日历格事件
        // eventDidMount: this.eventDidMount, // 安装提示事件
        // // loading: this.loadingEvent, // 视图数据加载中、加载完成触发（用于配合显示/隐藏加载指示器。）
        // // selectAllow: this.selectAllow, //编程控制用户可以选择的地方，返回true则表示可选择，false表示不可选择
        // eventMouseEnter: this.eventMouseEnter, // 鼠标滑过
        allowContextMenu: false,
        editable: true, // 是否可以进行（拖动、缩放）修改
        eventStartEditable: true, // Event日程开始时间可以改变，默认true，如果是false其实就是指日程块不能随意拖动，只能上下拉伸改变他的endTime
        eventDurationEditable: true, // Event日程的开始结束时间距离是否可以改变，默认true，如果是false则表示开始结束时间范围不能拉伸，只能拖拽
        selectable: true, // 是否可以选中日历格
        selectMirror: true,
        selectMinDistance: 0, // 选中日历格的最小距离
        dayMaxEvents: true,
        weekends: true,
        navLinks: true, // 天链接
        selectHelper: false,
        slotEventOverlap: false // 相同时间段的多个日程视觉上是否允许重叠，默认true允许
      }
    }
  },
  computed: {
    
  },

  watch: {
    'records'(newValue, oldValue){
      if(newValue.length >0){
        this.calendarOptions.events = [];
        newValue.map((item)=>{
          this.calendarOptions.events.push({
            title: item.display_name,
            //  date: item,
              start: item.date_order,
              end: item.date_order,  // 结束日期（不包含当天）
              id: item.id,
              textColor: "#82170b",
              color: "#F06050",
              extra: item
          })
        })
      }
      console.log('newValue, oldValue,', newValue, oldValue);
    }
    // // eslint-disable-next-line no-unused-vars
    // 'calendarData2.type'(newValue, oldValue) {
    //   // const type_map = {
    //   //   year: 'dayGridMonth',
    //   //   month: 'dayGridMonth',
    //   //   week: 'timeGridWeek',
    //   //   date: 'timeGridDay'
    //   // }
    // }
  },
  async created() {    
    // this.calendarOptions.initialDate = this.calendarData.today;
  },
  async mounted() {
      /** 初始化日期时间 */
    
  },

  methods: {
    handleDateClick: function(arg) {
      console.log('date click! ', arg.dateStr)
    },
    handleEventClick: function(arg) {
      this.apVisible = true;
      // this.popupNode = triggerNode => {
      //       return arg.el.parentElement || triggerNode.parentNode || document.body;
      //     }
      this.mEvents = arg.event;
      // console.log('events click! ', arg.event.id, arg.event.title, arg.event.extendedProps.extra)
    },
    apHide() {
      this.apVisible = false;
    },
  }
}
</script>

<style scoped></style>
