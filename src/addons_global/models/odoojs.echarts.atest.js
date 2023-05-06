import { Model } from '@/odoorpc/models'
import * as echarts from 'echarts/core'

import { HttpRequest } from 'odoojs'

const ROOT_PATH = 'echarts/examples'
async function call_echarts_request(url) {
  const api = HttpRequest
  api.baseURL = ROOT_PATH
  return api.call_get(url)
}

export class ExtendModel extends Model {
  constructor(...args) {
    super(...args)
  }

  static async echart_run_report(myChart) {
    const url = '/data/asset/geo/Sicily_prehellenic_topographic_map.svg'
    const _rawData = await call_echarts_request(url)

    // console.log(_rawData)

    run(_rawData)
    function run(svg) {
      echarts.registerMap('sicily', { svg: svg })
      const option = {
        tooltip: {
          formatter: function (params) {
            console.log(params)
            return [
              params.name + ':',
              'xxxxxxxxxxxxxxxx',
              'xxxxxxxxxxxxxxxx',
              'xxxxxxxxxxxxxxxx'
            ].join('<br>')
          }
        },
        geo: [
          {
            map: 'sicily',
            roam: true,
            layoutCenter: ['50%', '50%'],
            layoutSize: '100%',
            selectedMode: 'single',
            tooltip: {
              show: true,
              confine: true,
              formatter: function (params) {
                return [
                  'This is the introduction:',
                  'xxxxxxxxxxxxxxxxxxxxx',
                  'xxxxxxxxxxxxxxxxxxxxx',
                  'xxxxxxxxxxxxxxxxxxxxx',
                  'xxxxxxxxxxxxxxxxxxxxx',
                  'xxxxxxxxxxxxxxxxxxxxx',
                  'xxxxxxxxxxxxxxxxxxxxx',
                  'xxxxxxxxxxxxxxxxxxxxx',
                  'xxxxxxxxxxxxxxxxxxxxx',
                  'xxxxxxxxxxxxxxxxxxxxx',
                  'xxxxxxxxxxxxxxxxxxxxx'
                ].join('<br>')
              }
            },
            itemStyle: {
              color: undefined
            },
            emphasis: {
              label: {
                show: false
              }
            },
            select: {
              itemStyle: {
                color: '#b50205'
              },
              label: {
                show: false
              }
            },
            regions: [
              {
                name: 'route1',
                itemStyle: {
                  borderWidth: 0
                },
                select: {
                  itemStyle: {
                    color: '#b5280d',
                    borderWidth: 0
                  }
                },
                tooltip: {
                  position: 'right',
                  alwaysShowContent: true,
                  enterable: true,
                  extraCssText: 'user-select: text',
                  formatter: [
                    'Route 1:',
                    'xxxxxxxxxxxxxxxxxxxxxxxxxxx',
                    'xxxxxxxxxxxxxxxxxxxxxxxxxxx',
                    'xxxxxxxxxxxxxxxxxxxxxxxxxxx',
                    'xxxxxxxxxxxxxxxxxxxxxxxxxxx',
                    'xxxxxxxxxxxxxxxxxxxxxxxxxxx'
                  ].join('<br>')
                }
              },
              {
                name: 'route2',
                itemStyle: {
                  borderWidth: 0
                },
                select: {
                  itemStyle: {
                    color: '#b5280d',
                    borderWidth: 0
                  }
                },
                tooltip: {
                  position: 'left',
                  alwaysShowContent: true,
                  enterable: true,
                  extraCssText: 'user-select: text',
                  formatter: [
                    'Route 2:',
                    'xxxxxxxxxxxxxx',
                    'xxxxxxxxxxxxxx',
                    'xxxxxxxxxxxxxx',
                    'xxxxxxxxxxxxxx',
                    'xxxxxxxxxxxxxx',
                    'xxxxxxxxxxxxxx',
                    'xxxxxxxxxxxxxx',
                    'xxxxxxxxxxxxxx'
                  ].join('<br>')
                }
              }
            ]
          }
        ],
        // -------------
        // Make buttons
        grid: {
          top: 10,
          left: 'center',
          width: 80,
          height: 20
        },
        xAxis: {
          axisLine: { show: false },
          splitLine: { show: false },
          axisLabel: { show: false },
          axisTick: { show: false }
        },
        yAxis: {
          axisLine: { show: false },
          splitLine: { show: false },
          axisLabel: { show: false },
          axisTick: { show: false }
        },
        series: {
          type: 'scatter',
          itemStyle: {},
          label: {
            show: true,
            borderColor: '#999',
            borderWidth: 1,
            borderRadius: 2,
            backgroundColor: '#fff',
            padding: [3, 5],
            fontSize: 18,
            opacity: 1,
            color: '#333'
          },
          encode: {
            label: 2
          },
          symbolSize: 0,
          tooltip: { show: false },
          selectedMode: 'single',
          select: {
            label: {
              color: '#fff',
              borderColor: '#555',
              backgroundColor: '#555'
            }
          },
          data: [
            [0, 0, 'route1'],
            [1, 0, 'route2']
          ]
        }
        // Make buttons end
        // -----------------
      }
      myChart.setOption(option)
      myChart.on('selectchanged', function (params) {
        if (!params.selected.length) {
          myChart.dispatchAction({
            type: 'hideTip'
          })
          myChart.dispatchAction({
            type: 'geoSelect',
            geoIndex: 0
            // Use no name to unselect.
          })
        } else {
          var btnDataIdx = params.selected[0].dataIndex[0]
          var name = option.series.data[btnDataIdx][2]
          myChart.dispatchAction({
            type: 'geoSelect',
            geoIndex: 0,
            name: name
          })
          myChart.dispatchAction({
            type: 'showTip',
            geoIndex: 0,
            name: name
          })
        }
      })
    }
  }

  static async echart_run(report, chartInstance) {
    const maps = {
      report: 'echart_run_report'
    }
    return this[maps[report]](chartInstance)
  }

  static async get_echart_option(report) {
    const maps = {}
    if (report in maps) {
      return this[maps[report]]()
    } else {
      return { odoojs_echarts_type: { name: 'run_server' } }
    }
  }

  static async get_echart_data(report) {
    const maps = {}
    if (report in maps) {
      return this[maps[report]]()
    } else {
      return {}
    }
  }
}

const AddonsModels = {
  'odoojs.echarts.test': ExtendModel
}

export default AddonsModels
