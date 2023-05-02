import { EchartsBaseModel, call_echarts_request } from './odoojs.echarts.base'

import * as echarts from 'echarts/core'

export class ExtendModel extends EchartsBaseModel {
  constructor(...args) {
    super(...args)
  }

  static async echart_run_report(myChart) {
    const url = '/data/asset/geo/Sicily_prehellenic_topographic_map.svg'
    const _rawData = await call_echarts_request(url)

    // console.log(_rawData)

    run(_rawData)
    function run(svg) {
      echarts.registerMap('sicily', { svg: svg })
      const option = {
        tooltip: {
          formatter: function (params) {
            console.log(params)
            return [
              params.name + ':',
              'xxxxxxxxxxxxxxxx',
              'xxxxxxxxxxxxxxxx',
              'xxxxxxxxxxxxxxxx'
            ].join('<br>')
          }
        },
        geo: [
          {
            map: 'sicily',
            roam: true,
            layoutCenter: ['50%', '50%'],
            layoutSize: '100%',
            selectedMode: 'single',
            tooltip: {
              show: true,
              confine: true,
              formatter: function (params) {
                return [
                  'This is the introduction:',
                  'xxxxxxxxxxxxxxxxxxxxx',
                  'xxxxxxxxxxxxxxxxxxxxx',
                  'xxxxxxxxxxxxxxxxxxxxx',
                  'xxxxxxxxxxxxxxxxxxxxx',
                  'xxxxxxxxxxxxxxxxxxxxx',
                  'xxxxxxxxxxxxxxxxxxxxx',
                  'xxxxxxxxxxxxxxxxxxxxx',
                  'xxxxxxxxxxxxxxxxxxxxx',
                  'xxxxxxxxxxxxxxxxxxxxx',
                  'xxxxxxxxxxxxxxxxxxxxx'
                ].join('<br>')
              }
            },
            itemStyle: {
              color: undefined
            },
            emphasis: {
              label: {
                show: false
              }
            },
            select: {
              itemStyle: {
                color: '#b50205'
              },
              label: {
                show: false
              }
            },
            regions: [
              {
                name: 'route1',
                itemStyle: {
                  borderWidth: 0
                },
                select: {
                  itemStyle: {
                    color: '#b5280d',
                    borderWidth: 0
                  }
                },
                tooltip: {
                  position: 'right',
                  alwaysShowContent: true,
                  enterable: true,
                  extraCssText: 'user-select: text',
                  formatter: [
                    'Route 1:',
                    'xxxxxxxxxxxxxxxxxxxxxxxxxxx',
                    'xxxxxxxxxxxxxxxxxxxxxxxxxxx',
                    'xxxxxxxxxxxxxxxxxxxxxxxxxxx',
                    'xxxxxxxxxxxxxxxxxxxxxxxxxxx',
                    'xxxxxxxxxxxxxxxxxxxxxxxxxxx'
                  ].join('<br>')
                }
              },
              {
                name: 'route2',
                itemStyle: {
                  borderWidth: 0
                },
                select: {
                  itemStyle: {
                    color: '#b5280d',
                    borderWidth: 0
                  }
                },
                tooltip: {
                  position: 'left',
                  alwaysShowContent: true,
                  enterable: true,
                  extraCssText: 'user-select: text',
                  formatter: [
                    'Route 2:',
                    'xxxxxxxxxxxxxx',
                    'xxxxxxxxxxxxxx',
                    'xxxxxxxxxxxxxx',
                    'xxxxxxxxxxxxxx',
                    'xxxxxxxxxxxxxx',
                    'xxxxxxxxxxxxxx',
                    'xxxxxxxxxxxxxx',
                    'xxxxxxxxxxxxxx'
                  ].join('<br>')
                }
              }
            ]
          }
        ],
        // -------------
        // Make buttons
        grid: {
          top: 10,
          left: 'center',
          width: 80,
          height: 20
        },
        xAxis: {
          axisLine: { show: false },
          splitLine: { show: false },
          axisLabel: { show: false },
          axisTick: { show: false }
        },
        yAxis: {
          axisLine: { show: false },
          splitLine: { show: false },
          axisLabel: { show: false },
          axisTick: { show: false }
        },
        series: {
          type: 'scatter',
          itemStyle: {},
          label: {
            show: true,
            borderColor: '#999',
            borderWidth: 1,
            borderRadius: 2,
            backgroundColor: '#fff',
            padding: [3, 5],
            fontSize: 18,
            opacity: 1,
            color: '#333'
          },
          encode: {
            label: 2
          },
          symbolSize: 0,
          tooltip: { show: false },
          selectedMode: 'single',
          select: {
            label: {
              color: '#fff',
              borderColor: '#555',
              backgroundColor: '#555'
            }
          },
          data: [
            [0, 0, 'route1'],
            [1, 0, 'route2']
          ]
        }
        // Make buttons end
        // -----------------
      }
      myChart.setOption(option)
      myChart.on('selectchanged', function (params) {
        if (!params.selected.length) {
          myChart.dispatchAction({
            type: 'hideTip'
          })
          myChart.dispatchAction({
            type: 'geoSelect',
            geoIndex: 0
            // Use no name to unselect.
          })
        } else {
          var btnDataIdx = params.selected[0].dataIndex[0]
          var name = option.series.data[btnDataIdx][2]
          myChart.dispatchAction({
            type: 'geoSelect',
            geoIndex: 0,
            name: name
          })
          myChart.dispatchAction({
            type: 'showTip',
            geoIndex: 0,
            name: name
          })
        }
      })
    }
  }

