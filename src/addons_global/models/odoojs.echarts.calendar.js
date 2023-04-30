import { Model } from '@/odoorpc/models'

import * as echarts from 'echarts/core'

function randInt() {
  return Math.floor((Math.random() * 1000) / 23)
}

export class ExtendModel extends Model {
  constructor(...args) {
    super(...args)
  }

  static async get_echart_option_report() {
    function getVirtualData(year) {
      const date = +echarts.time.parse(year + '-01-01')
      const end = +echarts.time.parse(year + '-12-31')
      const dayTime = 3600 * 24 * 1000
      const data = []
      for (let time = date; time <= end; time += dayTime) {
        data.push([
          echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
          Math.floor(Math.random() * 10000)
        ])
      }
      return data
    }
    const option = {
      visualMap: {
        show: false,
        min: 0,
        max: 10000
      },
      calendar: {
        range: '2017'
      },
      series: {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: getVirtualData('2017')
      }
    }

    return option
  }

  static async get_echart_data_report() {
    return {
      //   dimensions: ['product', 'amount', 'tax', 'total'],
      //   source
    }
  }

  static async get_echart_option_report2() {
    function getVirtualData(year) {
      const date = +echarts.time.parse(year + '-01-01')
      const end = +echarts.time.parse(+year + 1 + '-01-01')
      const dayTime = 3600 * 24 * 1000
      const data = []
      for (let time = date; time < end; time += dayTime) {
        data.push([
          echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
          Math.floor(Math.random() * 10000)
        ])
      }
      return data
    }
    const option = {
      title: {
        top: 30,
        left: 'center',
        text: 'Daily Step Count'
      },
      tooltip: {},
      visualMap: {
        min: 0,
        max: 10000,
        type: 'piecewise',
        orient: 'horizontal',
        left: 'center',
        top: 65
      },
      calendar: {
        top: 120,
        left: 30,
        right: 30,
        cellSize: ['auto', 13],
        range: '2016',
        itemStyle: {
          borderWidth: 0.5
        },
        yearLabel: { show: false }
      },
      series: {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: getVirtualData('2016')
      }
    }
    return option
  }

  static async get_echart_data_report2() {
    return {
      //   dimensions: ['product', 'amount', 'tax', 'total'],
      //   source
    }
  }

  static async get_echart_option_report3() {
    function getVirtualData(year) {
      const date = +echarts.time.parse(year + '-01-01')
      const end = +echarts.time.parse(+year + 1 + '-01-01')
      const dayTime = 3600 * 24 * 1000
      const data = []
      for (let time = date; time < end; time += dayTime) {
        data.push([
          echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
          Math.floor(Math.random() * 1000)
        ])
      }
      return data
    }
    const option = {
      tooltip: {
        position: 'top',
        formatter: function (p) {
          const format = echarts.time.format(
            p.data[0],
            '{yyyy}-{MM}-{dd}',
            false
          )
          return format + ': ' + p.data[1]
        }
      },
      visualMap: {
        min: 0,
        max: 1000,
        calculable: true,
        orient: 'vertical',
        left: '670',
        top: 'center'
      },
      calendar: [
        {
          orient: 'vertical',
          range: '2015'
        },
        {
          left: 300,
          orient: 'vertical',
          range: '2016'
        },
        {
          left: 520,
          cellSize: [20, 'auto'],
          bottom: 10,
          orient: 'vertical',
          range: '2017',
          dayLabel: {
            margin: 5
          }
        }
      ],
      series: [
        {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          calendarIndex: 0,
          data: getVirtualData('2015')
        },
        {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          calendarIndex: 1,
          data: getVirtualData('2016')
        },
        {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          calendarIndex: 2,
          data: getVirtualData('2017')
        }
      ]
    }
    return option
  }

  static async get_echart_data_report3() {
    return {
      //   dimensions: ['product', 'amount', 'tax', 'total'],
      //   source
    }
  }

  static async get_echart_option_report4() {
    function getVirtualData(year) {
      const date = +echarts.time.parse(year + '-01-01')
      const end = +echarts.time.parse(+year + 1 + '-01-01')
      const dayTime = 3600 * 24 * 1000
      const data = []
      for (let time = date; time < end; time += dayTime) {
        data.push([
          echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
          Math.floor(Math.random() * 1000)
        ])
      }
      return data
    }
    const option = {
      tooltip: {
        position: 'top'
      },
      visualMap: {
        min: 0,
        max: 1000,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        top: 'top'
      },
      calendar: [
        {
          range: '2017',
          cellSize: ['auto', 20]
        },
        {
          top: 260,
          range: '2016',
          cellSize: ['auto', 20]
        },
        {
          top: 450,
          range: '2015',
          cellSize: ['auto', 20],
          right: 5
        }
      ],
      series: [
        {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          calendarIndex: 0,
          data: getVirtualData('2017')
        },
        {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          calendarIndex: 1,
          data: getVirtualData('2016')
        },
        {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          calendarIndex: 2,
          data: getVirtualData('2015')
        }
      ]
    }
    return option
  }

