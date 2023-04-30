import { Model } from '@/odoorpc/models'

function randInt() {
  return Math.floor((Math.random() * 1000) / 23)
}

export class ExtendModel extends Model {
  constructor(...args) {
    super(...args)
  }

  static async get_echart_option_report() {
    // '北京',
    //   '天津',
    //   '上海',
    //   '广州',
    //   '沈阳',
    //   '西安',
    //   '武汉',
    //   '南京'

    const countryColors = {
      北京: '#00008b',
      天津: '#f00',
      上海: '#ffde00',
      广州: '#002a8f',
      沈阳: '#003580',
      西安: '#ed2939',
      武汉: '#000',
      南京: '#003897'
      // India: '#f93',
      // Japan: '#bc002d',
      // 'North Korea': '#024fa2',
      // 'South Korea': '#000',
      // 'New Zealand': '#00247d',
      // Norway: '#ef2b2d',
      // Poland: '#dc143c',
      // Russia: '#d52b1e',
      // Turkey: '#e30a17',
      // 'United Kingdom': '#00247d',
      // 'United States': '#b22234'
    }

    const delay = 1000
    return {
      odoojs_echarts_type: {
        name: 'bar_race',
        delay
      },

      toolbox: { feature: { saveAsImage: {} } },

      xAxis: {
        max: 'dataMax'
      },
      yAxis: {
        type: 'category',
        inverse: true,
        animationDuration: delay,
        animationDurationUpdate: delay,
        max: 8 // only the largest 3 bars will be displayed
      },
      series: [
        {
          realtimeSort: true,
          name: 'Year',
          type: 'bar',
          itemStyle: {
            color: function (param) {
              return countryColors[param.value.product] || '#5470c6'
            }
          },
          label: {
            show: true,
            position: 'right',
            valueAnimation: true
          }
        }
      ],
      legend: {
        show: true
      },
      animationDuration: delay,
      animationDurationUpdate: delay,
      animationEasing: 'linear',
      animationEasingUpdate: 'linear'
    }
  }

  static async get_echart_data_report() {
    const products = [
      '北京',
      '天津',
      '上海',
      '广州',
      '沈阳',
      '西安',
      '武汉',
      '南京'
    ]
    const date_years = Array.from(
      Array(100),
      (_val, index) => `${index.toString().padStart(4, '0')}天`
    )

    const source = products.reduce((acc, product) => {
      const one_prd = date_years.reduce((year_acc, date_year) => {
        year_acc.push({ product, date_year, amount: randInt() })
        return year_acc
      }, [])

      acc = [...acc, ...one_prd]

      return acc
    }, [])

    return {
      dimensions: ['product', 'amount', 'date_year'],
      source
    }
  }

  static async get_echart_option(report) {
    const maps = {
      report: 'get_echart_option_report'
    }
    return this[maps[report]]()
  }

  static async get_echart_data(report) {
    const maps = {
      report: 'get_echart_data_report'
    }
    return this[maps[report]]()
  }
}

const AddonsModels = {
  'odoojs.echarts.bar.race': ExtendModel
}

export default AddonsModels
