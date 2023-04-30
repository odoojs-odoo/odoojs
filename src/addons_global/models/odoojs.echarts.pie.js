import { Model } from '@/odoorpc/models'

function randInt() {
  return Math.floor((Math.random() * 1000) / 23)
}

export class ExtendModel extends Model {
  constructor(...args) {
    super(...args)
  }

  static async get_echart_option_report() {
    const option = {
      title: {
        text: 'Referer of a Website',
        subtext: 'Fake Data',
        left: 'center'
      },
      tooltip: { trigger: 'item' },
      legend: { orient: 'vertical', left: 'left' },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          // data: [
          //   { value: 1048, name: 'Search Engine' },
          //   { value: 735, name: 'Direct' },
          //   { value: 580, name: 'Email' },
          //   { value: 484, name: 'Union Ads' },
          //   { value: 300, name: 'Video Ads' }
          // ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    return option
    // {
    //   title: { text: 'Pie' },
    //   series: [{ type: 'pie' }]
    // }
  }

  static async get_echart_data_report() {
    const products = [
      'Search Engine',
      'Direct',
      'Email',
      'Union Ads',
      'Video Ads'
    ]

    const source = products.map(product => {
      const amount = randInt()
      return { name: product, value: amount }
    })

    return {
      dimensions: ['name', 'value'],
      source
    }
  }

  static async get_echart_option_doughnut() {
    const option = {
      tooltip: { trigger: 'item' },
      legend: { top: '5%', left: 'center' },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
          label: { show: false, position: 'center' },
          emphasis: { label: { show: true, fontSize: 40, fontWeight: 'bold' } },
          labelLine: { show: false }
        }
      ]
    }

    return option
  }

  static async get_echart_data_doughnut() {
    const products = [
      'Search Engine',
      'Direct',
      'Email',
      'Union Ads',
      'Video Ads'
    ]

    const source = products.map(product => {
      const amount = randInt()
      return { product, amount }
    })

    return {
      dimensions: ['product', 'amount'],
      source
    }
  }

  static async get_echart_option_half_doughnut() {
    const option = {
      tooltip: { trigger: 'item' },
      legend: {
        top: '5%',
        left: 'center',
        // doesn't perfectly work with our tricks, disable it
        selectedMode: false
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '70%'],
          // adjust the start angle
          startAngle: 180,
          label: {
            show: true,
            formatter(param) {
              // correct the percentage
              return param.name + ' (' + param.percent * 2 + '%)'
            }
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' },
            {
              // make an record to fill the bottom 50%
              value: 1048 + 735 + 580 + 484 + 300,
              itemStyle: {
                // stop the chart from rendering this piece
                color: 'none',
                decal: {
                  symbol: 'none'
                }
              },
              label: {
                show: false
              }
            }
          ]
        }
      ]
    }

    return option
  }

  static async get_echart_data_half_doughnut() {
    // const products = [
    //   'Search Engine',
    //   'Direct',
    //   'Email',
    //   'Union Ads',
    //   'Video Ads'
    // ]

    // const source = products.map(product => {
    //   const amount = randInt()
    //   return { product, amount }
    // })

    // return {
    //   dimensions: ['product', 'amount'],
    //   source
    // }

    const source = [
      { value: 1048, name: 'Search Engine' },
      { value: 735, name: 'Direct' },
      { value: 580, name: 'Email' },
      { value: 484, name: 'Union Ads' },
      { value: 300, name: 'Video Ads' },
      {
        // make an record to fill the bottom 50%
        value: 1048 + 735 + 580 + 484 + 300,
        itemStyle: {
          // stop the chart from rendering this piece
          color: 'none',
          decal: {
            symbol: 'none'
          }
        },
        label: {
          show: false
        }
      }
    ]

    return {
      // dimensions: ['name', 'value', 'itemStyle', 'label'],
      // source
    }
  }

  static async get_echart_option_rose() {
    const option = {
      legend: { top: 'bottom' },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      series: [
        {
          name: 'Nightingale Chart',
          type: 'pie',
          radius: [30, 120],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: { borderRadius: 8 }
          // data: [
          //   { value: 40, name: 'rose 1' },
          //   { value: 38, name: 'rose 2' },
          //   { value: 32, name: 'rose 3' },
          //   { value: 30, name: 'rose 4' },
          //   { value: 28, name: 'rose 5' },
          //   { value: 26, name: 'rose 6' },
          //   { value: 22, name: 'rose 7' },
          //   { value: 18, name: 'rose 8' }
          // ]
        }
      ]
    }

    return option
  }

  static async get_echart_data_rose() {
    const products = ['A', 'B', 'C', 'D', 'E']

    const source = products.map(product => {
      const amount = randInt()
      return { product, amount }
    })

    return {
      dimensions: ['product', 'amount'],
      source
    }
  }

  static async get_echart_option(report) {
    const maps = {
      report: 'get_echart_option_report',
      doughnut: 'get_echart_option_doughnut',
      half_doughnut: 'get_echart_option_half_doughnut',
      rose: 'get_echart_option_rose'
    }
    return this[maps[report]]()
  }

  static async get_echart_data(report) {
    const maps = {
      report: 'get_echart_data_report',
      doughnut: 'get_echart_data_doughnut',
      half_doughnut: 'get_echart_data_half_doughnut',
      rose: 'get_echart_data_rose'
    }
    return this[maps[report]]()
  }
}

const AddonsModels = {
  'odoojs.echarts.pie': ExtendModel
}

export default AddonsModels
