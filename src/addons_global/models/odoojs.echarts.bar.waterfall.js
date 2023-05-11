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
      const date_month = (function () {
        var list = []
        for (var i = 1; i <= 11; i++) {
          list.push('Oct/' + i)
        }
        return list
      })()

      // const data = [900, 345, 393, -108, -154, 135, 178, 286, -119, -361, -203]
      // const data = [900, 300, 400, -100, -200, 100, 200, 300, -100, -400, -200]

      const source = date_month.map((item, index) => {
        // const amount = data[index]
        const amount2 = index
          ? (Math.random() - 0.5) * 100
          : Math.random() * 200 + Math.random() * 100 + 100

        const amount = Number(amount2.toFixed(2))

        return { date_month: item, amount }
      })

      let sum = 0
      const source2 = source.reduce((acc, item, index) => {
        const amount = item.amount

        function get_help() {
          if (!index) {
            return 0
          } else {
            sum += source[index - 1]['amount']
            if (amount < 0) {
              return sum + amount
            } else {
              return sum
            }
          }
        }

        acc.push({
          date_month: item.date_month,
          help: get_help(),
          income: amount >= 0 ? amount : '-',
          expense: amount < 0 ? -amount : '-'
        })

        return acc
      }, [])

      const dataset = {
        // dimensions: ['date_month', 'amount'],
        dimensions: ['date_month', 'help', 'income', 'expense'],
        source: source2
      }

      const option = {
        dataset,
        title: { text: 'Waterfall' },
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
          formatter: function (params) {
            let tar
            if (params[1] && params[1].value.income !== '-') {
              tar = params[1]
            } else {
              tar = params[2]
            }
            return (
              tar &&
              tar.name +
                '<br/>' +
                tar.seriesName +
                ' : ' +
                (tar.value.income !== '-'
                  ? tar.value.income
                  : tar.value.expense)
            )
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },

        xAxis: { type: 'category', splitLine: { show: false } },
        yAxis: { type: 'value' },
        series: [
          {
            type: 'bar',
            stack: 'all',
            itemStyle: { borderColor: 'rgba(0,0,0,0)', color: 'rgba(0,0,0,0)' },
            emphasis: {
              itemStyle: {
                borderColor: 'rgba(0,0,0,0)',
                color: 'rgba(0,0,0,0)'
              }
            }
          },
          {
            type: 'bar',
            stack: 'all',
            label: { show: true, position: 'top' }
          },
          {
            type: 'bar',
            stack: 'all',
            label: { show: true, position: 'bottom' },
            itemStyle: { color: '#f33' }
          }
        ]
      }

      myChart.setOption(option)
    }
  }

  return ExtendModel
}

const AddonsModels = {
  'odoojs.echarts.bar.waterfall': ModelCreator
}

export default AddonsModels
