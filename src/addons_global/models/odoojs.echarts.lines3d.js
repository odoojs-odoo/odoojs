import { EchartsBaseModelCreator } from './odoojs.echarts.base'

function ModelCreator(Model, { HttpRequest }) {
  const EchartsBaseModel = EchartsBaseModelCreator(Model, { HttpRequest })

  class ExtendModel extends EchartsBaseModel {
    constructor(...args) {
      super(...args)
    }

    static async echart_run_report(myChart) {
      const url = '/data-gl/asset/data/flights.json'

      const data = await this.call_echarts_request(url)

      function getAirportCoord(idx) {
        return [data.airports[idx][3], data.airports[idx][4]]
      }
      var routes = data.routes.map(function (airline) {
        return [getAirportCoord(airline[1]), getAirportCoord(airline[2])]
      })

      const option = {
        backgroundColor: '#000',
        globe: {
          baseTexture:
            this.ROOT_PATH + '/data-gl/asset/world.topo.bathy.200401.jpg',
          heightTexture:
            this.ROOT_PATH + '/data-gl/asset/bathymetry_bw_composite_4k.jpg',
          shading: 'lambert',
          light: {
            ambient: {
              intensity: 0.4
            },
            main: {
              intensity: 0.4
            }
          },
          viewControl: {
            autoRotate: false
          }
        },
        series: {
          type: 'lines3D',
          coordinateSystem: 'globe',
          blendMode: 'lighter',
          lineStyle: {
            width: 1,
            color: 'rgb(50, 50, 150)',
            opacity: 0.1
          },
          data: routes
        }
      }

      myChart.setOption(option)
    }
  }

  return ExtendModel
}

const AddonsModels = {
  'odoojs.echarts.lines3d': ModelCreator
}

export default AddonsModels
