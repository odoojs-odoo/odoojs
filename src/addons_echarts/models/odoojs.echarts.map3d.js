import * as echarts from 'echarts/core'
import { EchartsBaseModelCreator } from './odoojs.echarts.base'

function ModelCreator(Model, { HttpRequest }) {
  const EchartsBaseModel = EchartsBaseModelCreator(Model, { HttpRequest })

  class ExtendModel extends EchartsBaseModel {
    constructor(...args) {
      super(...args)
    }

    static async echart_run_report(myChart) {
      const url = '/data-gl/asset/data/buildings.json'
      const buildingsGeoJSON = await this.call_echarts_request(url)

      echarts.registerMap('buildings', buildingsGeoJSON)
      var regions = buildingsGeoJSON.features.map(function (feature) {
        return {
          name: feature.properties.name,
          value: Math.random(),
          height: feature.properties.height / 10
        }
      })

      const option = {
        visualMap: {
          show: false,
          min: 0.4,
          max: 1,
          inRange: {
            color: [
              '#313695',
              '#4575b4',
              '#74add1',
              '#abd9e9',
              '#e0f3f8',
              '#ffffbf',
              '#fee090',
              '#fdae61',
              '#f46d43',
              '#d73027',
              '#a50026'
            ]
          }
        },
        series: [
          {
            type: 'map3D',
            map: 'buildings',
            shading: 'realistic',
            environment: '#000',
            realisticMaterial: {
              roughness: 0.6,
              textureTiling: 20
            },
            postEffect: {
              enable: true,
              SSAO: {
                enable: true,
                intensity: 1.3,
                radius: 5
              },
              screenSpaceReflection: {
                enable: false
              },
              depthOfField: {
                enable: true,
                blurRadius: 4,
                focalDistance: 30
              }
            },
            light: {
              main: {
                intensity: 3,
                alpha: 40,
                shadow: true,
                shadowQuality: 'high'
              },
              ambient: {
                intensity: 0
              },
              ambientCubemap: {
                texture: this.ROOT_PATH + '/data-gl/asset/pisa.hdr',
                exposure: 1,
                diffuseIntensity: 0.5,
                specularIntensity: 1
              }
            },
            groundPlane: {
              show: false,
              color: '#333'
            },
            viewControl: {
              minBeta: -360,
              maxBeta: 360,
              alpha: 50,
              center: [50, 0, -10],
              distance: 30,
              minDistance: 5,
              panMouseButton: 'left',
              rotateMouseButton: 'middle',
              zoomSensitivity: 0.5
            },
            itemStyle: {
              areaColor: '#666'
              // borderColor: '#222',
              // borderWidth: 1
            },
            label: {
              color: 'white'
            },
            silent: true,
            instancing: true,
            boxWidth: 200,
            boxHeight: 1,
            data: regions
          }
        ]
      }

      myChart.setOption(option)
    }

    static async echart_run_report2(myChart) {
      const url = '/data-gl/asset/data/buildings.json'
      const buildingsGeoJSON = await this.call_echarts_request(url)

      echarts.registerMap('buildings', buildingsGeoJSON)
      var regions = buildingsGeoJSON.features.map(function (feature) {
        return {
          name: feature.properties.name,
          value: Math.max(Math.sqrt(feature.properties.height), 0.1),
          height: Math.max(Math.sqrt(feature.properties.height), 0.1)
        }
      })

      const option = {
        series: [
          {
            type: 'map3D',
            map: 'buildings',
            shading: 'realistic',
            realisticMaterial: {
              roughness: 0.6,
              textureTiling: 20,
              detailTexture: this.ROOT_PATH + '/data-gl/asset/woods.jpg'
            },
            postEffect: {
              enable: true,
              bloom: {
                enable: false
              },
              SSAO: {
                enable: true,
                quality: 'medium',
                radius: 10,
                intensity: 1.2
              },
              depthOfField: {
                enable: false,
                focalRange: 5,
                fstop: 1,
                blurRadius: 6
              }
            },
            groundPlane: {
              show: true,
              color: '#333'
            },
            light: {
              main: {
                intensity: 6,
                shadow: true,
                shadowQuality: 'high',
                alpha: 30
              },
              ambient: {
                intensity: 0
              },
              ambientCubemap: {
                texture: this.ROOT_PATH + '/data-gl/asset/canyon.hdr',
                exposure: 2,
                diffuseIntensity: 1,
                specularIntensity: 1
              }
            },
            viewControl: {
              minBeta: -360,
              maxBeta: 360
            },
            itemStyle: {
              areaColor: '#666'
            },
            label: {
              color: 'white'
            },
            silent: true,
            instancing: true,
            boxWidth: 200,
            boxHeight: 1,
            data: regions
          }
        ]
      }
      myChart.setOption(option)
    }
  }
  return ExtendModel
}

const AddonsModels = {
  'odoojs.echarts.map3d': ModelCreator
}

export default AddonsModels
