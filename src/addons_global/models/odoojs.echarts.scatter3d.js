import {
  EchartsBaseModel,
  call_echarts_request,
  ROOT_PATH
} from './odoojs.echarts.base'

export class ExtendModel extends EchartsBaseModel {
  constructor(...args) {
    super(...args)
  }

  static async echart_run_report(myChart) {
    var schema = [
      { name: 'name', index: 0 },
      { name: 'group', index: 1 },
      { name: 'protein', index: 2 },
      { name: 'calcium', index: 3 },
      { name: 'sodium', index: 4 },
      { name: 'fiber', index: 5 },
      { name: 'vitaminc', index: 6 },
      { name: 'potassium', index: 7 },
      { name: 'carbohydrate', index: 8 },
      { name: 'sugars', index: 9 },
      { name: 'fat', index: 10 },
      { name: 'water', index: 11 },
      { name: 'calories', index: 12 },
      { name: 'saturated', index: 13 },
      { name: 'monounsat', index: 14 },
      { name: 'polyunsat', index: 15 },
      { name: 'id', index: 16 }
    ]

    var fieldIndices = schema.reduce(function (obj, item) {
      obj[item.name] = item.index
      return obj
    }, {})

    var config = {
      xAxis3D: 'protein',
      yAxis3D: 'fiber',
      zAxis3D: 'sodium',
      color: 'fiber',
      symbolSize: 'vitaminc',
      onChange: function () {
        var max = getMaxOnExtent(data)
        if (data) {
          myChart.setOption({
            visualMap: [
              {
                max: max.color / 2
              },
              {
                max: max.symbolSize / 2
              }
            ],
            xAxis3D: {
              name: config.xAxis3D
            },
            yAxis3D: {
              name: config.yAxis3D
            },
            zAxis3D: {
              name: config.zAxis3D
            },
            series: {
              dimensions: [
                config.xAxis3D,
                config.yAxis3D,
                config.yAxis3D,
                config.color,
                config.symbolSiz
              ],
              data: data.map(function (item, idx) {
                return [
                  item[fieldIndices[config.xAxis3D]],
                  item[fieldIndices[config.yAxis3D]],
                  item[fieldIndices[config.zAxis3D]],
                  item[fieldIndices[config.color]],
                  item[fieldIndices[config.symbolSize]],
                  idx
                ]
              })
            }
          })
        }
      }
    }

    function getMaxOnExtent(data) {
      var colorMax = -Infinity
      var symbolSizeMax = -Infinity
      for (var i = 0; i < data.length; i++) {
        var item = data[i]
        var colorVal = item[fieldIndices[config.color]]
        var symbolSizeVal = item[fieldIndices[config.symbolSize]]
        colorMax = Math.max(colorVal, colorMax)
        symbolSizeMax = Math.max(symbolSizeVal, symbolSizeMax)
      }
      return {
        color: colorMax,
        symbolSize: symbolSizeMax
      }
    }

    const url = '/data/asset/data/nutrients.json'
    const data = await call_echarts_request(url)

    var max = getMaxOnExtent(data)

    const option = {
      tooltip: {},
      visualMap: [
        {
          top: 10,
          calculable: true,
          dimension: 3,
          max: max.color / 2,
          inRange: {
            color: [
              '#1710c0',
              '#0b9df0',
              '#00fea8',
              '#00ff0d',
              '#f5f811',
              '#f09a09',
              '#fe0300'
            ]
          },
          textStyle: {
            color: '#fff'
          }
        },
        {
          bottom: 10,
          calculable: true,
          dimension: 4,
          max: max.symbolSize / 2,
          inRange: {
            symbolSize: [10, 40]
          },
          textStyle: {
            color: '#fff'
          }
        }
      ],
      xAxis3D: {
        name: config.xAxis3D,
        type: 'value'
      },
      yAxis3D: {
        name: config.yAxis3D,
        type: 'value'
      },
      zAxis3D: {
        name: config.zAxis3D,
        type: 'value'
      },
      grid3D: {
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
        axisPointer: {
          lineStyle: {
            color: '#ffbd67'
          }
        },
        viewControl: {
          // autoRotate: true
          // projection: 'orthographic'
        }
      },
      series: [
        {
          type: 'scatter3D',
          dimensions: [
            config.xAxis3D,
            config.yAxis3D,
            config.yAxis3D,
            config.color,
            config.symbolSiz
          ],
          data: data.map(function (item, idx) {
            return [
              item[fieldIndices[config.xAxis3D]],
              item[fieldIndices[config.yAxis3D]],
              item[fieldIndices[config.zAxis3D]],
              item[fieldIndices[config.color]],
              item[fieldIndices[config.symbolSize]],
              idx
            ]
          }),
          symbolSize: 12,
          // symbol: 'triangle',
          itemStyle: {
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.8)'
          },
          emphasis: {
            itemStyle: {
              color: '#fff'
            }
          }
        }
      ]
    }