  static async echart_run_beef(myChart) {
    const url = '/data/asset/geo/Beef_cuts_France.svg'
    const _rawData = await call_echarts_request(url)
    // console.log(_rawData)

    run(_rawData)
    function run(svg) {
      echarts.registerMap('Beef_cuts_France', { svg: svg })
      const option = {
        tooltip: {},
        visualMap: {
          left: 'center',
          bottom: '10%',
          min: 5,
          max: 100,
          orient: 'horizontal',
          text: ['', 'Price'],
          realtime: true,
          calculable: true,
          inRange: {
            color: ['#dbac00', '#db6e00', '#cf0000']
          }
        },
        series: [
          {
            name: 'French Beef Cuts',
            type: 'map',
            map: 'Beef_cuts_France',
            roam: true,
            emphasis: {
              label: {
                show: false
              }
            },
            selectedMode: false,
            data: [
              { name: 'Queue', value: 15 },
              { name: 'Langue', value: 35 },
              { name: 'Plat de joue', value: 15 },
              { name: 'Gros bout de poitrine', value: 25 },
              { name: 'Jumeau à pot-au-feu', value: 45 },
              { name: 'Onglet', value: 85 },
              { name: 'Plat de tranche', value: 25 },
              { name: 'Araignée', value: 15 },
              { name: 'Gîte à la noix', value: 55 },
              { name: "Bavette d'aloyau", value: 25 },
              { name: 'Tende de tranche', value: 65 },
              { name: 'Rond de gîte', value: 45 },
              { name: 'Bavettede de flanchet', value: 85 },
              { name: 'Flanchet', value: 35 },
              { name: 'Hampe', value: 75 },
              { name: 'Plat de côtes', value: 65 },
              { name: 'Tendron Milieu de poitrine', value: 65 },
              { name: 'Macreuse à pot-au-feu', value: 85 },
              { name: 'Rumsteck', value: 75 },
              { name: 'Faux-filet', value: 65 },
              { name: 'Côtes Entrecôtes', value: 55 },
              { name: 'Basses côtes', value: 45 },
              { name: 'Collier', value: 85 },
              { name: 'Jumeau à biftek', value: 15 },
              { name: 'Paleron', value: 65 },
              { name: 'Macreuse à bifteck', value: 45 },
              { name: 'Gîte', value: 85 },
              { name: 'Aiguillette baronne', value: 65 },
              { name: 'Filet', value: 95 }
            ]
          }
        ]
      }
      myChart.setOption(option)
    }
  }

