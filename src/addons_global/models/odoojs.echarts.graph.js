import { EchartsBaseModelCreator } from './odoojs.echarts.base'

function randInt() {
  return Math.floor((Math.random() * 1000) / 23)
}

function ModelCreator(Model, { HttpRequest }) {
  const EchartsBaseModel = EchartsBaseModelCreator(Model, { HttpRequest })

  class ExtendModel extends EchartsBaseModel {
    constructor(...args) {
      super(...args)
    }

    static async echart_run_report(myChart) {
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

      myChart.setOption(option)
    }

    static async echart_run_cartesian(myChart) {
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

      myChart.setOption(option)
    }
  }

  return ExtendModel
}

const AddonsModels = {
  'odoojs.echarts.graph': ModelCreator
}

export default AddonsModels
