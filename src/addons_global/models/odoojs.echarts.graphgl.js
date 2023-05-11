import { EchartsBaseModelCreator } from './odoojs.echarts.base'

function ModelCreator(Model, { HttpRequest }) {
  const EchartsBaseModel = EchartsBaseModelCreator(Model, { HttpRequest })

  class ExtendModel extends EchartsBaseModel {
    constructor(...args) {
      super(...args)
    }

    static async echart_run_report(myChart) {
      function createNodes(widthCount, heightCount) {
        var nodes = []
        for (var i = 0; i < widthCount; i++) {
          for (var j = 0; j < heightCount; j++) {
            nodes.push({
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              value: 1
            })
          }
        }
        return nodes
      }
      function createEdges(widthCount, heightCount) {
        var edges = []
        for (var i = 0; i < widthCount; i++) {
          for (var j = 0; j < heightCount; j++) {
            if (i < widthCount - 1) {
              edges.push({
                source: i + j * widthCount,
                target: i + 1 + j * widthCount,
                value: 1
              })
            }
            if (j < heightCount - 1) {
              edges.push({
                source: i + j * widthCount,
                target: i + (j + 1) * widthCount,
                value: 1
              })
            }
          }
        }
        return edges
      }
      var nodes = createNodes(50, 50)
      var edges = createEdges(50, 50)
      const option = {
        series: [
          {
            type: 'graphGL',
            nodes: nodes,
            edges: edges,
            itemStyle: {
              color: 'rgba(255,255,255,0.8)'
            },
            lineStyle: {
              color: 'rgba(255,255,255,0.8)',
              width: 3
            },
            forceAtlas2: {
              steps: 5,
              jitterTolerence: 10,
              edgeWeightInfluence: 4
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
  'odoojs.echarts.graphgl': ModelCreator
}

export default AddonsModels