  static async echart_run_organ(myChart) {
    const url = '/data/asset/geo/Veins_Medical_Diagram_clip_art.svg'
    const _rawData = await call_echarts_request(url)
    // console.log(_rawData)

    run(_rawData)
    function run(svg) {
      echarts.registerMap('organ_diagram', { svg: svg })
      const option = {
        tooltip: {},
        geo: {
          left: 10,
          right: '50%',
          map: 'organ_diagram',
          selectedMode: 'multiple',
          emphasis: {
            focus: 'self',
            itemStyle: {
              color: null
            },
            label: {
              position: 'bottom',
              distance: 0,
              textBorderColor: '#fff',
              textBorderWidth: 2
            }
          },
          blur: {},
          select: {
            itemStyle: {
              color: '#b50205'
            },
            label: {
              show: false,
              textBorderColor: '#fff',
              textBorderWidth: 2
            }
          }
        },
        grid: {
          left: '60%',
          top: '20%',
          bottom: '20%'
        },
        xAxis: {},
        yAxis: {
          data: [
            'heart',
            'large-intestine',
            'small-intestine',
            'spleen',
            'kidney',
            'lung',
            'liver'
          ]
        },
        series: [
          {
            type: 'bar',
            emphasis: {
              focus: 'self'
            },
            data: [121, 321, 141, 52, 198, 289, 139]
          }
        ]
      }
      myChart.setOption(option)
      myChart.on('mouseover', { seriesIndex: 0 }, function (event) {
        myChart.dispatchAction({
          type: 'highlight',
          geoIndex: 0,
          name: event.name
        })
      })
      myChart.on('mouseout', { seriesIndex: 0 }, function (event) {
        myChart.dispatchAction({
          type: 'downplay',
          geoIndex: 0,
          name: event.name
        })
      })
    }
  }

  static async echart_run_flight(myChart) {
    const url = '/data/asset/geo/flight-seats.svg'
    const _rawData = await call_echarts_request(url)
    // console.log(_rawData)

    run(_rawData)
    function run(svg) {
      echarts.registerMap('flight-seats', { svg: svg })
      const takenSeatNames = ['26E', '26D', '26C', '25D', '23C', '21A', '20F']
      const option = {
        tooltip: {},
        geo: {
          map: 'flight-seats',
          roam: true,
          selectedMode: 'multiple',
          layoutCenter: ['50%', '50%'],
          layoutSize: '95%',
          tooltip: {
            show: true
          },
          itemStyle: {
            color: '#fff'
          },
          emphasis: {
            itemStyle: {
              color: undefined,
              borderColor: 'green',
              borderWidth: 2
            },
            label: {
              show: false
            }
          },
          select: {
            itemStyle: {
              color: 'green'
            },
            label: {
              show: false,
              textBorderColor: '#fff',
              textBorderWidth: 2
            }
          },
          regions: makeTakenRegions(takenSeatNames)
        }
      }
      function makeTakenRegions(takenSeatNames) {
        var regions = []
        for (var i = 0; i < takenSeatNames.length; i++) {
          regions.push({
            name: takenSeatNames[i],
            silent: true,
            itemStyle: {
              color: '#bf0e08'
            },
            emphasis: {
              itemStyle: {
                borderColor: '#aaa',
                borderWidth: 1
              }
            },
            select: {
              itemStyle: {
                color: '#bf0e08'
              }
            }
          })
        }
        return regions
      }
      myChart.setOption(option)
      // Get selected seats.
      myChart.on('geoselectchanged', function (params) {
        const selectedNames = params.allSelected[0].name.slice()
        // Remove taken seats.
        for (var i = selectedNames.length - 1; i >= 0; i--) {
          if (takenSeatNames.indexOf(selectedNames[i]) >= 0) {
            selectedNames.splice(i, 1)
          }
        }
        console.log('selected', selectedNames)
      })
    }
  }

