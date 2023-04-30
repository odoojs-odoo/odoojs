import { Model } from '@/odoorpc/models'

function randInt() {
  return Math.floor((Math.random() * 1000) / 23)
}

export class ExtendModel extends Model {
  constructor(...args) {
    super(...args)
  }

  static async get_echart_option_report() {
    function createNodes(count) {
      var nodes = []
      for (var i = 0; i < count; i++) {
        nodes.push({ id: i + '' })
      }
      return nodes
    }
    function createEdges(count) {
      var edges = []
      if (count === 2) {
        return [[0, 1]]
      }
      for (var i = 0; i < count; i++) {
        edges.push([i, (i + 1) % count])
      }
      return edges
    }
    var datas = []
    for (var i = 0; i < 16; i++) {
      datas.push({
        nodes: createNodes(i + 2),
        edges: createEdges(i + 2)
      })
    }
    const option = {
      series: datas.map(function (item, idx) {
        return {
          type: 'graph',
          layout: 'force',
          animation: false,
          data: item.nodes,
          left: (idx % 4) * 25 + '%',
          top: Math.floor(idx / 4) * 25 + '%',
          width: '25%',
          height: '25%',
          force: {
            // initLayout: 'circular'
            // gravity: 0
            repulsion: 60,
            edgeLength: 2
          },
          edges: item.edges.map(function (e) {
            return {
              source: e[0] + '',
              target: e[1] + ''
            }
          })
        }
      })
    }

    return option
  }

  static async get_echart_data_report() {
    return {
      //   dimensions: ['name', 'value'],
      //   source
    }
  }

  static async get_echart_option_cartesian() {
    const axisData = [
      'Mon',
      'Tue',
      'Wed',
      'Very Loooong Thu',
      'Fri',
      'Sat',
      'Sun'
    ]
    const data = axisData.map(function (item, i) {
      return Math.round(Math.random() * 1000 * (i + 1))
    })
    const links = data.map(function (item, i) {
      return {
        source: i,
        target: i + 1
      }
    })
    links.pop()
    const option = {
      title: {
        text: 'Graph on Cartesian'
      },
      tooltip: {},
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: axisData
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          type: 'graph',
          layout: 'none',
          coordinateSystem: 'cartesian2d',
          symbolSize: 40,
          label: {
            show: true
          },
          edgeSymbol: ['circle', 'arrow'],
          edgeSymbolSize: [4, 10],
          data: data,
          links: links,
          lineStyle: {
            color: '#2f4554'
          }
        }
      ]
    }

    return option
  }

  static async get_echart_data_cartesian() {
    return {
      //   dimensions: ['product', 'amount'],
      //   source
    }
  }

  static async get_echart_option_browser() {
    const option = {
      title: {
        text: 'Proportion of Browsers',
        subtext: 'Fake Data',
        top: 10,
        left: 10
      },
      tooltip: { trigger: 'item' },
      legend: {
        type: 'scroll',
        bottom: 10,
        data: (function () {
          var list = []
          for (var i = 1; i <= 28; i++) {
            list.push(i + 2000 + '')
          }
          return list
        })()
      },
      visualMap: {
        top: 'middle',
        right: 10,
        color: ['red', 'yellow'],
        calculable: true
      },
      radar: {
        indicator: [
          { text: 'IE8-', max: 400 },
          { text: 'IE9+', max: 400 },
          { text: 'Safari', max: 400 },
          { text: 'Firefox', max: 400 },
          { text: 'Chrome', max: 400 }
        ]
      },
      series: (function () {
        var series = []
        for (var i = 1; i <= 28; i++) {
          series.push({
            type: 'radar',
            symbol: 'none',
            lineStyle: {
              width: 1
            },
            emphasis: {
              areaStyle: {
                color: 'rgba(0,250,0,0.3)'
              }
            },
            data: [
              {
                value: [
                  (40 - i) * 10,
                  (38 - i) * 4 + 60,
                  i * 5 + 10,
                  i * 9,
                  (i * i) / 2
                ],
                name: i + 2000 + ''
              }
            ]
          })
        }
        return series
      })()
    }

    return option
  }

  static async get_echart_data_browser() {
    // const source = []

    return {
      // dimensions: ['name', 'value', 'itemStyle', 'label'],
      // source
    }
  }

  static async get_echart_option(report) {
    const maps = {
      report: 'get_echart_option_report',
      cartesian: 'get_echart_option_cartesian',
      browser: 'get_echart_option_browser'
    }
    return this[maps[report]]()
  }

  static async get_echart_data(report) {
    const maps = {
      report: 'get_echart_data_report',
      cartesian: 'get_echart_data_cartesian',
      browser: 'get_echart_data_browser'
    }
    return this[maps[report]]()
  }
}

const AddonsModels = {
  'odoojs.echarts.graph': ExtendModel
}

export default AddonsModels
