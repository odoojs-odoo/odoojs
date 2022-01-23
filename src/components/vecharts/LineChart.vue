<template>
  <div id="myChart" ref="ECharts" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from '../../mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '550px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    },
    // axiasx: {
    //   type: Array,
    //   default: () => []
    // },
    // axiasy: {
    //   type: Array,
    //   default: () => []
    // },
  },
  data() {
    return {
      chart: null,
      colors: ['#35D2FD', '#F56B3C', '#F2A936', '#D8F754', '#76F738', '#40C02D', '#6AE8FE', '#389AFD','#285BF5'],
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        console.log('echarts,setOptions,,', val);
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.chart = echarts.init(this.$refs.ECharts)
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      
      this.setOptions(this.chartData)
    },
    setOptions({ expectedData, actualData, xTopName, xDatas, yDatas, axiasX, axiasY }) {
      this.chart.setOption({
        xAxis: {
          // name: axiasX,
          data: [...new Set(xDatas)] || ['周一', '周二', '周三', '周四', '周五', '周六', '周日'], // ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          boundaryGap: false,
          axisTick: {
            show: true
          }
        },
        grid: {
          left: 36,
          right: 56,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          name: [...new Set(axiasY)] || '1222',
          axisTick: {
            show: true
          }
        },
        legend: {
          data: [...new Set(axiasX)] || ['迟到', '正常'] || xTopName, // ['迟到', '正常']
        },
        series: [...new Set(axiasX)] || [
        //   {
        //   name: '迟到' || xTopName[0] // '迟到'
        //   , itemStyle: {
        //     normal: {
        //       color: '#FF005A',
        //       lineStyle: {
        //         color: '#FF005A',
        //         width: 2
        //       }
        //     }
        //   },
        //   smooth: true,
        //   type: 'line',
        //   data: [2, 9, 7, 6, 4, 1, 8] || xDatas,
        //   animationDuration: 2800,
        //   animationEasing: 'cubicInOut'
        // },
        {
          name: axiasX[0] || '正常' || xTopName[1],
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#3888fa',
              lineStyle: {
                color: '#3888fa',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          data: yDatas || [2, 9, 7, 6, 4, 1, 8],
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }
        ]
      })
    }
  }
}
</script>