  static async get_echart_data_report4() {
    return {
      //   dimensions: ['product', 'amount', 'tax', 'total'],
      //   source
    }
  }

  static async get_echart_option_report5() {
    const graphData = [
      ['2017-02-01', 260],
      ['2017-02-04', 200],
      ['2017-02-09', 279],
      ['2017-02-13', 847],
      ['2017-02-18', 241],
      ['2017-02-23', 411],
      ['2017-03-14', 985]
    ]
    const links = graphData.map(function (item, idx) {
      return {
        source: idx,
        target: idx + 1
      }
    })
    links.pop()
    function getVirtualData(year) {
      const date = +echarts.time.parse(year + '-01-01')
      const end = +echarts.time.parse(+year + 1 + '-01-01')
      const dayTime = 3600 * 24 * 1000
      const data = []
      for (let time = date; time < end; time += dayTime) {
        data.push([
          echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
          Math.floor(Math.random() * 1000)
        ])
      }
      return data
    }
    const option = {
      tooltip: {},
      calendar: {
        top: 'middle',
        left: 'center',
        orient: 'vertical',
        cellSize: 40,
        yearLabel: {
          margin: 50,
          fontSize: 30
        },
        dayLabel: {
          firstDay: 1,
          nameMap: 'cn'
        },
        monthLabel: {
          nameMap: 'cn',
          margin: 15,
          fontSize: 20,
          color: '#999'
        },
        range: ['2017-02', '2017-03-31']
      },
      visualMap: {
        min: 0,
        max: 1000,
        type: 'piecewise',
        left: 'center',
        bottom: 20,
        inRange: {
          color: ['#5291FF', '#C7DBFF']
        },
        seriesIndex: [1],
        orient: 'horizontal'
      },
      series: [
        {
          type: 'graph',
          edgeSymbol: ['none', 'arrow'],
          coordinateSystem: 'calendar',
          links: links,
          symbolSize: 15,
          calendarIndex: 0,
          itemStyle: {
            color: 'yellow',
            shadowBlur: 9,
            shadowOffsetX: 1.5,
            shadowOffsetY: 3,
            shadowColor: '#555'
          },
          lineStyle: {
            color: '#D10E00',
            width: 1,
            opacity: 1
          },
          data: graphData,
          z: 20
        },
        {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          data: getVirtualData('2017')
        }
      ]
    }

    return option
  }

  static async get_echart_data_report5() {
    return {
      //   dimensions: ['product', 'amount', 'tax', 'total'],
      //   source
    }
  }

