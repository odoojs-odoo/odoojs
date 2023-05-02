import { EchartsBaseModel, call_echarts_request } from './odoojs.echarts.base'
import * as echarts from 'echarts/core'

export class ExtendModel extends EchartsBaseModel {
  constructor(...args) {
    super(...args)
  }

  static async echart_run_report(myChart) {
    const url = '/data/asset/data/flare.json'
    const data = await call_echarts_request(url)

    run(data)

    function run(data) {
      const treemapOption = {
        series: [
          {
            type: 'treemap',
            id: 'echarts-package-size',
            animationDurationUpdate: 1000,
            roam: false,
            nodeClick: undefined,
            data: data.children,
            universalTransition: true,
            label: { show: true },
            breadcrumb: { show: false }
          }
        ]
      }
      const sunburstOption = {
        series: [
          {
            type: 'sunburst',
            id: 'echarts-package-size',
            radius: ['20%', '90%'],
            animationDurationUpdate: 1000,
            nodeClick: undefined,
            data: data.children,
            universalTransition: true,
            itemStyle: { borderWidth: 1, borderColor: 'rgba(255,255,255,.5)' },
            label: { show: false }
          }
        ]
      }
      let currentOption = treemapOption
      myChart.setOption(currentOption)
      setInterval(function () {
        currentOption =
          currentOption === treemapOption ? sunburstOption : treemapOption
        myChart.setOption(currentOption)
      }, 3000)
    }
  }

  static async echart_run_report2(myChart) {
    const url = '/data/asset/data/disk.tree.json'
    const diskData = await call_echarts_request(url)

    const formatUtil = echarts.format
    function getLevelOption() {
      return [
        { itemStyle: { borderWidth: 0, gapWidth: 5 } },
        { itemStyle: { gapWidth: 1 } },
        {
          colorSaturation: [0.35, 0.5],
          itemStyle: { gapWidth: 1, borderColorSaturation: 0.6 }
        }
      ]
    }

    const option = {
      title: { text: 'Disk Usage', left: 'center' },
      tooltip: {
        formatter: function (info) {
          var value = info.value
          var treePathInfo = info.treePathInfo
          var treePath = []
          for (var i = 1; i < treePathInfo.length; i++) {
            treePath.push(treePathInfo[i].name)
          }
          return [
            '<div class="tooltip-title">' +
              formatUtil.encodeHTML(treePath.join('/')) +
              '</div>',
            'Disk Usage: ' + formatUtil.addCommas(value) + ' KB'
          ].join('')
        }
      },
      series: [
        {
          name: 'Disk Usage',
          type: 'treemap',
          visibleMin: 300,
          label: { show: true, formatter: '{b}' },
          itemStyle: { borderColor: '#fff' },
          levels: getLevelOption(),
          data: diskData
        }
      ]
    }

    myChart.setOption(option)
  }

  static async echart_run_report3(myChart) {
    const url = '/data/asset/data/disk.tree.json'
    const diskData = await call_echarts_request(url)
    function getLevelOption() {
      return [
        {
          itemStyle: { borderColor: '#777', borderWidth: 0, gapWidth: 1 },
          upperLabel: { show: false }
        },
        {
          itemStyle: { borderColor: '#555', borderWidth: 5, gapWidth: 1 },
          emphasis: { itemStyle: { borderColor: '#ddd' } }
        },
        {
          colorSaturation: [0.35, 0.5],
          itemStyle: { borderWidth: 5, gapWidth: 1, borderColorSaturation: 0.6 }
        }
      ]
    }

    const option = {
      title: { text: 'Disk Usage', left: 'center' },
      tooltip: {
        formatter: function (info) {
          var value = info.value
          var treePathInfo = info.treePathInfo
          var treePath = []
          for (var i = 1; i < treePathInfo.length; i++) {
            treePath.push(treePathInfo[i].name)
          }
          return [
            '<div class="tooltip-title">' +
              echarts.format.encodeHTML(treePath.join('/')) +
              '</div>',
            'Disk Usage: ' + echarts.format.addCommas(value) + ' KB'
          ].join('')
        }
      },
      series: [
        {
          name: 'Disk Usage',
          type: 'treemap',
          visibleMin: 300,
          label: { show: true, formatter: '{b}' },
          upperLabel: { show: true, height: 30 },
          itemStyle: { borderColor: '#fff' },
          levels: getLevelOption(),
          data: diskData
        }
      ]
    }
    myChart.setOption(option)
  }

