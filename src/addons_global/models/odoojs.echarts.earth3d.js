import { Model } from '@/odoorpc/models'
import * as echarts from 'echarts/core'

import { HttpRequest } from '@/odoojs-rpc/request'

function randInt() {
  return Math.floor((Math.random() * 1000) / 23)
}

const ROOT_PATH = 'echarts/examples'
async function call_echarts_request(url) {
  const api = HttpRequest
  api.baseURL = ROOT_PATH
  return api.call_get(url)
}

export class ExtendModel extends Model {
  constructor(...args) {
    super(...args)
  }

  static async echart_run_report(myChart) {
    const option = {
      backgroundColor: '#000',
      globe: {
        baseTexture: ROOT_PATH + '/data-gl/asset/earth.jpg',
        shading: 'lambert',
        environment: ROOT_PATH + '/data-gl/asset/starfield.jpg',
        atmosphere: {
          show: true
        },
        light: {
          ambient: {
            intensity: 0.1
          },
          main: {
            intensity: 1.5
          }
        }
      },
      series: []
    }

    myChart.setOption(option)
  }

  static async echart_run_report2(myChart) {
    const option = {
      backgroundColor: '#000',
      globe: {
        baseTexture: ROOT_PATH + '/data-gl/asset/world.topo.bathy.200401.jpg',
        heightTexture: ROOT_PATH + '/data-gl/asset/world.topo.bathy.200401.jpg',
        displacementScale: 0.04,
        shading: 'realistic',
        environment: ROOT_PATH + '/data-gl/asset/starfield.jpg',
        realisticMaterial: { roughness: 0.9 },
        postEffect: { enable: true },
        light: {
          main: { intensity: 5, shadow: true },
          ambientCubemap: {
            texture: ROOT_PATH + '/data-gl/asset/pisa.hdr',
            diffuseIntensity: 0.2
          }
        }
      }
    }
    myChart.setOption(option)
  }
  static async echart_run_report3(myChart) {
    const option = {
      backgroundColor: '#000',
      globe: {
        baseTexture: ROOT_PATH + '/data-gl/asset/earth.jpg',
        heightTexture:
          ROOT_PATH + '/data-gl/asset/bathymetry_bw_composite_4k.jpg',
        displacementScale: 0.1,
        shading: 'lambert',
        environment: ROOT_PATH + '/data-gl/asset/starfield.jpg',
        light: {
          ambient: {
            intensity: 0.1
          },
          main: {
            intensity: 1.5
          }
        },
        layers: [
          {
            type: 'blend',
            blendTo: 'emission',
            texture: ROOT_PATH + '/data-gl/asset/night.jpg'
          },
          {
            type: 'overlay',
            texture: ROOT_PATH + '/data-gl/asset/clouds.png',
            shading: 'lambert',
            distance: 5
          }
        ]
      },
      series: []
    }
    myChart.setOption(option)
  }

  static async echart_run_report4(myChart) {
    const option = {
      backgroundColor: '#000',
      globe: {
        baseTexture: ROOT_PATH + '/data-gl/asset/world.topo.bathy.200401.jpg',
        heightTexture:
          ROOT_PATH + '/data-gl/asset/bathymetry_bw_composite_4k.jpg',
        displacementScale: 0.2,
        shading: 'realistic',
        environment: ROOT_PATH + '/data-gl/asset/starfield.jpg',
        realisticMaterial: {
          // roughness:
          //   ROOT_PATH + '/asset/get/s/data-1497599804873-H1SHkG-mZ.jpg',
          // metalness:
          //   ROOT_PATH + '/asset/get/s/data-1497599800643-BJbHyGWQW.jpg',
          textureTiling: [8, 4]
        },
        postEffect: { enable: true },
        viewControl: { autoRotate: false },
        light: {
          main: { intensity: 2, shadow: true },
          ambientCubemap: {
            texture: ROOT_PATH + '/data-gl/asset/pisa.hdr',
            exposure: 2,
            diffuseIntensity: 2,
            specularIntensity: 2
          }
        }
      }
    }
    myChart.setOption(option)
  }

  static async echart_run_report5(myChart) {
    const option = {
      globe: {
        baseTexture: ROOT_PATH + '/data-gl/asset/moon-base.jpg',
        heightTexture: ROOT_PATH + '/data-gl/asset/moon-bump.jpg',
        displacementScale: 0.05,
        displacementQuality: 'medium',
        environment: ROOT_PATH + '/data-gl/asset/starfield.jpg',
        shading: 'realistic',
        realisticMaterial: { roughness: 0.8, metalness: 0 },
        postEffect: {
          enable: true,
          SSAO: { enable: true, radius: 2, intensity: 1, quality: 'high' }
        },
        temporalSuperSampling: { enable: true },
        light: {
          ambient: { intensity: 0 },
          main: { intensity: 2, shadow: true },
          ambientCubemap: {
            texture: ROOT_PATH + '/data-gl/asset/pisa.hdr',
            exposure: 0,
            diffuseIntensity: 0.02
          }
        },
        viewControl: { autoRotate: false }
      },
      series: []
    }
    myChart.setOption(option)
  }
  static async echart_run(report, chartInstance) {
    const maps = {
      report: 'echart_run_report',
      report2: 'echart_run_report2',
      report3: 'echart_run_report3',
      report4: 'echart_run_report4',
      report5: 'echart_run_report5'
    }
    return this[maps[report]](chartInstance)
  }

  static async get_echart_option(report) {
    const maps = {}
    if (report in maps) {
      return this[maps[report]]()
    } else {
      return { odoojs_echarts_type: { name: 'run_server' } }
    }
  }

  static async get_echart_data(report) {
    const maps = {}
    if (report in maps) {
      return this[maps[report]]()
    } else {
      return {}
    }
  }
}

const AddonsModels = {
  'odoojs.echarts.earth3d': ExtendModel
}

export default AddonsModels
