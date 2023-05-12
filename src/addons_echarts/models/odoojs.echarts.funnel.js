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
      const option = {
        title: { text: 'Funnel' },
        tooltip: { trigger: 'item', formatter: '{a} <br/>{b} : {c}%' },
        toolbox: {
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        legend: { data: ['Show', 'Click', 'Visit', 'Inquiry', 'Order'] },
        series: [
          {
            name: 'Funnel',
            type: 'funnel',
            left: '10%',
            top: 60,
            bottom: 60,
            width: '80%',
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: { show: true, position: 'inside' },
            labelLine: { length: 10, lineStyle: { width: 1, type: 'solid' } },
            itemStyle: { borderColor: '#fff', borderWidth: 1 },
            emphasis: { label: { fontSize: 20 } },
            data: [
              { value: 60, name: 'Visit' },
              { value: 40, name: 'Inquiry' },
              { value: 20, name: 'Order' },
              { value: 80, name: 'Click' },
              { value: 100, name: 'Show' }
            ]
          }
        ]
      }

      myChart.setOption(option)
    }

    static async echart_run_compare(myChart) {
      const option = {
        title: {
          text: 'Funnel Compare',
          subtext: 'Fake Data',
          left: 'left',
          top: 'bottom'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}%'
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          top: 'center',
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['Prod A', 'Prod B', 'Prod C', 'Prod D', 'Prod E']
        },
        series: [
          {
            name: 'Funnel',
            type: 'funnel',
            width: '40%',
            height: '45%',
            left: '5%',
            top: '50%',
            funnelAlign: 'right',
            data: [
              { value: 60, name: 'Prod C' },
              { value: 30, name: 'Prod D' },
              { value: 10, name: 'Prod E' },
              { value: 80, name: 'Prod B' },
              { value: 100, name: 'Prod A' }
            ]
          },
          {
            name: 'Pyramid',
            type: 'funnel',
            width: '40%',
            height: '45%',
            left: '5%',
            top: '5%',
            sort: 'ascending',
            funnelAlign: 'right',
            data: [
              { value: 60, name: 'Prod C' },
              { value: 30, name: 'Prod D' },
              { value: 10, name: 'Prod E' },
              { value: 80, name: 'Prod B' },
              { value: 100, name: 'Prod A' }
            ]
          },
          {
            name: 'Funnel',
            type: 'funnel',
            width: '40%',
            height: '45%',
            left: '55%',
            top: '5%',
            funnelAlign: 'left',
            data: [
              { value: 60, name: 'Prod C' },
              { value: 30, name: 'Prod D' },
              { value: 10, name: 'Prod E' },
              { value: 80, name: 'Prod B' },
              { value: 100, name: 'Prod A' }
            ]
          },
          {
            name: 'Pyramid',
            type: 'funnel',
            width: '40%',
            height: '45%',
            left: '55%',
            top: '50%',
            sort: 'ascending',
            funnelAlign: 'left',
            data: [
              { value: 60, name: 'Prod C' },
              { value: 30, name: 'Prod D' },
              { value: 10, name: 'Prod E' },
              { value: 80, name: 'Prod B' },
              { value: 100, name: 'Prod A' }
            ]
          }
        ]
      }
      myChart.setOption(option)
    }

    static async echart_run_rpt1(myChart) {
      const option = {
        title: {
          text: 'Funnel',
          left: 'left',
          top: 'bottom'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}%'
        },
        toolbox: {
          orient: 'vertical',
          top: 'center',
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['Show', 'Click', 'Visit', 'Inquiry', 'Order']
        },
        series: [
          {
            name: 'Funnel',
            type: 'funnel',
            width: '40%',
            height: '45%',
            left: '5%',
            top: '50%',
            data: [
              { value: 60, name: 'Visit' },
              { value: 30, name: 'Inquiry' },
              { value: 10, name: 'Order' },
              { value: 80, name: 'Click' },
              { value: 100, name: 'Show' }
            ]
          },
          {
            name: 'Pyramid',
            type: 'funnel',
            width: '40%',
            height: '45%',
            left: '5%',
            top: '5%',
            sort: 'ascending',
            data: [
              { value: 60, name: 'Visit' },
              { value: 30, name: 'Inquiry' },
              { value: 10, name: 'Order' },
              { value: 80, name: 'Click' },
              { value: 100, name: 'Show' }
            ]
          },
          {
            name: 'Funnel',
            type: 'funnel',
            width: '40%',
            height: '45%',
            left: '55%',
            top: '5%',
            label: { position: 'left' },
            data: [
              { value: 60, name: 'Visit' },
              { value: 30, name: 'Inquiry' },
              { value: 10, name: 'Order' },
              { value: 80, name: 'Click' },
              { value: 100, name: 'Show' }
            ]
          },
          {
            name: 'Pyramid',
            type: 'funnel',
            width: '40%',
            height: '45%',
            left: '55%',
            top: '50%',
            sort: 'ascending',
            label: { position: 'left' },
            data: [
              { value: 60, name: 'Visit' },
              { value: 30, name: 'Inquiry' },
              { value: 10, name: 'Order' },
              { value: 80, name: 'Click' },
              { value: 100, name: 'Show' }
            ]
          }
        ]
      }
      myChart.setOption(option)
    }
  }
  return ExtendModel
}

const AddonsModels = {
  'odoojs.echarts.funnel': ModelCreator
}

export default AddonsModels
