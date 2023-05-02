import { EchartsBaseModel, call_echarts_request } from './odoojs.echarts.base'

function randInt() {
  return Math.floor((Math.random() * 1000) / 23)
}

export class ExtendModel extends EchartsBaseModel {
  constructor(...args) {
    super(...args)
  }

  static async echart_run_report(myChart) {
    const option = {
      tooltip: { formatter: '{a} <br/>{b} : {c}%' },
      series: [
        {
          name: 'Pressure',
          type: 'gauge',
          detail: { formatter: '{value}' },
          data: [{ value: 50, name: 'SCORE' }]
        }
      ]
    }

    myChart.setOption(option)
  }

  static async echart_run_progress(myChart) {
    const option = {
      tooltip: { formatter: '{a} <br/>{b} : {c}%' },
      series: [
        {
          name: 'Pressure',
          type: 'gauge',
          progress: { show: true },
          detail: { valueAnimation: true, formatter: '{value}' },
          data: [{ value: 50, name: 'SCORE' }]
        }
      ]
    }
    myChart.setOption(option)
  }

  static async echart_run_progress1(myChart) {
    const option = {
      series: [
        {
          type: 'gauge',
          progress: { show: true, width: 18 },
          axisLine: { lineStyle: { width: 18 } },
          axisTick: { show: false },
          splitLine: { length: 15, lineStyle: { width: 2, color: '#999' } },
          axisLabel: { distance: 25, color: '#999', fontSize: 20 },
          anchor: {
            show: true,
            showAbove: true,
            size: 25,
            itemStyle: { borderWidth: 10 }
          },
          title: { show: false },
          detail: {
            valueAnimation: true,
            fontSize: 80,
            offsetCenter: [0, '70%']
          },
          data: [{ value: 70 }]
        }
      ]
    }

    myChart.setOption(option)
  }

  static async echart_run_speed(myChart) {
    const option = {
      series: [
        {
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          min: 0,
          max: 240,
          splitNumber: 12,
          itemStyle: {
            color: '#58D9F9',
            shadowColor: 'rgba(0,138,255,0.45)',
            shadowBlur: 10,
            shadowOffsetX: 2,
            shadowOffsetY: 2
          },
          progress: { show: true, roundCap: true, width: 18 },
          pointer: {
            icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
            length: '75%',
            width: 16,
            offsetCenter: [0, '5%']
          },
          axisLine: { roundCap: true, lineStyle: { width: 18 } },
          axisTick: { splitNumber: 2, lineStyle: { width: 2, color: '#999' } },
          splitLine: { length: 12, lineStyle: { width: 3, color: '#999' } },
          axisLabel: { distance: 30, color: '#999', fontSize: 10 },
          title: { show: false },
          detail: {
            backgroundColor: '#fff',
            borderColor: '#999',
            borderWidth: 2,
            width: '60%',
            lineHeight: 20,
            height: 20,
            borderRadius: 8,
            offsetCenter: [0, '35%'],
            valueAnimation: true,
            formatter: function (value) {
              return '{value|' + value.toFixed(0) + '}{unit|km/h}'
            },
            rich: {
              value: { fontSize: 30, fontWeight: 'bolder', color: '#777' },
              unit: { fontSize: 10, color: '#999', padding: [0, 0, -20, 10] }
            }
          },
          data: [{ value: 100 }]
        }
      ]
    }
    myChart.setOption(option)
  }

  static async echart_run_speed_stage(myChart) {
    const option = {
      series: [
        {
          type: 'gauge',
          axisLine: {
            lineStyle: {
              width: 30,
              color: [
                [0.3, '#67e0e3'],
                [0.7, '#37a2da'],
                [1, '#fd666d']
              ]
            }
          },
          pointer: { itemStyle: { color: 'inherit' } },
          axisTick: {
            distance: -30,
            length: 8,
            lineStyle: { color: '#fff', width: 2 }
          },
          splitLine: {
            distance: -30,
            length: 30,
            lineStyle: { color: '#fff', width: 4 }
          },
          axisLabel: { color: 'inherit', distance: 40, fontSize: 20 },
          detail: {
            valueAnimation: true,
            formatter: '{value} km/h',
            color: 'inherit'
          },
          data: [{ value: 70 }]
        }
      ]
    }
    myChart.setOption(option)

    setInterval(function () {
      myChart.setOption({
        series: [
          {
            data: [
              {
                value: +(Math.random() * 100).toFixed(2)
              }
            ]
          }
        ]
      })
    }, 2000)
  }

