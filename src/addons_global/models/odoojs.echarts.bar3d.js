import { EchartsBaseModel, call_echarts_request } from './odoojs.echarts.base'

function randInt() {
  return Math.floor((Math.random() * 1000) / 23)
}

export class ExtendModel extends EchartsBaseModel {
  constructor(...args) {
    super(...args)
  }

  static async echart_run_report(myChart) {
    const url = '/data/asset/data/life-expectancy-table.json'
    const data = await call_echarts_request(url)
    const option = {
      grid3D: {},
      tooltip: {},
      xAxis3D: {
        type: 'category'
      },
      yAxis3D: {
        type: 'category'
      },
      zAxis3D: {},
      visualMap: {
        max: 1e8,
        dimension: 'Population'
      },
      dataset: {
        dimensions: [
          'Income',
          'Life Expectancy',
          'Population',
          'Country',
          { name: 'Year', type: 'ordinal' }
        ],
        source: data
      },
      series: [
        {
          type: 'bar3D',
          // symbolSize: symbolSize,
          shading: 'lambert',
          encode: {
            x: 'Year',
            y: 'Country',
            z: 'Life Expectancy',
            tooltip: [0, 1, 2, 3, 4]
          }
        }
      ]
    }
    myChart.setOption(option)
  }
}

const AddonsModels = {
  'odoojs.echarts.bar3d': ExtendModel
}

export default AddonsModels