  static async echart_run_report4(myChart) {
    const url = '/data/asset/data/flare.json'
    const data = await call_echarts_request(url)
    data.children.forEach(function (datum, index) {
      index % 2 === 0 && (datum.collapsed = true)
    })
    const option = {
      tooltip: { trigger: 'item', triggerOn: 'mousemove' },
      series: [
        {
          type: 'tree',
          data: [data],
          top: '1%',
          left: '15%',
          bottom: '1%',
          right: '7%',
          symbolSize: 7,
          orient: 'RL',
          label: { position: 'right', verticalAlign: 'middle', align: 'left' },
          leaves: {
            label: { position: 'left', verticalAlign: 'middle', align: 'right' }
          },
          emphasis: { focus: 'descendant' },
          expandAndCollapse: true,
          animationDuration: 550,
          animationDurationUpdate: 750
        }
      ]
    }
    myChart.setOption(option)
  }

  static async echart_run_report5(myChart) {
    const data = {
      name: 'flare',
      children: [
        {
          name: 'data',
          children: [
            {
              name: 'converters',
              children: [
                { name: 'Converters', value: 721 },
                { name: 'DelimitedTextConverter', value: 4294 }
              ]
            },
            {
              name: 'DataUtil',
              value: 3322
            }
          ]
        },
        {
          name: 'display',
          children: [
            { name: 'DirtySprite', value: 8833 },
            { name: 'LineSprite', value: 1732 },
            { name: 'RectSprite', value: 3623 }
          ]
        },
        {
          name: 'flex',
          children: [{ name: 'FlareVis', value: 4116 }]
        },
        {
          name: 'query',
          children: [
            { name: 'AggregateExpression', value: 1616 },
            { name: 'And', value: 1027 },
            { name: 'Arithmetic', value: 3891 },
            { name: 'Average', value: 891 },
            { name: 'BinaryExpression', value: 2893 },
            { name: 'Comparison', value: 5103 },
            { name: 'CompositeExpression', value: 3677 },
            { name: 'Count', value: 781 },
            { name: 'DateUtil', value: 4141 },
            { name: 'Distinct', value: 933 },
            { name: 'Expression', value: 5130 },
            { name: 'ExpressionIterator', value: 3617 },
            { name: 'Fn', value: 3240 },
            { name: 'If', value: 2732 },
            { name: 'IsA', value: 2039 },
            { name: 'Literal', value: 1214 },
            { name: 'Match', value: 3748 },
            { name: 'Maximum', value: 843 },
            {
              name: 'methods',
              children: [
                { name: 'add', value: 593 },
                { name: 'and', value: 330 },
                { name: 'average', value: 287 },
                { name: 'count', value: 277 },
                { name: 'distinct', value: 292 },
                { name: 'div', value: 595 },
                { name: 'eq', value: 594 },
                { name: 'fn', value: 460 },
                { name: 'gt', value: 603 },
                { name: 'gte', value: 625 },
                { name: 'iff', value: 748 },
                { name: 'isa', value: 461 },
                { name: 'lt', value: 597 },
                { name: 'lte', value: 619 },
                { name: 'max', value: 283 },
                { name: 'min', value: 283 },
                { name: 'mod', value: 591 },
                { name: 'mul', value: 603 },
                { name: 'neq', value: 599 },
                { name: 'not', value: 386 },
                { name: 'or', value: 323 },
                { name: 'orderby', value: 307 },
                { name: 'range', value: 772 },
                { name: 'select', value: 296 },
                { name: 'stddev', value: 363 },
                { name: 'sub', value: 600 },
                { name: 'sum', value: 280 },
                { name: 'update', value: 307 },
                { name: 'variance', value: 335 },
                { name: 'where', value: 299 },
                { name: 'xor', value: 354 },
                { name: 'x_x', value: 264 }
              ]
            },
            { name: 'Minimum', value: 843 },
            { name: 'Not', value: 1554 },
            { name: 'Or', value: 970 },
            { name: 'Query', value: 13896 },
            { name: 'Range', value: 1594 },
            { name: 'StringUtil', value: 4130 },
            { name: 'Sum', value: 791 },
            { name: 'Variable', value: 1124 },
            { name: 'Variance', value: 1876 },
            { name: 'Xor', value: 1101 }
          ]
        },
        {
          name: 'scale',
          children: [
            { name: 'IScaleMap', value: 2105 },
            { name: 'LinearScale', value: 1316 },
            { name: 'LogScale', value: 3151 },
            { name: 'OrdinalScale', value: 3770 },
            { name: 'QuantileScale', value: 2435 },
            { name: 'QuantitativeScale', value: 4839 },
            { name: 'RootScale', value: 1756 },
            { name: 'Scale', value: 4268 },
            { name: 'ScaleType', value: 1821 },
            { name: 'TimeScale', value: 5833 }
          ]
        }
      ]
    }
    const option = {
      tooltip: { trigger: 'item', triggerOn: 'mousemove' },
      series: [
        {
          type: 'tree',
          id: 0,
          name: 'tree1',
          data: [data],
          top: '10%',
          left: '8%',
          bottom: '22%',
          right: '20%',
          symbolSize: 7,
          edgeShape: 'polyline',
          edgeForkPosition: '63%',
          initialTreeDepth: 3,
          lineStyle: { width: 2 },
          label: {
            backgroundColor: '#fff',
            position: 'left',
            verticalAlign: 'middle',
            align: 'right'
          },
          leaves: {
            label: { position: 'right', verticalAlign: 'middle', align: 'left' }
          },
          emphasis: { focus: 'descendant' },
          expandAndCollapse: true,
          animationDuration: 550,
          animationDurationUpdate: 750
        }
      ]
    }

    myChart.setOption(option)
  }

