// import { EchartsBaseModel, call_echarts_request } from './odoojs.echarts.base'

import { EchartsBaseModelCreator } from './odoojs.echarts.base'

function ModelCreator(Model, { HttpRequest }) {
  const EchartsBaseModel = EchartsBaseModelCreator(Model, { HttpRequest })

  class ExtendModel extends EchartsBaseModel {
    constructor(...args) {
      super(...args)
    }

    static async echart_run_report(myChart) {
      const url = '/data/asset/data/life-expectancy-table.json'
      const _rawData = await this.call_echarts_request(url)

      // var countries = ['Australia', 'Canada', 'China', 'Cuba', 'Finland', 'France', 'Germany', 'Iceland', 'India', 'Japan', 'North Korea', 'South Korea', 'New Zealand', 'Norway', 'Poland', 'Russia', 'Turkey', 'United Kingdom', 'United States'];

      const countries = [
        'Finland',
        'France',
        'Germany',
        'Iceland',
        'Norway',
        'Poland',
        'Russia',
        'United Kingdom'
      ]

      const delay = 10000

      const seriesList = countries.map(country => {
        return {
          type: 'line',
          showSymbol: false,
          name: country,
          endLabel: {
            show: true,
            formatter: function (params) {
              return params.seriesName + ': ' + params.data[params.seriesName]
            }
          },
          labelLayout: { moveOverlap: 'shiftY' },
          emphasis: { focus: 'series' }
          // encode: {
          //   // x: 'Year',
          //   // y: 'Income',
          //   // label: ['Country', 'Income'],
          //   // itemName: 'Year',
          //   // tooltip: ['Income']
          // }
        }
      })

      const option_raw = {
        odoojs_echarts_type: { name: 'line_race', delay },

        animationDuration: delay,
        dataset: { dimensions: [], source: [] },
        title: { text: 'Income of Germany and France since 1950' },
        tooltip: { order: 'valueDesc', trigger: 'axis' },
        xAxis: { type: 'category', nameLocation: 'middle' },
        yAxis: { type: 'value', name: 'Income' },
        grid: { right: 140 },
        series: seriesList
      }

      const source = _rawData
        .slice(1)
        .filter(item => countries.includes(item[3]))
        .reduce((acc, item) => {
          const old = acc.find(it => it.date_year === item[4])
          if (old) {
            old[item[3]] = item[0]
          } else {
            acc.push({ date_year: item[4], [item[3]]: item[0] })
          }

          return acc
        }, [])

      const dataset_raw = {
        dimensions: ['date_year', ...countries],
        source
      }

      const options2 = { ...option_raw, dataset: dataset_raw }

      myChart.setOption(options2)
    }
  }

  return ExtendModel
}

const AddonsModels = {
  'odoojs.echarts.line.race': ModelCreator
}

export default AddonsModels
