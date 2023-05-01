import { Model } from '@/odoorpc/models'
// import * as echarts from 'echarts/core'

// import { HttpRequest } from '@/odoojs-rpc/request'

const ROOT_PATH = 'echarts/examples'
// async function call_echarts_request(url) {
//   const api = HttpRequest
//   api.baseURL = ROOT_PATH
//   return api.call_get(url)
// }

export class ExtendModel extends Model {
  constructor(...args) {
    super(...args)
  }

  static async echart_run_report(myChart) {
    var CHUNK_COUNT = 32
    var dataCount = 0
    function fetchData(idx) {
      if (idx >= CHUNK_COUNT) {
        return
      }
      var dataURL =
        ROOT_PATH + '/data/asset/data/links-ny/links_ny_' + idx + '.bin'
      var xhr = new XMLHttpRequest()
      xhr.open('GET', dataURL, true)
      xhr.responseType = 'arraybuffer'
      xhr.onload = function (e) {
        var rawData = new Float32Array(this.response)
        var data = new Float64Array(rawData.length - 2)
        var offsetX = rawData[0]
        var offsetY = rawData[1]
        var off = 0
        var addedDataCount = 0
        for (var i = 2; i < rawData.length; ) {
          var count = rawData[i++]
          data[off++] = count
          for (var k = 0; k < count; k++) {
            var x = rawData[i++] + offsetX
            var y = rawData[i++] + offsetY
            data[off++] = x
            data[off++] = y
            addedDataCount++
          }
        }
        myChart.appendData({
          seriesIndex: 0,
          data: data
        })
        dataCount += addedDataCount
        fetchData(idx + 1)
      }
      xhr.send()
    }
    const option = {
      progressive: 20000,
      backgroundColor: '#111',
      geo: {
        center: [-74.04327099998152, 40.86737600240287],
        zoom: 360,
        map: 'world',
        roam: true,
        silent: true,
        itemStyle: {
          color: 'transparent',
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: 1
        }
      },
      series: [
        {
          type: 'lines',
          coordinateSystem: 'geo',
          blendMode: 'lighter',
          dimensions: ['value'],
          data: new Float64Array(),
          polyline: true,
          large: true,
          lineStyle: {
            color: 'orange',
            width: 0.5,
            opacity: 0.3
          }
        }
      ]
    }
    myChart.setOption(option)
    fetchData(0)
  }

  static async get_echart_option(report) {
    const maps = {
      // report: 'get_echart_option_report'
    }

    if (report in maps) {
      return this[maps[report]]()
    } else {
      return { odoojs_echarts_type: { name: 'run_server' } }
    }
  }

  static async get_echart_data(report) {
    const maps = {
      // report: 'get_echart_data_report'
    }

    if (report in maps) {
      return this[maps[report]]()
    } else {
      return {}
    }
  }

  static async echart_run(report, chartInstance) {
    const maps = {
      report: 'echart_run_report'
    }
    return this[maps[report]](chartInstance)
  }
}

const AddonsModels = {
  'odoojs.echarts.lines.map': ExtendModel
}

export default AddonsModels