  static async echart_run_route(myChart) {
    const url = '/data/asset/geo/MacOdrum-LV5-floorplan-web.svg'
    const _rawData = await call_echarts_request(url)
    // console.log(_rawData)

    run(_rawData)
    function run(svg) {
      echarts.registerMap('MacOdrum-LV5-floorplan-web', { svg: svg })
      const option = {
        title: {
          text: 'Visit Route',
          left: 'center',
          bottom: 10
        },
        tooltip: {},
        geo: {
          map: 'MacOdrum-LV5-floorplan-web',
          roam: true,
          emphasis: {
            itemStyle: {
              color: undefined
            },
            label: {
              show: false
            }
          }
        },
        series: [
          {
            name: 'Route',
            type: 'lines',
            coordinateSystem: 'geo',
            geoIndex: 0,
            emphasis: {
              label: {
                show: false
              }
            },
            polyline: true,
            lineStyle: {
              color: '#c46e54',
              width: 5,
              opacity: 1,
              type: 'dotted'
            },
            effect: {
              show: true,
              period: 8,
              color: '#a10000',
              constantSpeed: 80,
              trailLength: 0,
              symbolSize: [20, 12],
              symbol:
                'path://M35.5 40.5c0-22.16 17.84-40 40-40s40 17.84 40 40c0 1.6939-.1042 3.3626-.3067 5H35.8067c-.2025-1.6374-.3067-3.3061-.3067-5zm90.9621-2.6663c-.62-1.4856-.9621-3.1182-.9621-4.8337 0-6.925 5.575-12.5 12.5-12.5s12.5 5.575 12.5 12.5a12.685 12.685 0 0 1-.1529 1.9691l.9537.5506-15.6454 27.0986-.1554-.0897V65.5h-28.7285c-7.318 9.1548-18.587 15-31.2715 15s-23.9535-5.8452-31.2715-15H15.5v-2.8059l-.0937.0437-8.8727-19.0274C2.912 41.5258.5 37.5549.5 33c0-6.925 5.575-12.5 12.5-12.5S25.5 26.075 25.5 33c0 .9035-.0949 1.784-.2753 2.6321L29.8262 45.5h92.2098z'
            },
            data: [
              {
                coords: [
                  [110.6189462165178, 456.64349563895087],
                  [124.10988522879458, 450.8570048730469],
                  [123.9272226116071, 389.9520693708147],
                  [61.58708083147317, 386.87942320312504],
                  [61.58708083147317, 72.8954315876116],
                  [258.29514854771196, 72.8954315876116],
                  [260.75457021484374, 336.8559607533482],
                  [280.5277985253906, 410.2406672084263],
                  [275.948185765904, 528.0254369698661],
                  [111.06907909458701, 552.795792593471],
                  [118.87138231445309, 701.365737015904],
                  [221.36468155133926, 758.7870354617745],
                  [307.86195445452006, 742.164737297712],
                  [366.8489324762834, 560.9895157073103],
                  [492.8750778390066, 560.9895157073103],
                  [492.8750778390066, 827.9639780566406],
                  [294.9255269587053, 827.9639780566406],
                  [282.79803391043527, 868.2476088113839]
                ]
              }
            ]
          }
        ]
      }
      myChart.setOption(option)
    }
  }

  static async echart_run_iceland(myChart) {
    const url = '/data/asset/geo/Map_of_Iceland.svg'
    const _rawData = await call_echarts_request(url)
    // console.log(_rawData)

    run(_rawData)
    function run(svg) {
      echarts.registerMap('iceland_svg', { svg: svg })
      const option = {
        tooltip: {},
        geo: {
          tooltip: {
            show: true
          },
          map: 'iceland_svg',
          roam: true
        },
        series: {
          type: 'effectScatter',
          coordinateSystem: 'geo',
          geoIndex: 0,
          symbolSize: function (params) {
            return (params[2] / 100) * 15 + 5
          },
          itemStyle: {
            color: '#b02a02'
          },
          encode: {
            tooltip: 2
          },
          data: [
            [488.2358421078053, 459.70913833075736, 100],
            [770.3415644319939, 757.9672194986475, 30],
            [1180.0329284196291, 743.6141808346214, 80],
            [894.03790632245, 1188.1985153835008, 61],
            [1372.98925630313, 477.3839988649537, 70],
            [1378.62251255796, 935.6708486282843, 81]
          ]
        }
      }
      myChart.setOption(option)
      myChart.getZr().on('click', function (params) {
        var pixelPoint = [params.offsetX, params.offsetY]
        var dataPoint = myChart.convertFromPixel({ geoIndex: 0 }, pixelPoint)
        console.log(dataPoint)
      })
    }
  }