  static async get_echart_option_report6() {
    const dateList = [
      ['2017-1-1', '初四'],
      ['2017-1-2', '初五'],
      ['2017-1-3', '初六'],
      ['2017-1-4', '初七'],
      ['2017-1-5', '初八', '小寒'],
      ['2017-1-6', '初九'],
      ['2017-1-7', '初十'],
      ['2017-1-8', '十一'],
      ['2017-1-9', '十二'],
      ['2017-1-10', '十三'],
      ['2017-1-11', '十四'],
      ['2017-1-12', '十五'],
      ['2017-1-13', '十六'],
      ['2017-1-14', '十七'],
      ['2017-1-15', '十八'],
      ['2017-1-16', '十九'],
      ['2017-1-17', '二十'],
      ['2017-1-18', '廿一'],
      ['2017-1-19', '廿二'],
      ['2017-1-20', '廿三', '大寒'],
      ['2017-1-21', '廿四'],
      ['2017-1-22', '廿五'],
      ['2017-1-23', '廿六'],
      ['2017-1-24', '廿七'],
      ['2017-1-25', '廿八'],
      ['2017-1-26', '廿九'],
      ['2017-1-27', '三十'],
      ['2017-1-28', '正月'],
      ['2017-1-29', '初二'],
      ['2017-1-30', '初三'],
      ['2017-1-31', '初四'],
      ['2017-2-1', '初五'],
      ['2017-2-2', '初六'],
      ['2017-2-3', '初七', '立春'],
      ['2017-2-4', '初八'],
      ['2017-2-5', '初九'],
      ['2017-2-6', '初十'],
      ['2017-2-7', '十一'],
      ['2017-2-8', '十二'],
      ['2017-2-9', '十三'],
      ['2017-2-10', '十四'],
      ['2017-2-11', '十五'],
      ['2017-2-12', '十六'],
      ['2017-2-13', '十七'],
      ['2017-2-14', '十八'],
      ['2017-2-15', '十九'],
      ['2017-2-16', '二十'],
      ['2017-2-17', '廿一'],
      ['2017-2-18', '廿二', '雨水'],
      ['2017-2-19', '廿三'],
      ['2017-2-20', '廿四'],
      ['2017-2-21', '廿五'],
      ['2017-2-22', '廿六'],
      ['2017-2-23', '廿七'],
      ['2017-2-24', '廿八'],
      ['2017-2-25', '廿九'],
      ['2017-2-26', '二月'],
      ['2017-2-27', '初二'],
      ['2017-2-28', '初三'],
      ['2017-3-1', '初四'],
      ['2017-3-2', '初五'],
      ['2017-3-3', '初六'],
      ['2017-3-4', '初七'],
      ['2017-3-5', '初八', '驚蟄'],
      ['2017-3-6', '初九'],
      ['2017-3-7', '初十'],
      ['2017-3-8', '十一'],
      ['2017-3-9', '十二'],
      ['2017-3-10', '十三'],
      ['2017-3-11', '十四'],
      ['2017-3-12', '十五'],
      ['2017-3-13', '十六'],
      ['2017-3-14', '十七'],
      ['2017-3-15', '十八'],
      ['2017-3-16', '十九'],
      ['2017-3-17', '二十'],
      ['2017-3-18', '廿一'],
      ['2017-3-19', '廿二'],
      ['2017-3-20', '廿三', '春分'],
      ['2017-3-21', '廿四'],
      ['2017-3-22', '廿五'],
      ['2017-3-23', '廿六'],
      ['2017-3-24', '廿七'],
      ['2017-3-25', '廿八'],
      ['2017-3-26', '廿九'],
      ['2017-3-27', '三十'],
      ['2017-3-28', '三月'],
      ['2017-3-29', '初二'],
      ['2017-3-30', '初三'],
      ['2017-3-31', '初四'],
      ['2017-4-1', '初五'],
      ['2017-4-2', '初六'],
      ['2017-4-3', '初七'],
      ['2017-4-4', '初八', '清明'],
      ['2017-4-5', '初九'],
      ['2017-4-6', '初十'],
      ['2017-4-7', '十一'],
      ['2017-4-8', '十二'],
      ['2017-4-9', '十三'],
      ['2017-4-10', '十四'],
      ['2017-4-11', '十五'],
      ['2017-4-12', '十六'],
      ['2017-4-13', '十七'],
      ['2017-4-14', '十八'],
      ['2017-4-15', '十九'],
      ['2017-4-16', '二十'],
      ['2017-4-17', '廿一'],
      ['2017-4-18', '廿二'],
      ['2017-4-19', '廿三'],
      ['2017-4-20', '廿四', '穀雨'],
      ['2017-4-21', '廿五'],
      ['2017-4-22', '廿六'],
      ['2017-4-23', '廿七'],
      ['2017-4-24', '廿八'],
      ['2017-4-25', '廿九'],
      ['2017-4-26', '四月'],
      ['2017-4-27', '初二'],
      ['2017-4-28', '初三'],
      ['2017-4-29', '初四'],
      ['2017-4-30', '初五'],
      ['2017-5-1', '初六'],
      ['2017-5-2', '初七'],
      ['2017-5-3', '初八'],
      ['2017-5-4', '初九'],
      ['2017-5-5', '初十', '立夏'],
      ['2017-5-6', '十一'],
      ['2017-5-7', '十二'],
      ['2017-5-8', '十三'],
      ['2017-5-9', '十四'],
      ['2017-5-10', '十五'],
      ['2017-5-11', '十六'],
      ['2017-5-12', '十七'],
      ['2017-5-13', '十八'],
      ['2017-5-14', '十九'],
      ['2017-5-15', '二十'],
      ['2017-5-16', '廿一'],
      ['2017-5-17', '廿二'],
      ['2017-5-18', '廿三'],
      ['2017-5-19', '廿四'],
      ['2017-5-20', '廿五'],
      ['2017-5-21', '廿六', '小滿'],
      ['2017-5-22', '廿七'],
      ['2017-5-23', '廿八'],
      ['2017-5-24', '廿九'],
      ['2017-5-25', '三十'],
      ['2017-5-26', '五月'],
      ['2017-5-27', '初二'],
      ['2017-5-28', '初三'],
      ['2017-5-29', '初四'],
      ['2017-5-30', '初五'],
      ['2017-5-31', '初六'],
      ['2017-6-1', '初七'],
      ['2017-6-2', '初八'],
      ['2017-6-3', '初九'],
      ['2017-6-4', '初十'],
      ['2017-6-5', '十一', '芒種'],
      ['2017-6-6', '十二'],
      ['2017-6-7', '十三'],
      ['2017-6-8', '十四'],
      ['2017-6-9', '十五'],
      ['2017-6-10', '十六'],
      ['2017-6-11', '十七'],
      ['2017-6-12', '十八'],
      ['2017-6-13', '十九'],
      ['2017-6-14', '二十'],
      ['2017-6-15', '廿一'],
      ['2017-6-16', '廿二'],
      ['2017-6-17', '廿三'],
      ['2017-6-18', '廿四'],
      ['2017-6-19', '廿五'],
      ['2017-6-20', '廿六'],
      ['2017-6-21', '廿七', '夏至'],
      ['2017-6-22', '廿八'],
      ['2017-6-23', '廿九'],
      ['2017-6-24', '六月'],
      ['2017-6-25', '初二'],
      ['2017-6-26', '初三'],
      ['2017-6-27', '初四'],
      ['2017-6-28', '初五'],
      ['2017-6-29', '初六'],
      ['2017-6-30', '初七'],
      ['2017-7-1', '初八'],
      ['2017-7-2', '初九'],
      ['2017-7-3', '初十'],
      ['2017-7-4', '十一'],
      ['2017-7-5', '十二'],
      ['2017-7-6', '十三'],
      ['2017-7-7', '十四', '小暑'],
      ['2017-7-8', '十五'],
      ['2017-7-9', '十六'],
      ['2017-7-10', '十七'],
      ['2017-7-11', '十八'],
      ['2017-7-12', '十九'],
      ['2017-7-13', '二十'],
      ['2017-7-14', '廿一'],
      ['2017-7-15', '廿二'],
      ['2017-7-16', '廿三'],
      ['2017-7-17', '廿四'],
      ['2017-7-18', '廿五'],
      ['2017-7-19', '廿六'],
      ['2017-7-20', '廿七'],
      ['2017-7-21', '廿八'],
      ['2017-7-22', '廿九', '大暑'],
      ['2017-7-23', '閏六'],
      ['2017-7-24', '初二'],
      ['2017-7-25', '初三'],
      ['2017-7-26', '初四'],
      ['2017-7-27', '初五'],
      ['2017-7-28', '初六'],
      ['2017-7-29', '初七'],
      ['2017-7-30', '初八'],
      ['2017-7-31', '初九'],
      ['2017-8-1', '初十'],
      ['2017-8-2', '十一'],
      ['2017-8-3', '十二'],
      ['2017-8-4', '十三'],
      ['2017-8-5', '十四'],
      ['2017-8-6', '十五'],
      ['2017-8-7', '十六', '立秋'],
      ['2017-8-8', '十七'],
      ['2017-8-9', '十八'],
      ['2017-8-10', '十九'],
      ['2017-8-11', '二十'],
      ['2017-8-12', '廿一'],
      ['2017-8-13', '廿二'],
      ['2017-8-14', '廿三'],
      ['2017-8-15', '廿四'],
      ['2017-8-16', '廿五'],
      ['2017-8-17', '廿六'],
      ['2017-8-18', '廿七'],
      ['2017-8-19', '廿八'],
      ['2017-8-20', '廿九'],
      ['2017-8-21', '三十'],
      ['2017-8-22', '七月'],
      ['2017-8-23', '初二', '處暑'],
      ['2017-8-24', '初三'],
      ['2017-8-25', '初四'],
      ['2017-8-26', '初五'],
      ['2017-8-27', '初六'],
      ['2017-8-28', '初七'],
      ['2017-8-29', '初八'],
      ['2017-8-30', '初九'],
      ['2017-8-31', '初十'],
      ['2017-9-1', '十一'],
      ['2017-9-2', '十二'],
      ['2017-9-3', '十三'],
      ['2017-9-4', '十四'],
      ['2017-9-5', '十五'],
      ['2017-9-6', '十六'],
      ['2017-9-7', '十七', '白露'],
      ['2017-9-8', '十八'],
      ['2017-9-9', '十九'],
      ['2017-9-10', '二十'],
      ['2017-9-11', '廿一'],
      ['2017-9-12', '廿二'],
      ['2017-9-13', '廿三'],
      ['2017-9-14', '廿四'],
      ['2017-9-15', '廿五'],
      ['2017-9-16', '廿六'],
      ['2017-9-17', '廿七'],
      ['2017-9-18', '廿八'],
      ['2017-9-19', '廿九'],
      ['2017-9-20', '八月'],
      ['2017-9-21', '初二'],
      ['2017-9-22', '初三'],
      ['2017-9-23', '初四', '秋分'],
      ['2017-9-24', '初五'],
      ['2017-9-25', '初六'],
      ['2017-9-26', '初七'],
      ['2017-9-27', '初八'],
      ['2017-9-28', '初九'],
      ['2017-9-29', '初十'],
      ['2017-9-30', '十一'],
      ['2017-10-1', '十二'],
      ['2017-10-2', '十三'],
      ['2017-10-3', '十四'],
      ['2017-10-4', '十五'],
      ['2017-10-5', '十六'],
      ['2017-10-6', '十七'],
      ['2017-10-7', '十八'],
      ['2017-10-8', '十九', '寒露'],
      ['2017-10-9', '二十'],
      ['2017-10-10', '廿一'],
      ['2017-10-11', '廿二'],
      ['2017-10-12', '廿三'],
      ['2017-10-13', '廿四'],
      ['2017-10-14', '廿五'],
      ['2017-10-15', '廿六'],
      ['2017-10-16', '廿七'],
      ['2017-10-17', '廿八'],
      ['2017-10-18', '廿九'],
      ['2017-10-19', '三十'],
      ['2017-10-20', '九月'],
      ['2017-10-21', '初二'],
      ['2017-10-22', '初三'],
      ['2017-10-23', '初四', '霜降'],
      ['2017-10-24', '初五'],
      ['2017-10-25', '初六'],
      ['2017-10-26', '初七'],
      ['2017-10-27', '初八'],
      ['2017-10-28', '初九'],
      ['2017-10-29', '初十'],
      ['2017-10-30', '十一'],
      ['2017-10-31', '十二'],
      ['2017-11-1', '十三'],
      ['2017-11-2', '十四'],
      ['2017-11-3', '十五'],
      ['2017-11-4', '十六'],
      ['2017-11-5', '十七'],
      ['2017-11-6', '十八'],
      ['2017-11-7', '十九', '立冬'],
      ['2017-11-8', '二十'],
      ['2017-11-9', '廿一'],
      ['2017-11-10', '廿二'],
      ['2017-11-11', '廿三'],
      ['2017-11-12', '廿四'],
      ['2017-11-13', '廿五'],
      ['2017-11-14', '廿六'],
      ['2017-11-15', '廿七'],
      ['2017-11-16', '廿八'],
      ['2017-11-17', '廿九'],
      ['2017-11-18', '十月'],
      ['2017-11-19', '初二'],
      ['2017-11-20', '初三'],
      ['2017-11-21', '初四'],
      ['2017-11-22', '初五', '小雪'],
      ['2017-11-23', '初六'],
      ['2017-11-24', '初七'],
      ['2017-11-25', '初八'],
      ['2017-11-26', '初九'],
      ['2017-11-27', '初十'],
      ['2017-11-28', '十一'],
      ['2017-11-29', '十二'],
      ['2017-11-30', '十三'],
      ['2017-12-1', '十四'],
      ['2017-12-2', '十五'],
      ['2017-12-3', '十六'],
      ['2017-12-4', '十七'],
      ['2017-12-5', '十八'],
      ['2017-12-6', '十九'],
      ['2017-12-7', '二十', '大雪'],
      ['2017-12-8', '廿一'],
      ['2017-12-9', '廿二'],
      ['2017-12-10', '廿三'],
      ['2017-12-11', '廿四'],
      ['2017-12-12', '廿五'],
      ['2017-12-13', '廿六'],
      ['2017-12-14', '廿七'],
      ['2017-12-15', '廿八'],
      ['2017-12-16', '廿九'],
      ['2017-12-17', '三十'],
      ['2017-12-18', '十一月'],
      ['2017-12-19', '初二'],
      ['2017-12-20', '初三'],
      ['2017-12-21', '初四'],
      ['2017-12-22', '初五', '冬至'],
      ['2017-12-23', '初六'],
      ['2017-12-24', '初七'],
      ['2017-12-25', '初八'],
      ['2017-12-26', '初九'],
      ['2017-12-27', '初十'],
      ['2017-12-28', '十一'],
      ['2017-12-29', '十二'],
      ['2017-12-30', '十三'],
      ['2017-12-31', '十四']
    ]
    const heatmapData = []
    const lunarData = []
    for (let i = 0; i < dateList.length; i++) {
      heatmapData.push([dateList[i][0], Math.random() * 300])
      lunarData.push([dateList[i][0], 1, dateList[i][1], dateList[i][2]])
    }
    const option = {
      tooltip: {
        formatter: function (params) {
          return '降雨量: ' + params.value[1].toFixed(2)
        }
      },
      visualMap: {
        show: false,
        min: 0,
        max: 300,
        calculable: true,
        seriesIndex: [2],
        orient: 'horizontal',
        left: 'center',
        bottom: 20,
        inRange: {
          color: ['#e0ffff', '#006edd'],
          opacity: 0.3
        },
        controller: {
          inRange: {
            opacity: 0.5
          }
        }
      },
      calendar: [
        {
          left: 'center',
          top: 'middle',
          cellSize: [70, 70],
          yearLabel: { show: false },
          orient: 'vertical',
          dayLabel: {
            firstDay: 1,
            nameMap: 'cn'
          },
          monthLabel: {
            show: false
          },
          range: '2017-03'
        }
      ],
      series: [
        {
          type: 'scatter',
          coordinateSystem: 'calendar',
          symbolSize: 0,
          label: {
            show: true,
            formatter: function (params) {
              var d = echarts.number.parseDate(params.value[0])
              return d.getDate() + '\n\n' + params.value[2] + '\n\n'
            },
            color: '#000'
          },
          data: lunarData,
          silent: true
        },
        {
          type: 'scatter',
          coordinateSystem: 'calendar',
          symbolSize: 0,
          label: {
            show: true,
            formatter: function (params) {
              return '\n\n\n' + (params.value[3] || '')
            },
            fontSize: 14,
            fontWeight: 700,
            color: '#a00'
          },
          data: lunarData,
          silent: true
        },
        {
          name: '降雨量',
          type: 'heatmap',
          coordinateSystem: 'calendar',
          data: heatmapData
        }
      ]
    }

    return option
  }

