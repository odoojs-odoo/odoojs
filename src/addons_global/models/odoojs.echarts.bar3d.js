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
      const url = '/data/asset/data/life-expectancy-table.json'
      const data = await this.call_echarts_request(url)
      const option = {
        grid3D: {},
        tooltip: {},
        xAxis3D: {
          type: 'category'
        },
        yAxis3D: {
          type: 'category'
        },
        zAxis3D: {},
        visualMap: {
          max: 1e8,
          dimension: 'Population'
        },
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
            type: 'bar3D',
            // symbolSize: symbolSize,
            shading: 'lambert',
            encode: {
              x: 'Year',
              y: 'Country',
              z: 'Life Expectancy',
              tooltip: [0, 1, 2, 3, 4]
            }
          }
        ]
      }
      myChart.setOption(option)
    }

    static async echart_run_report2(myChart) {
      const SELF_ROOT_PATH = this.ROOT_PATH

      var img = new Image()
      var canvas = document.createElement('canvas')
      var ctx = canvas.getContext('2d')
      img.onload = function () {
        var width = (canvas.width = img.width)
        var height = (canvas.height = img.height)
        ctx.drawImage(img, 0, 0, width, height)
        var imgData = ctx.getImageData(0, 0, width, height)
        var data = new Float32Array((imgData.data.length / 4) * 3)
        var off = 0
        for (var i = 0; i < imgData.data.length / 4; i++) {
          var r = imgData.data[i * 4]
          var g = imgData.data[i * 4 + 1]
          var b = imgData.data[i * 4 + 2]
          var lum = 0.2125 * r + 0.7154 * g + 0.0721 * b
          lum = (lum - 125) / 4 + 50
          data[off++] = i % width
          data[off++] = height - Math.floor(i / width)
          data[off++] = lum
        }

        const option = {
          tooltip: {},
          backgroundColor: '#fff',
          xAxis3D: {
            type: 'value'
          },
          yAxis3D: {
            type: 'value'
          },
          zAxis3D: {
            type: 'value',
            min: 0,
            max: 100
          },
          grid3D: {
            show: false,
            viewControl: {
              alpha: 70,
              beta: 0
            },
            postEffect: {
              enable: true,
              depthOfField: {
                enable: true,
                blurRadius: 4,
                fstop: 10
              }
              // SSAO: {
              //     enable: true
              // }
            },
            boxDepth: 100,
            boxHeight: 20,
            environment: SELF_ROOT_PATH + '/data-gl/asset/starfield.jpg',
            light: {
              main: {
                shadow: true,
                intensity: 2
              },
              ambientCubemap: {
                texture: SELF_ROOT_PATH + '/data-gl/asset/canyon.hdr',
                exposure: 2,
                diffuseIntensity: 0.2
              }
            }
          },
          series: [
            {
              type: 'bar3D',
              shading: 'lambert',
              barSize: 0.8,
              silent: true,
              dimensions: ['x', 'y', 'z'],
              itemStyle: {
                color: function (params) {
                  var i = params.dataIndex
                  var r = imgData.data[i * 4] / 255
                  var g = imgData.data[i * 4 + 1] / 255
                  var b = imgData.data[i * 4 + 2] / 255
                  var lum = 0.2125 * r + 0.7154 * g + 0.0721 * b
                  r *= lum * 2
                  g *= lum * 2
                  b *= lum * 2
                  return [r, g, b, 1]
                }
              },
              data: data
            }
          ]
        }
        myChart.setOption(option)
      }
      img.src = this.ROOT_PATH + '/data-gl/asset/sample.jpg'
      img.crossOrigin = 'Anonymous'
    }

    static async echart_run_report3(myChart) {
      // prettier-ignore
      const hours = [
      '12a', '1a', '2a', '3a', '4a', '5a', '6a',
'7a', '8a', '9a', '10a', '11a',
'12p', '1p', '2p', '3p', '4p', '5p',
'6p', '7p', '8p', '9p', '10p', '11p'];

      // prettier-ignore
      const days = ['Saturday', 'Friday', 'Thursday','Wednesday', 'Tuesday', 'Monday', 'Sunday'];
      // prettier-ignore
      const data = [
      [0, 0, 5], [0, 1, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 2], [0, 12, 4], [0, 13, 1], [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3], [0, 21, 3], [0, 22, 2], [0, 23, 5], [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2], [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7], [1, 18, 8], [1, 19, 12], [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2], [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2], [2, 12, 1], [2, 13, 9], [2, 14, 8], [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5], [2, 19, 5], [2, 20, 7], [2, 21, 4], [2, 22, 2], [2, 23, 4], [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7], [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 9], [3, 17, 5], [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4], [3, 23, 1], [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 2], [4, 10, 4], [4, 11, 4], [4, 12, 2], [4, 13, 4], [4, 14, 4], [4, 15, 14], [4, 16, 12], [4, 17, 1], [4, 18, 8], [4, 19, 5], [4, 20, 3], [4, 21, 7], [4, 22, 3], [4, 23, 0], [5, 0, 2], [5, 1, 1], [5, 2, 0], [5, 3, 3], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 2], [5, 9, 0], [5, 10, 4], [5, 11, 1], [5, 12, 5], [5, 13, 10], [5, 14, 5], [5, 15, 7], [5, 16, 11], [5, 17, 6], [5, 18, 0], [5, 19, 5], [5, 20, 3], [5, 21, 4], [5, 22, 2], [5, 23, 0], [6, 0, 1], [6, 1, 0], [6, 2, 0], [6, 3, 0], [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0], [6, 8, 0], [6, 9, 0], [6, 10, 1], [6, 11, 0], [6, 12, 2], [6, 13, 1], [6, 14, 3], [6, 15, 4], [6, 16, 0], [6, 17, 0], [6, 18, 0], [6, 19, 0], [6, 20, 1], [6, 21, 2], 
      [6, 22, 2], [6, 23, 6]];

      const option = {
        tooltip: {},
        visualMap: {
          max: 20,
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
        xAxis3D: {
          type: 'category',
          data: hours
        },
        yAxis3D: {
          type: 'category',
          data: days
        },
        zAxis3D: {
          type: 'value'
        },
        grid3D: {
          boxWidth: 200,
          boxDepth: 80,
          viewControl: {
            // projection: 'orthographic'
          },
          light: {
            main: {
              intensity: 1.2,
              shadow: true
            },
            ambient: {
              intensity: 0.3
            }
          }
        },
        series: [
          {
            type: 'bar3D',
            data: data.map(function (item) {
              return {
                value: [item[1], item[0], item[2]]
              }
            }),
            shading: 'lambert',
            label: {
              fontSize: 16,
              borderWidth: 1
            },
            emphasis: {
              label: {
                fontSize: 20,
                color: '#900'
              },
              itemStyle: {
                color: '#900'
              }
            }
          }
        ]
      }
      myChart.setOption(option)
    }

    static async echart_run_report4(myChart) {
      var canvas = document.createElement('canvas')
      var ctx = canvas.getContext('2d')
      var imgData
      var currentImg
      // Configurations
      var config = {
        scale: 0.3,
        roughness: 0,
        metalness: 1,
        projection: 'orthographic',
        depthOfField: 4,
        lockY: false,
        move: true,
        sameColor: false,
        color: '#777',
        colorContrast: 1.2,
        lightIntensity: 1,
        lightColor: '#fff',
        lightRotate: 30,
        lightPitch: 40,
        AO: 1.5,
        showEnvironment: false,
        barNumber: 80,
        barBevel: 0.18,
        barSize: 1.2
      }
      const option = {
        tooltip: {},
        backgroundColor: '#000',
        xAxis3D: {
          type: 'value'
        },
        yAxis3D: {
          type: 'value'
        },
        zAxis3D: {
          type: 'value',
          min: 0,
          max: 100
        },
        grid3D: {
          show: false,
          viewControl: {
            projection: 'perspective',
            alpha: 45,
            beta: -45,
            panSensitivity: config.move ? 1 : 0,
            rotateSensitivity: config.lockY ? [1, 0] : 1,
            damping: 0.9,
            distance: 60
          },
          postEffect: {
            enable: true,
            bloom: {
              intensity: 0.2
            },
            screenSpaceAmbientOcclusion: {
              enable: true,
              intensity: 1.5,
              radius: 5,
              quality: 'high'
            },
            screenSpaceReflection: {
              enable: true
            },
            depthOfField: {
              enable: true,
              blurRadius: config.depthOfField,
              fstop: 10,
              focalDistance: 55
            }
          },
          boxDepth: 100,
          boxHeight: 20,
          environment: 'none',
          light: {
            main: {
              shadow: true,
              intensity: 2
            },
            ambientCubemap: {
              texture: this.ROOT_PATH + '/data-gl/asset/pisa.hdr',
              exposure: 2,
              diffuseIntensity: 0.2,
              specularIntensity: 1.5
            }
          }
        }
      }

      myChart.setOption(option)

      function updateData(pixelData, width, height) {
        console.time('update')
        var data = new Float32Array((pixelData.length / 4) * 3)
        var off = 0
        for (var i = 0; i < pixelData.length / 4; i++) {
          var r = pixelData[i * 4]
          var g = pixelData[i * 4 + 1]
          var b = pixelData[i * 4 + 2]
          var lum = 0.2125 * r + 0.7154 * g + 0.0721 * b
          lum = (lum - 125) * config.scale + 50
          data[off++] = i % width
          data[off++] = height - Math.floor(i / width)
          data[off++] = lum
        }

        myChart.setOption({
          grid3D: {
            boxWidth: (100 / height) * width
          },
          series: [
            {
              animation: false,
              type: 'bar3D',
              shading: 'realistic',
              realisticMaterial: {
                roughness: config.roughness,
                metalness: config.metalness
              },
              barSize: config.barSize,
              bevelSize: config.barBevel,
              silent: true,
              dimensions: ['x', 'y', 'z'],
              itemStyle: {
                color: config.sameColor
                  ? config.color
                  : function (params) {
                      var i = params.dataIndex
                      var r = pixelData[i * 4] / 255
                      var g = pixelData[i * 4 + 1] / 255
                      var b = pixelData[i * 4 + 2] / 255
                      var lum = 0.2125 * r + 0.7154 * g + 0.0721 * b
                      r *= lum * config.colorContrast
                      g *= lum * config.colorContrast
                      b *= lum * config.colorContrast
                      return [r, g, b, 1]
                    }
              },
              data: data
            }
          ]
        })
        console.timeEnd('update')
      }

      function loadImage(img) {
        var height = (canvas.height = Math.min(config.barNumber, img.height))
        var aspect = img.width / img.height
        var width = (canvas.width = Math.round(height * aspect))
        ctx.drawImage(img, 0, 0, width, height)
        imgData = ctx.getImageData(0, 0, width, height)
        updateData(imgData.data, width, height)
      }
      // Default
      var img = new Image()
      img.onload = function () {
        loadImage(img)
        currentImg = img
      }
      img.src = this.ROOT_PATH + '/data-gl/asset/bitcoin.png'
    }

    static async echart_run_report5(myChart) {
      const url = '/data/asset/data/life-expectancy-table.json'
      const data2 = await this.call_echarts_request(url)

      const data = data2
        .filter(function (dataItem) {
          return dataItem[2] > 0
        })
        .map(function (dataItem) {
          return [dataItem[0], dataItem[1], Math.sqrt(dataItem[2])]
        })
      const option = {
        backgroundColor: '#000',
        globe: {
          baseTexture:
            this.ROOT_PATH + '/data-gl/asset/world.topo.bathy.200401.jpg',
          heightTexture:
            this.ROOT_PATH + '/data-gl/asset/world.topo.bathy.200401.jpg',
          shading: 'lambert',
          environment: this.ROOT_PATH + '/data-gl/asset/starfield.jpg',
          light: {
            main: {
              intensity: 2
            }
          },
          viewControl: {
            autoRotate: false
          }
        },
        visualMap: {
          max: 40,
          calculable: true,
          realtime: false,
          inRange: {
            colorLightness: [0.2, 0.9]
          },
          textStyle: {
            color: '#fff'
          },
          controller: {
            inRange: {
              color: 'orange'
            }
          },
          outOfRange: {
            colorAlpha: 0
          }
        },
        series: [
          {
            type: 'bar3D',
            coordinateSystem: 'globe',
            data: data,
            barSize: 0.6,
            minHeight: 0.2,
            silent: true,
            itemStyle: {
              color: 'orange'
            }
          }
        ]
      }

      myChart.setOption(option)
    }

    static async echart_run_report6(myChart) {
      const SELF_ROOT_PATH = this.ROOT_PATH

      var img = new Image()
      var canvas = document.createElement('canvas')
      var ctx = canvas.getContext('2d')
      img.onload = function () {
        var width = (canvas.width = img.width / 2)
        var height = (canvas.height = img.height / 2)
        ctx.drawImage(img, 0, 0, width, height)
        var imgData = ctx.getImageData(0, 0, width, height)
        var data = []
        for (var i = 0; i < imgData.data.length / 4; i++) {
          var r = imgData.data[i * 4]
          var g = imgData.data[i * 4 + 1]
          var b = imgData.data[i * 4 + 2]
          var lum = 255 - (0.2125 * r + 0.7154 * g + 0.0721 * b)
          lum = (lum - 125) / 20 + 50
          data.push([i % width, height - Math.floor(i / width), lum])
        }
        const option = {
          tooltip: {},
          backgroundColor: '#fff',
          xAxis3D: {
            type: 'value'
          },
          yAxis3D: {
            type: 'value'
          },
          zAxis3D: {
            type: 'value',
            min: 0,
            max: 100
          },
          grid3D: {
            viewControl: {
              alpha: 20,
              beta: -30
            },
            postEffect: {
              enable: true,
              SSAO: {
                enable: true
              }
            },
            boxDepth: 120,
            light: {
              main: {
                shadow: true,
                intensity: 2
              },
              ambientCubemap: {
                texture: SELF_ROOT_PATH + '/data-gl/asset/canyon.hdr',
                exposure: 2,
                diffuseIntensity: 0.2,
                specularIntensity: 1
              }
            }
          },
          series: [
            {
              type: 'bar3D',
              shading: 'realistic',
              barSize: 1,
              wireframe: {
                show: false
              },
              itemStyle: {
                color: function (params) {
                  var i = params.dataIndex
                  var r = imgData.data[i * 4]
                  var g = imgData.data[i * 4 + 1]
                  var b = imgData.data[i * 4 + 2]
                  return 'rgb(' + [r, g, b].join(',') + ')'
                }
              },
              data: data
            }
          ]
        }

        myChart.setOption(option)
      }
      img.src =
        'data:image/jpeg;charset=utf-8;base64,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BgAAAAAAAQAvZmYAAQChmZoABgAAAAAAAQAyAAAAAQBaAAAABgAAAAAAAQA1AAAAAQAtAAAABgAAAAAAAThCSU0D+AAAAAAAcAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAA4QklNBAgAAAAAABAAAAABAAACQAAAAkAAAAAAOEJJTQQeAAAAAAAEAAAAADhCSU0EGgAAAAADRQAAAAYAAAAAAAAAAAAAAOoAAADIAAAACABJAE0ARwBfADEANgA2ADYAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAMgAAADqAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAEAAAAAAABudWxsAAAAAgAAAAZib3VuZHNPYmpjAAAAAQAAAAAAAFJjdDEAAAAEAAAAAFRvcCBsb25nAAAAAAAAAABMZWZ0bG9uZwAAAAAAAAAAQnRvbWxvbmcAAADqAAAAAFJnaHRsb25nAAAAyAAAAAZzbGljZXNWbExzAAAAAU9iamMAAAABAAAAAAAFc2xpY2UAAAASAAAAB3NsaWNlSURsb25nAAAAAAAAAAdncm91cElEbG9uZwAAAAAAAAAGb3JpZ2luZW51bQAAAAxFU2xpY2VPcmlnaW4AAAANYXV0b0dlbmVyYXRlZAAAAABUeXBlZW51bQAAAApFU2xpY2VUeXBlAAAAAEltZyAAAAAGYm91bmRzT2JqYwAAAAEAAAAAAABSY3QxAAAABAAAAABUb3AgbG9uZwAAAAAAAAAATGVmdGxvbmcAAAAAAAAAAEJ0b21sb25nAAAA6gAAAABSZ2h0bG9uZwAAAMgAAAADdXJsVEVYVAAAAAEAAAAAAABudWxsVEVYVAAAAAEAAAAAAABNc2dlVEVYVAAAAAEAAAAAAAZhbHRUYWdURVhUAAAAAQAAAAAADmNlbGxUZXh0SXNIVE1MYm9vbAEAAAAIY2VsbFRleHRURVhUAAAAAQAAAAAACWhvcnpBbGlnbmVudW0AAAAPRVNsaWNlSG9yekFsaWduAAAAB2RlZmF1bHQAAAAJdmVy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bnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxNy0wNC0xMVQyMjoyODo0MSswODowMCIgeG1wOkNyZWF0ZURhdGU9IjIwMTctMDMtMTVUMTI6MDU6NDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMTctMDQtMTFUMjI6Mjg6NDErMDg6MDAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgcGhvdG9zaG9wOkRhdGVDcmVhdGVkPSIyMDE3LTAzLTE1VDEyOjA1OjQwIiBwaG90b3Nob3A6TGVnYWN5SVBUQ0RpZ2VzdD0iNDgzM0RBMjMwRUU3N0YzQzU5REY1RUQxRTUyQzJGMzAiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06RG9jdW1lbnRJRD0iNDYwNEVDMDkyRDAzNDU0REFDMjdGQkE0Rjg2N0VBRjgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDI4MDExNzQwNzIwNjgxMTgyMkFDNjk3QzlCMzJGMTciIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0iNDYwNEVDMDkyRDAzNDU0REFDMjdGQkE0Rjg2N0VBRjgiIGRjOmZvcm1hdD0iaW1hZ2UvanBlZyI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjAyODAxMTc0MDcyMDY4MTE4MjJBQ0ZBMDhBQkNCMUY4IiBzdEV2dDp3aGVuPSIyMDE3LTAzLTE1VDEyOjEwOjIwKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDowMjgwMTE3NDA3MjA2ODExODIyQUM2OTdDOUIzMkYxNyIgc3RFdnQ6d2hlbj0iMjAxNy0wNC0xMVQyMjoyODo0MSswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPD94cGFja2V0IGVuZD0idyI/Pv/iDFhJQ0NfUFJPRklMRQABAQAADEhMaW5vAhAAAG1udHJSR0IgWFlaIAfOAAIACQAGADEAAGFjc3BNU0ZUAAAAAElFQyBzUkdCAAAAAAAAAAAAAAAAAAD21gABAAAAANMtSFAgIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEWNwcnQAAAFQAAAAM2Rlc2MAAAGEAAAAbHd0cHQAAAHwAAAAFGJrcHQAAAIEAAAAFHJYWVoAAAIYAAAAFGdYWVoAAAIsAAAAFGJYWVoAAAJAAAAAFGRtbmQAAAJUAAAAcGRtZGQAAALEAAAAiHZ1ZWQAAANMAAAAhnZpZXcAAAPUAAAAJGx1bWkA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'
    }

    static async echart_run_report7(myChart) {
      // prettier-ignore
      var hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a',
'7a', '8a', '9a', '10a', '11a',
'12p', '1p', '2p', '3p', '4p', '5p',
'6p', '7p', '8p', '9p', '10p', '11p'];
      // prettier-ignore
      var days = ['Saturday', 'Friday', 'Thursday',
'Wednesday', 'Tuesday', 'Monday', 'Sunday'];
      // prettier-ignore
      var data = [
      [0, 0, 5], [0, 1, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 2], [0, 12, 4], [0, 13, 1], [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3], [0, 21, 3], [0, 22, 2], [0, 23, 5], [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2], [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7], [1, 18, 8], [1, 19, 12], [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2], [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2], [2, 12, 1], [2, 13, 9], [2, 14, 8], [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5], [2, 19, 5], [2, 20, 7], [2, 21, 4], [2, 22, 2], [2, 23, 4], [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7], [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 9], [3, 17, 5], [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4], [3, 23, 1], [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 2], [4, 10, 4], [4, 11, 4], [4, 12, 2], [4, 13, 4], [4, 14, 4], [4, 15, 14], [4, 16, 12], [4, 17, 1], [4, 18, 8], [4, 19, 5], [4, 20, 3], [4, 21, 7], [4, 22, 3], [4, 23, 0], [5, 0, 2], [5, 1, 1], [5, 2, 0], [5, 3, 3], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 2], [5, 9, 0], [5, 10, 4], [5, 11, 1], [5, 12, 5], [5, 13, 10], [5, 14, 5], [5, 15, 7], [5, 16, 11], [5, 17, 6], [5, 18, 0], [5, 19, 5], [5, 20, 3], [5, 21, 4], [5, 22, 2], [5, 23, 0], [6, 0, 1], [6, 1, 0], [6, 2, 0], [6, 3, 0], [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0], [6, 8, 0], [6, 9, 0], [6, 10, 1], [6, 11, 0], [6, 12, 2], [6, 13, 1], [6, 14, 3], [6, 15, 4], [6, 16, 0], [6, 17, 0], [6, 18, 0], [6, 19, 0], [6, 20, 1], [6, 21, 2], [6, 22, 2], [6, 23, 6]];
      const option = {
        tooltip: {},
        visualMap: {
          max: 20,
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
        xAxis3D: {
          type: 'category',
          data: hours
        },
        yAxis3D: {
          type: 'category',
          data: days
        },
        zAxis3D: {
          type: 'value'
        },
        grid3D: {
          boxWidth: 200,
          boxDepth: 80,
          light: {
            main: {
              intensity: 1.2
            },
            ambient: {
              intensity: 0.3
            }
          }
        },
        series: [
          {
            type: 'bar3D',
            data: data.map(function (item) {
              return {
                value: [item[1], item[0], item[2]]
              }
            }),
            shading: 'color',
            label: {
              show: false,
              fontSize: 16,
              borderWidth: 1
            },
            itemStyle: {
              opacity: 0.4
            },
            emphasis: {
              label: {
                fontSize: 20,
                color: '#900'
              },
              itemStyle: {
                color: '#900'
              }
            }
          }
        ]
      }

      myChart.setOption(option)
    }
  }

  return ExtendModel
}

const AddonsModels = {
  'odoojs.echarts.bar3d': ModelCreator
}

export default AddonsModels