  static async echart_run_traffic(myChart) {
    const url = '/data/asset/geo/ksia-ext-plan-min.svg'
    const _rawData = await call_echarts_request(url)

    // console.log(_rawData)

    run(_rawData)
    function run(svg) {
      echarts.registerMap('ksia-ext-plan', { svg: svg })
      const option = {
        tooltip: {},
        geo: {
          map: 'ksia-ext-plan',
          roam: true,
          layoutCenter: ['50%', '50%'],
          layoutSize: '100%'
        },
        series: [
          {
            name: 'Route',
            type: 'lines',
            coordinateSystem: 'geo',
            geoIndex: 0,
            emphasis: {
              label: {
                show: false
              }
            },
            polyline: true,
            lineStyle: {
              color: '#c46e54',
              width: 0
            },
            effect: {
              show: true,
              period: 8,
              color: '#a10000',
              // constantSpeed: 80,
              trailLength: 0,
              symbolSize: [12, 30],
              symbol:
                'path://M87.1667 3.8333L80.5.5h-60l-6.6667 3.3333L.5 70.5v130l10 10h80l10 -10v-130zM15.5 190.5l15 -20h40l15 20zm75 -65l-15 5v35l15 15zm-80 0l15 5v35l-15 15zm65 0l15 -5v-40l-15 20zm-50 0l-15 -5v-40l15 20zm 65,-55 -15,25 c -15,-5 -35,-5 -50,0 l -15,-25 c 25,-15 55,-15 80,0 z'
            },
            z: 100,
            data: [
              {
                effect: {
                  color: '#a10000',
                  constantSpeed: 100,
                  delay: 0
                },
                coords: [
                  [50.875133928571415, 242.66287667410717],
                  [62.03696428571425, 264.482421875],
                  [72.63357421874997, 273.62779017857144],
                  [92.78291852678569, 285.869140625],
                  [113.43637834821425, 287.21854073660717],
                  [141.44788783482142, 288.92947823660717],
                  [191.71686104910714, 289.5507114955357],
                  [198.3060072544643, 294.0673828125],
                  [204.99699497767858, 304.60288783482144],
                  [210.79177734375003, 316.7373046875],
                  [212.45179408482142, 329.3656529017857],
                  [210.8885267857143, 443.3925083705358],
                  [215.35936941964286, 453.00634765625],
                  [224.38761997767858, 452.15087890625],
                  [265.71490792410714, 452.20179966517856],
                  [493.3408844866072, 453.77525111607144],
                  [572.8892940848216, 448.77992466517856],
                  [608.9513755580358, 448.43366350446433],
                  [619.99099609375, 450.8778599330358],
                  [624.2479715401787, 456.2194475446429],
                  [628.1434095982145, 463.9899553571429],
                  [629.8492550223216, 476.0276227678571],
                  [631.2750362723216, 535.7322126116071],
                  [624.6757059151787, 546.6496233258929],
                  [617.1801702008929, 552.6480887276786],
                  [603.7269056919645, 554.5066964285714],
                  [588.0178515625, 557.5517578125],
                  [529.4386104910716, 556.2991071428571],
                  [422.1994921875001, 551.38525390625],
                  [291.66921875, 552.5767996651786],
                  [219.4279380580357, 547.4949079241071],
                  [209.53912667410714, 541.5931919642858],
                  [206.70793247767858, 526.1947544642858],
                  [206.70793247767858, 507.4049944196429],
                  [206.12234375000003, 468.7663225446429],
                  [204.48778738839286, 459.44782366071433],
                  [197.56256417410714, 452.8943219866071],
                  [170.31995814732142, 456.27546037946433],
                  [1.8078906249999704, 460.5935407366071]
                ]
              },
              {
                effect: {
                  color: '#00067d',
                  constantSpeed: 80,
                  delay: 0
                },
                coords: [
                  [779.4595368303574, 287.98744419642856],
                  [689.07009765625, 291.0477818080357],
                  [301.83300223214286, 290.49783761160717],
                  [229.31165736607142, 291.73011997767856],
                  [220.73660156250003, 297.4077845982143],
                  [214.74832031250003, 308.52378627232144],
                  [213.82156250000003, 421.35400390625],
                  [213.19523716517858, 443.0564313616071],
                  [222.31005301339286, 455.95465959821433],
                  [271.71846540178575, 454.37611607142856],
                  [359.64843191964286, 455.9393833705358],
                  [580.2524358258929, 448.11286272321433],
                  [627.7156752232145, 460.7463030133929],
                  [632.3290959821429, 536.6386021205358],
                  [628.9123130580358, 548.4776785714286],
                  [612.5667494419645, 556.8235909598214],
                  [543.7167912946429, 555.4741908482143],
                  [429.1756361607143, 551.9402901785714],
                  [293.42089285714286, 551.2172154017858],
                  [226.20039899553575, 556.0699637276786],
                  [215.49176339285714, 562.7253069196429],
                  [213.21051339285714, 591.6024693080358],
                  [212.00878348214286, 625.6735491071429],
                  [197.43017020089286, 645.0743582589286],
                  [187.41405691964286, 647.0857282366071],
                  [101.79589285714286, 649.0207170758929],
                  [69.96023437499997, 650.1613420758929],
                  [56.48150948660714, 656.8268694196429],
                  [51.11446149553569, 665.2542550223214]
                ]
              },
              {
                effect: {
                  color: '#997405',
                  constantSpeed: 60,
                  delay: 0
                },
                coords: [
                  [2.5920703124999704, 450.66908482142856],
                  [204.0651450892857, 453.13364955357144],
                  [378.72844029017864, 453.13874162946433],
                  [551.1817745535716, 456.1532505580358],
                  [578.3734598214287, 456.91196986607144],
                  [601.2317885044645, 458.9895368303571],
                  [614.1503850446429, 462.1669921875],
                  [618.99294921875, 479.68882533482144],
                  [620.0826534598216, 513.5969587053571],
                  [615.6932840401787, 528.7306082589286],
                  [608.4829045758929, 533.2625558035714],
                  [592.7127455357145, 534.9582170758929],
                  [583.09890625, 527.5492466517858],
                  [578.6535239955358, 516.4077845982143],
                  [578.6535239955358, 498.36146763392856],
                  [577.9966462053571, 477.0613141741071],
                  [575.3691350446429, 469.1940569196429],
                  [569.0753292410716, 462.63037109375],
                  [553.9518638392858, 460.6444614955358],
                  [298.10051060267864, 465.61432756696433],
                  [193.49908761160714, 460.1759905133929],
                  [116.40505859374997, 465.78236607142856],
                  [3.5137360491071092, 463.47565569196433]
                ]
              }
            ]
          }
        ]
      }
      myChart.setOption(option)
    }
  }