  static async echart_run_grade(myChart) {
    const option = {
      series: [
        {
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          center: ['50%', '75%'],
          radius: '90%',
          min: 0,
          max: 1,
          splitNumber: 8,
          axisLine: {
            lineStyle: {
              width: 6,
              color: [
                [0.25, '#FF6E76'],
                [0.5, '#FDDD60'],
                [0.75, '#58D9F9'],
                [1, '#7CFFB2']
              ]
            }
          },
          pointer: {
            icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
            length: '12%',
            width: 20,
            offsetCenter: [0, '-60%'],
            itemStyle: { color: 'inherit' }
          },
          axisTick: {
            length: 12,
            lineStyle: { color: 'inherit', width: 2 }
          },
          splitLine: {
            length: 20,
            lineStyle: { color: 'inherit', width: 5 }
          },
          axisLabel: {
            color: '#464646',
            fontSize: 20,
            distance: -60,
            rotate: 'tangential',
            formatter: function (value) {
              if (value === 0.875) {
                return 'Grade A'
              } else if (value === 0.625) {
                return 'Grade B'
              } else if (value === 0.375) {
                return 'Grade C'
              } else if (value === 0.125) {
                return 'Grade D'
              }
              return ''
            }
          },
          title: { offsetCenter: [0, '-10%'], fontSize: 20 },
          detail: {
            fontSize: 30,
            offsetCenter: [0, '-35%'],
            valueAnimation: true,
            formatter: function (value) {
              return Math.round(value * 100) + ''
            },
            color: 'inherit'
          },
          data: [{ value: 0.7, name: 'Grade Rating' }]
        }
      ]
    }
    myChart.setOption(option)
  }

  static async echart_run_muiti_title(myChart) {
    const gaugeData = [
      {
        value: 20,
        name: 'Good',
        title: { offsetCenter: ['-40%', '80%'] },
        detail: { offsetCenter: ['-40%', '95%'] }
      },
      {
        value: 40,
        name: 'Better',
        title: { offsetCenter: ['0%', '80%'] },
        detail: { offsetCenter: ['0%', '95%'] }
      },
      {
        value: 60,
        name: 'Perfect',
        title: { offsetCenter: ['40%', '80%'] },
        detail: { offsetCenter: ['40%', '95%'] }
      }
    ]
    const option = {
      series: [
        {
          type: 'gauge',
          anchor: {
            show: true,
            showAbove: true,
            size: 18,
            itemStyle: { color: '#FAC858' }
          },
          pointer: {
            icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
            width: 8,
            length: '80%',
            offsetCenter: [0, '8%']
          },
          progress: { show: true, overlap: true, roundCap: true },
          axisLine: { roundCap: true },
          data: gaugeData,
          title: { fontSize: 14 },
          detail: {
            width: 40,
            height: 14,
            fontSize: 14,
            color: '#fff',
            backgroundColor: 'inherit',
            borderRadius: 3,
            formatter: '{value}%'
          }
        }
      ]
    }
    myChart.setOption(option)

    setInterval(function () {
      gaugeData[0].value = +(Math.random() * 100).toFixed(2)
      gaugeData[1].value = +(Math.random() * 100).toFixed(2)
      gaugeData[2].value = +(Math.random() * 100).toFixed(2)
      myChart.setOption({
        series: [
          {
            data: gaugeData
          }
        ]
      })
    }, 2000)
  }

  static async echart_run_ring(myChart) {
    const gaugeData = [
      {
        value: 20,
        name: 'Perfect',
        title: { offsetCenter: ['0%', '-30%'] },
        detail: { valueAnimation: true, offsetCenter: ['0%', '-20%'] }
      },
      {
        value: 40,
        name: 'Good',
        title: { offsetCenter: ['0%', '0%'] },
        detail: { valueAnimation: true, offsetCenter: ['0%', '10%'] }
      },
      {
        value: 60,
        name: 'Commonly',
        title: { offsetCenter: ['0%', '30%'] },
        detail: { valueAnimation: true, offsetCenter: ['0%', '40%'] }
      }
    ]
    const option = {
      series: [
        {
          type: 'gauge',
          startAngle: 90,
          endAngle: -270,
          pointer: { show: false },
          progress: {
            show: true,
            overlap: false,
            roundCap: true,
            clip: false,
            itemStyle: { borderWidth: 1, borderColor: '#464646' }
          },
          axisLine: { lineStyle: { width: 40 } },
          splitLine: { show: false, distance: 0, length: 10 },
          axisTick: { show: false },
          axisLabel: { show: false, distance: 50 },
          data: gaugeData,
          title: { fontSize: 14 },
          detail: {
            width: 50,
            height: 14,
            fontSize: 14,
            color: 'inherit',
            borderColor: 'inherit',
            borderRadius: 20,
            borderWidth: 1,
            formatter: '{value}%'
          }
        }
      ]
    }

    myChart.setOption(option)

    setInterval(function () {
      gaugeData[0].value = +(Math.random() * 100).toFixed(2)
      gaugeData[1].value = +(Math.random() * 100).toFixed(2)
      gaugeData[2].value = +(Math.random() * 100).toFixed(2)
      myChart.setOption({
        series: [
          {
            data: gaugeData,
            pointer: {
              show: false
            }
          }
        ]
      })
    }, 2000)
  }
}

const AddonsModels = {
  'odoojs.echarts.gauge': ExtendModel
}

export default AddonsModels