  static async get_echart_data_report6() {
    return {
      //   dimensions: ['product', 'amount', 'tax', 'total'],
      //   source
    }
  }

  static async get_echart_option_report7() {
    // This example requires ECharts v5.4.0 or later
    const cellSize = [80, 80]
    const pieRadius = 30
    function getVirtualData() {
      const date = +echarts.time.parse('2017-02-01')
      const end = +echarts.time.parse('2017-03-01')
      const dayTime = 3600 * 24 * 1000
      const data = []
      for (let time = date; time < end; time += dayTime) {
        data.push([
          echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
          Math.floor(Math.random() * 10000)
        ])
      }
      return data
    }
    const scatterData = getVirtualData()
    const pieSeries = scatterData.map(function (item, index) {
      return {
        type: 'pie',
        id: 'pie-' + index,
        center: item[0],
        radius: pieRadius,
        coordinateSystem: 'calendar',
        label: {
          formatter: '{c}',
          position: 'inside'
        },
        data: [
          { name: 'Work', value: Math.round(Math.random() * 24) },
          { name: 'Entertainment', value: Math.round(Math.random() * 24) },
          { name: 'Sleep', value: Math.round(Math.random() * 24) }
        ]
      }
    })
    const option = {
      tooltip: {},
      legend: {
        data: ['Work', 'Entertainment', 'Sleep'],
        bottom: 20
      },
      calendar: {
        top: 'middle',
        left: 'center',
        orient: 'vertical',
        cellSize: cellSize,
        yearLabel: {
          show: false,
          fontSize: 30
        },
        dayLabel: {
          margin: 20,
          firstDay: 1,
          nameMap: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        monthLabel: {
          show: false
        },
        range: ['2017-02']
      },
      series: [
        {
          id: 'label',
          type: 'scatter',
          coordinateSystem: 'calendar',
          symbolSize: 0,
          label: {
            show: true,
            formatter: function (params) {
              return echarts.time.format(params.value[0], '{dd}', false)
            },
            offset: [-cellSize[0] / 2 + 10, -cellSize[1] / 2 + 10],
            fontSize: 14
          },
          data: scatterData
        },
        ...pieSeries
      ]
    }
    return option
  }

  static async get_echart_data_report7() {
    return {
      //   dimensions: ['product', 'amount', 'tax', 'total'],
      //   source
    }
  }

  static async get_echart_option_report8() {
    const layouts = [
      [[0, 0]],
      [
        [-0.25, 0],
        [0.25, 0]
      ],
      [
        [0, -0.2],
        [-0.2, 0.2],
        [0.2, 0.2]
      ],
      [
        [-0.25, -0.25],
        [-0.25, 0.25],
        [0.25, -0.25],
        [0.25, 0.25]
      ]
    ]
    const pathes = [
      'M936.857805 523.431322c0 0-42.065715-68.89513-88.786739-68.89513-46.68416 0-95.732122 71.223091-95.732122 71.223091s-44.28544-72.503296-93.440922-71.152538c-35.565466 0.977306-62.89705 30.882406-79.124275 64.06615L579.773747 790.800797c-3.253248 37.391565-5.677568 50.904371-12.002816 69.63497-6.651802 19.698688-19.544883 35.227341-31.650099 45.909606-14.30231 12.621414-29.59831 22.066586-45.854208 27.424563-16.28969 5.362074-30.098739 6.496973-51.536794 6.496973-19.498906 0-36.95104-2.963456-52.395418-8.850534-15.410586-5.887078-28.420403-14.313984-39.034573-25.246003-10.613146-10.930995-18.757939-24.08151-24.435507-39.525171-5.676544-15.443763-8.532685-40.195482-8.532685-59.270963l0-26.232454 74.435273 0c0 24.644301-0.17705 64.452915 8.81408 77.006848 9.02697 12.515021 22.756147 18.092032 41.148826 18.791014 16.728678 0.636518 30.032179-8.061645 30.032179-8.061645s11.922022-10.5472 14.992077-19.756954c2.674995-8.025805 3.565363-22.180147 3.565363-22.180147s2.080461-21.789286 2.080461-34.234675L489.399906 514.299369c-16.678502-18.827776-43.801395-61.938688-82.756096-60.927693-54.699008 1.419366-100.422144 70.059622-100.422144 70.059622s-56.065126-70.059622-93.440922-70.059622c-37.376717 0-91.077939 70.059622-91.077939 70.059622S105.343488 156.737741 476.742042 119.363584l53.70327-74.714624 51.373056 74.714624C964.889395 142.740992 936.857805 523.431322 936.857805 523.431322z',
      'M533.504 268.288q33.792-41.984 71.68-75.776 32.768-27.648 74.24-50.176t86.528-19.456q63.488 5.12 105.984 30.208t67.584 63.488 34.304 87.04 6.144 99.84-17.92 97.792-36.864 87.04-48.64 74.752-53.248 61.952q-40.96 41.984-85.504 78.336t-84.992 62.464-73.728 41.472-51.712 15.36q-20.48 1.024-52.224-14.336t-69.632-41.472-79.872-61.952-82.944-75.776q-26.624-25.6-57.344-59.392t-57.856-74.24-46.592-87.552-21.504-100.352 11.264-99.84 39.936-83.456 65.536-61.952 88.064-35.328q24.576-5.12 49.152-1.536t48.128 12.288 45.056 22.016 40.96 27.648q45.056 33.792 86.016 80.896z',
      'M741.06368 733.310464c8.075264-29.262438 20.615373-40.632422 14.64105-162.810061C966.089728 361.789952 967.93897 72.37847 967.855002 54.693683c0.279347-0.279347 0.418509-0.419533 0.418509-0.419533s-0.17705-0.00512-0.428749-0.00512c0-0.251699 0-0.428749 0-0.428749s-0.139162 0.14633-0.418509 0.425677c-17.695744-0.083866-307.10784 1.760051-515.833958 212.142592-122.181632-5.984256-133.55305 6.563533-162.815693 14.644531C235.35063 295.798886 103.552614 436.975309 90.630758 486.076621c-12.921856 49.105408 39.634227 56.859034 58.579558 58.581197 18.953421 1.724314 121.471386-9.475789 130.09111 4.309094 0 0 16.367411 11.200102 17.226035 41.346662 0.850432 29.796659 15.173222 71.354163 37.123994 97.267302-0.028672 0.027648-0.05632 0.054272-0.083866 0.074752 0.158618 0.13097 0.316211 0.261939 0.474829 0.390861 0.129946 0.149402 0.261939 0.319283 0.393011 0.468685 0.019456-0.019456 0.04608-0.049152 0.075776-0.075674 25.918362 21.961216 67.477504 36.272128 97.269248 37.122458 30.149837 0.859546 41.354547 17.234534 41.354547 17.234534 13.779354 8.608051 2.583962 111.122842 4.302131 130.075546 1.727386 18.95168 9.477222 71.498445 58.579558 58.576077C585.12896 918.526771 726.311117 786.734182 741.06368 733.310464zM595.893555 426.206003c-39.961702-39.965184-39.961702-104.75991 0-144.720077 39.970918-39.96928 104.768307-39.96928 144.730112 0 39.970918 39.960064 39.970918 104.75479 0 144.720077C700.661862 466.171187 635.864474 466.171187 595.893555 426.206003zM358.53312 769.516032c-31.923302-4.573184-54.890394-18.410291-71.41847-35.402342-16.984474-16.526438-30.830387-39.495475-35.405824-71.420621-4.649062-28.082586-20.856832-41.167565-38.76649-38.763827-17.906586 2.40681-77.046886 66.714419-80.857805 89.475891-3.80887 22.752154 29.271859 12.081152 46.424166 27.654861 17.151283 15.590093-2.139853 61.93664-14.733107 86.845952-6.441984 12.735078-10.289766 26.42176-4.22953 33.76087 7.346586 6.070272 21.03593 2.222592 33.769472-4.220109 24.912384-12.585677 71.258829-31.872922 86.842368-14.731469 15.583539 17.160806 4.911002 50.229965 27.674419 46.419251 22.754099-3.807744 87.065395-62.946611 89.466163-80.85248C399.70857 790.374093 386.627072 774.166938 358.53312 769.516032z',
      'M848.794624 939.156685 571.780416 939.156685 571.780416 653.17123l341.897539 0 0 221.100654C913.677926 909.960704 884.482867 939.156685 848.794624 939.156685zM571.780403 318.743552c-11.861606-3.210138-31.443354-8.36864-39.829709-16.176435-0.596582-0.561766-1.016218-1.246413-1.613824-1.841971-0.560845 0.596582-1.016218 1.280205-1.613824 1.841971-8.386355 7.807795-15.96631 12.965274-27.827917 16.176435l0 263.544325L141.030675 582.287877 141.030675 355.202884c0-35.687834 29.195059-64.882688 64.883302-64.882688l150.649125 0c-16.984474-9.525965-32.846438-20.56233-46.111027-32.932045-60.250624-56.144691-71.129907-137.062605-24.283034-180.767027 19.615539-18.264986 46.252237-27.124736 75.026739-27.124736 39.933133 0 83.972915 17.070797 118.995968 49.706086 20.353331 18.983322 37.722624 43.405619 50.145075 69.056819 12.457267-25.6512 29.791744-50.074419 50.180915-69.056819 35.022029-32.63529 79.062835-49.706086 118.994944-49.706086 28.74071 0 55.410176 8.860774 75.025715 27.124736 46.882611 43.704422 35.96759 124.622336-24.283034 180.767027-13.264589 12.368691-29.127578 23.40608-46.111027 32.932045l144.649234 0c35.688243 0 64.882278 29.195981 64.882278 64.882688l0 227.084948L571.780416 582.287833 571.780416 318.743508zM435.064218 147.625267c-21.476966-19.965747-49.094144-31.913882-73.868288-31.913882-7.404954 0-21.125018 1.211597-29.863322 9.386803-2.000691 1.824563-8.070144 7.439462-8.070144 21.369754 0 15.650406 8.492749 40.24873 32.319386 62.477926 29.124506 27.12576 77.202432 47.601152 111.76704 47.601152 12.176794 0 16.492237-2.666701 16.527053-2.702541C489.524736 242.54505 475.664486 185.453773 435.064218 147.625267zM577.78135 254.790963c0 0 0.034816-0.034816 0.069632-0.034816 0.807424 0 5.50871 1.790771 15.509914 1.790771 34.564608 0 82.64151-20.47529 111.76704-47.601152 23.826637-22.229299 32.283546-46.810112 32.283546-62.442189 0-13.930291-6.033613-19.562496-8.035328-21.404467-8.77312-8.17623-22.457344-9.386803-29.864346-9.386803-24.808038 0-52.390298 11.948134-73.867264 31.913882C585.325466 185.208218 571.358822 241.73865 577.78135 254.790963zM500.89513 939.156685 205.914017 939.156685c-35.688243 0-64.883302-29.195981-64.883302-64.883712L141.030714 653.17123l359.864462 0L500.895177 939.15666z'
    ]
    const colors = ['#c4332b', '#16B644', '#6862FD', '#FDC763']
    function getVirtulData(year) {
      year = year || '2017'
      let date = +echarts.number.parseDate(year + '-01-01')
      let end = +echarts.number.parseDate(+year + 1 + '-01-01')
      let dayTime = 3600 * 24 * 1000
      let data = []
      for (let time = date; time < end; time += dayTime) {
        let items = []
        let eventCount = Math.round(Math.random() * pathes.length)
        for (let i = 0; i < eventCount; i++) {
          items.push(Math.round(Math.random() * (pathes.length - 1)))
        }

        data.push([
          echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
          items.join('|')
        ])
      }
      return data
    }
    const option = {
      tooltip: {},
      calendar: [
        {
          left: 'center',
          top: 'middle',
          cellSize: [70, 70],
          yearLabel: { show: false },
          orient: 'vertical',
          dayLabel: {
            firstDay: 1,
            nameMap: 'cn'
          },
          monthLabel: {
            show: false
          },
          range: '2017-03'
        }
      ],
      series: [
        {
          type: 'custom',
          coordinateSystem: 'calendar',
          renderItem: function (params, api) {
            const cellPoint = api.coord(api.value(0))
            const cellWidth = params.coordSys.cellWidth
            const cellHeight = params.coordSys.cellHeight
            const value = api.value(1)
            const events = value && value.split('|')
            if (isNaN(cellPoint[0]) || isNaN(cellPoint[1])) {
              return
            }
            const group = {
              type: 'group',
              children:
                (layouts[events.length - 1] || []).map(function (
                  itemLayout,
                  index
                ) {
                  return {
                    type: 'path',
                    shape: {
                      pathData: pathes[+events[index]],
                      x: -8,
                      y: -8,
                      width: 16,
                      height: 16
                    },
                    position: [
                      cellPoint[0] +
                        echarts.number.linearMap(
                          itemLayout[0],
                          [-0.5, 0.5],
                          [-cellWidth / 2, cellWidth / 2]
                        ),
                      cellPoint[1] +
                        echarts.number.linearMap(
                          itemLayout[1],
                          [-0.5, 0.5],
                          [-cellHeight / 2 + 20, cellHeight / 2]
                        )
                    ],
                    style: {
                      fill: colors[+events[index]]
                    }
                  }
                }) || []
            }
            group.children.push({
              type: 'text',
              style: {
                x: cellPoint[0],
                y: cellPoint[1] - cellHeight / 2 + 15,

                //     echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
                text: echarts.time.format(api.value(0), '{dd}'),

                // text: echarts.format.formatTime('dd', api.value(0)),
                fill: '#777',
                textFont: api.font({ fontSize: 14 })
              }
            })
            return group
          },
          dimensions: [undefined, { type: 'ordinal' }],
          data: getVirtulData('2017')
        }
      ]
    }
    return option
  }

  static async get_echart_data_report8() {
    return {
      //   dimensions: ['product', 'amount', 'tax', 'total'],
      //   source
    }
  }

  static async get_echart_option(report) {
    const maps = {
      report: 'get_echart_option_report',
      report2: 'get_echart_option_report2',
      report3: 'get_echart_option_report3',
      report4: 'get_echart_option_report4',
      report5: 'get_echart_option_report5',
      report6: 'get_echart_option_report6',
      report7: 'get_echart_option_report7',
      report8: 'get_echart_option_report8'
    }
    return this[maps[report]]()
  }

  static async get_echart_data(report) {
    const maps = {
      report: 'get_echart_data_report',
      report2: 'get_echart_data_report2',
      report3: 'get_echart_data_report3',
      report4: 'get_echart_data_report4',
      report5: 'get_echart_data_report5',
      report6: 'get_echart_data_report6',
      report7: 'get_echart_data_report7',
      report8: 'get_echart_data_report8'
    }
    return this[maps[report]]()
  }
}

const AddonsModels = {
  'odoojs.echarts.calendar': ExtendModel
}

export default AddonsModels