  static async echart_run_hk(myChart) {
    const url = '/data/asset/geo/HK.json'
    const _rawData = await call_echarts_request(url)
    // console.log(_rawData)

    run(_rawData)
    function run(geoJson) {
      myChart.hideLoading()
      echarts.registerMap('HK', geoJson)
      myChart.setOption({
        title: {
          text: 'Population Density of Hong Kong （2011）',
          subtext: 'Data from Wikipedia',
          sublink:
            'http://zh.wikipedia.org/wiki/%E9%A6%99%E6%B8%AF%E8%A1%8C%E6%94%BF%E5%8D%80%E5%8A%83#cite_note-12'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c} (p / km2)'
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        visualMap: {
          min: 800,
          max: 50000,
          text: ['High', 'Low'],
          realtime: false,
          calculable: true,
          inRange: {
            color: ['lightskyblue', 'yellow', 'orangered']
          }
        },
        series: [
          {
            name: '香港18区人口密度',
            type: 'map',
            map: 'HK',
            label: {
              show: true
            },
            data: [
              { name: '中西区', value: 20057.34 },
              { name: '湾仔', value: 15477.48 },
              { name: '东区', value: 31686.1 },
              { name: '南区', value: 6992.6 },
              { name: '油尖旺', value: 44045.49 },
              { name: '深水埗', value: 40689.64 },
              { name: '九龙城', value: 37659.78 },
              { name: '黄大仙', value: 45180.97 },
              { name: '观塘', value: 55204.26 },
              { name: '葵青', value: 21900.9 },
              { name: '荃湾', value: 4918.26 },
              { name: '屯门', value: 5881.84 },
              { name: '元朗', value: 4178.01 },
              { name: '北区', value: 2227.92 },
              { name: '大埔', value: 2180.98 },
              { name: '沙田', value: 9172.94 },
              { name: '西贡', value: 3368 },
              { name: '离岛', value: 806.98 }
            ],
            // 自定义名称映射
            nameMap: {
              'Central and Western': '中西区',
              Eastern: '东区',
              Islands: '离岛',
              'Kowloon City': '九龙城',
              'Kwai Tsing': '葵青',
              'Kwun Tong': '观塘',
              North: '北区',
              'Sai Kung': '西贡',
              'Sha Tin': '沙田',
              'Sham Shui Po': '深水埗',
              Southern: '南区',
              'Tai Po': '大埔',
              'Tsuen Wan': '荃湾',
              'Tuen Mun': '屯门',
              'Wan Chai': '湾仔',
              'Wong Tai Sin': '黄大仙',
              'Yau Tsim Mong': '油尖旺',
              'Yuen Long': '元朗'
            }
          }
        ]
      })
    }
  }