    myChart.setOption(option)
  }

  static async echart_run_report2(myChart) {
    const url = '/data/asset/data/life-expectancy-table.json'

    const data = await call_echarts_request(url)

    var symbolSize = 2.5
    const option = {
      grid3D: {},
      xAxis3D: {
        type: 'category'
      },
      yAxis3D: {},
      zAxis3D: {},
      dataset: {
        dimensions: [
          'Income',
          'Life Expectancy',
          'Population',
          'Country',
          { name: 'Year', type: 'ordinal' }
        ],
        source: data
      },
      series: [
        {
          type: 'scatter3D',
          symbolSize: symbolSize,
          encode: {
            x: 'Country',
            y: 'Life Expectancy',
            z: 'Income',
            tooltip: [0, 1, 2, 3, 4]
          }
        }
      ]
    }

    myChart.setOption(option)
  }

  static async echart_run_report3(myChart) {
    const url = '/data/asset/data/life-expectancy-table.json'

    const data2 = await call_echarts_request(url)
    const data = data2
      .filter(function (dataItem) {
        return dataItem[2] > 0
      })
      .map(function (dataItem) {
        return [dataItem[0], dataItem[1], Math.sqrt(dataItem[2])]
      })

    const option = {
      visualMap: {
        show: false,
        min: 0,
        max: 60,
        inRange: {
          symbolSize: [1.0, 10.0]
        }
      },
      globe: {
        environment: ROOT_PATH + '/data-gl/asset/starfield.jpg',
        heightTexture:
          ROOT_PATH + '/data-gl/asset/bathymetry_bw_composite_4k.jpg',
        displacementScale: 0.05,
        displacementQuality: 'high',
        globeOuterRadius: 100,
        baseColor: '#000',
        shading: 'realistic',
        realisticMaterial: {
          roughness: 0.2,
          metalness: 0
        },
        postEffect: {
          enable: true,
          depthOfField: {
            focalRange: 15,
            enable: true,
            focalDistance: 100
          }
        },
        temporalSuperSampling: {
          enable: true
        },
        light: {
          ambient: {
            intensity: 0
          },
          main: {
            intensity: 0.1,
            shadow: false
          },
          ambientCubemap: {
            texture: ROOT_PATH + '/data-gl/asset/lake.hdr',
            exposure: 1,
            diffuseIntensity: 0.5,
            specularIntensity: 2
          }
        },
        viewControl: {
          autoRotate: false,
          beta: 180,
          alpha: 20,
          distance: 100
        }
      },
      series: {
        type: 'scatter3D',
        coordinateSystem: 'globe',
        blendMode: 'lighter',
        symbolSize: 2,
        itemStyle: {
          color: 'rgb(50, 50, 150)',
          opacity: 1
        },
        data: data
      }
    }

    myChart.setOption(option)
  }
}

const AddonsModels = {
  'odoojs.echarts.scatter3d': ExtendModel
}

export default AddonsModels