  static async echart_run_report6(myChart) {
    const url = '/data/asset/data/flare.json'
    const data = await call_echarts_request(url)

    const option = {
      tooltip: { trigger: 'item', triggerOn: 'mousemove' },
      series: [
        {
          type: 'tree',
          data: [data],
          top: '18%',
          bottom: '14%',
          layout: 'radial',
          symbol: 'emptyCircle',
          symbolSize: 7,
          initialTreeDepth: 3,
          animationDurationUpdate: 750,
          emphasis: { focus: 'descendant' }
        }
      ]
    }
    myChart.setOption(option)
  }

  static async echart_run_report7(myChart) {
    const url = '/data/asset/data/flare.json'
    const data = await call_echarts_request(url)
    const option = {
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove'
      },
      series: [
        {
          type: 'tree',
          data: [data],
          left: '2%',
          right: '2%',
          top: '8%',
          bottom: '20%',
          symbol: 'emptyCircle',
          orient: 'vertical',
          expandAndCollapse: true,
          label: {
            position: 'top',
            rotate: -90,
            verticalAlign: 'middle',
            align: 'right',
            fontSize: 9
          },
          leaves: {
            label: {
              position: 'bottom',
              rotate: -90,
              verticalAlign: 'middle',
              align: 'left'
            }
          },
          animationDurationUpdate: 750
        }
      ]
    }
    myChart.setOption(option)
  }
}

const AddonsModels = {
  'odoojs.echarts.treemap': ExtendModel
}

export default AddonsModels