  static async echart_run_usa(myChart) {
    const url = '/data/asset/geo/USA.json'
    const _rawData = await call_echarts_request(url)
    // console.log(_rawData)

    run(_rawData)
    function run(usaJson) {
      myChart.hideLoading()
      echarts.registerMap('USA', usaJson, {
        Alaska: {
          left: -131,
          top: 25,
          width: 15
        },
        Hawaii: {
          left: -110,
          top: 28,
          width: 5
        },
        'Puerto Rico': {
          left: -76,
          top: 26,
          width: 2
        }
      })
      const option = {
        title: {
          text: 'USA Population Estimates (2012)',
          subtext: 'Data from www.census.gov',
          sublink: 'http://www.census.gov/popest/data/datasets.html',
          left: 'right'
        },
        tooltip: {
          trigger: 'item',
          showDelay: 0,
          transitionDuration: 0.2
        },
        visualMap: {
          left: 'right',
          min: 500000,
          max: 38000000,
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
          },
          text: ['High', 'Low'],
          calculable: true
        },
        toolbox: {
          show: true,
          //orient: 'vertical',
          left: 'left',
          top: 'top',
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: 'USA PopEstimates',
            type: 'map',
            roam: true,
            map: 'USA',
            emphasis: {
              label: {
                show: true
              }
            },
            data: [
              { name: 'Alabama', value: 4822023 },
              { name: 'Alaska', value: 731449 },
              { name: 'Arizona', value: 6553255 },
              { name: 'Arkansas', value: 2949131 },
              { name: 'California', value: 38041430 },
              { name: 'Colorado', value: 5187582 },
              { name: 'Connecticut', value: 3590347 },
              { name: 'Delaware', value: 917092 },
              { name: 'District of Columbia', value: 632323 },
              { name: 'Florida', value: 19317568 },
              { name: 'Georgia', value: 9919945 },
              { name: 'Hawaii', value: 1392313 },
              { name: 'Idaho', value: 1595728 },
              { name: 'Illinois', value: 12875255 },
              { name: 'Indiana', value: 6537334 },
              { name: 'Iowa', value: 3074186 },
              { name: 'Kansas', value: 2885905 },
              { name: 'Kentucky', value: 4380415 },
              { name: 'Louisiana', value: 4601893 },
              { name: 'Maine', value: 1329192 },
              { name: 'Maryland', value: 5884563 },
              { name: 'Massachusetts', value: 6646144 },
              { name: 'Michigan', value: 9883360 },
              { name: 'Minnesota', value: 5379139 },
              { name: 'Mississippi', value: 2984926 },
              { name: 'Missouri', value: 6021988 },
              { name: 'Montana', value: 1005141 },
              { name: 'Nebraska', value: 1855525 },
              { name: 'Nevada', value: 2758931 },
              { name: 'New Hampshire', value: 1320718 },
              { name: 'New Jersey', value: 8864590 },
              { name: 'New Mexico', value: 2085538 },
              { name: 'New York', value: 19570261 },
              { name: 'North Carolina', value: 9752073 },
              { name: 'North Dakota', value: 699628 },
              { name: 'Ohio', value: 11544225 },
              { name: 'Oklahoma', value: 3814820 },
              { name: 'Oregon', value: 3899353 },
              { name: 'Pennsylvania', value: 12763536 },
              { name: 'Rhode Island', value: 1050292 },
              { name: 'South Carolina', value: 4723723 },
              { name: 'South Dakota', value: 833354 },
              { name: 'Tennessee', value: 6456243 },
              { name: 'Texas', value: 26059203 },
              { name: 'Utah', value: 2855287 },
              { name: 'Vermont', value: 626011 },
              { name: 'Virginia', value: 8185867 },
              { name: 'Washington', value: 6897012 },
              { name: 'West Virginia', value: 1855413 },
              { name: 'Wisconsin', value: 5726398 },
              { name: 'Wyoming', value: 576412 },
              { name: 'Puerto Rico', value: 3667084 }
            ]
          }
        ]
      }
      myChart.setOption(option)
    }
  }
}

const AddonsModels = {
  'odoojs.echarts.geo': ExtendModel
}

export default AddonsModels
