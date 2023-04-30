import { nextTick, onMounted, onUnmounted, unref, ref } from 'vue'

import echarts from './lib'
import { SVGRenderer, CanvasRenderer } from 'echarts/renderers'

import api from '@/odoorpc'

function sleep(millisecond) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, millisecond)
  })
}

async function getOption(modelreport) {
  const option = await getOptionRaw(modelreport)
  return {
    ...option,
    dataset: { dimensions: [], source: [] }
  }
}
async function getOptionRaw(modelreport) {
  await sleep(100)
  if (!modelreport || modelreport === 'odoojs.echarts,demo') {
    return { ...option_normal }
  } else {
    const [model, report] = modelreport.split(',')
    return api.env.model(model).get_echart_option(report)
  }
}

async function getDataset(modelreport) {
  await sleep(100)
  if (!modelreport || modelreport === 'odoojs.echarts,demo') {
    return getDataset_normal()
  }
  const [model, report] = modelreport.split(',')

  return api.env.model(model).get_echart_data(report)
}

export const RenderType = {
  SVGRenderer: 'SVGRenderer',
  CanvasRenderer: 'SVGRenderer'
}

export const ThemeType = {
  Light: 'light',
  Dark: 'dark',
  Default: 'default'
}

export default function useChart(
  elRef,
  autoChartSize = false,
  animation = false,
  render = RenderType.SVGRenderer
) {
  const optionRef = ref({})
  const themeRef = ref(ThemeType.Default)

  // 渲染模式
  echarts.use(render === RenderType.SVGRenderer ? SVGRenderer : CanvasRenderer)
  // echart实例
  let chartInstance = null

  // 初始化echart
  function initCharts() {
    const el = unref(elRef)
    if (!el || !unref(el)) {
      return
    }
    chartInstance = echarts.init(el, themeRef.value)
  }

  function setBarRace(option, dataset) {
    function sleep_delay(millisecond) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve()
        }, millisecond)
      })
    }

    const { dimensions, source: dataSource } = dataset

    const delay = option.odoojs_echarts_type.delay
    const [fix_dimesion, measure, dynamic_dimesion] = dimensions

    const dynamic_datas = dataSource.reduce((acc, one) => {
      if (!acc.includes(one[dynamic_dimesion])) {
        acc.push(one[dynamic_dimesion])
      }
      return acc
    }, [])

    dynamic_datas.sort()

    async function run() {
      for (const filter_val of dynamic_datas) {
        const dataSource_one = dataSource.reduce((acc, one) => {
          if (one[dynamic_dimesion] <= filter_val) {
            const old = acc.find(
              item => item[fix_dimesion] === one[fix_dimesion]
            )

            if (old) {
              old[measure] += one[measure]
            } else {
              acc.push({
                [fix_dimesion]: one[fix_dimesion],
                [measure]: one[measure]
              })
            }
          }

          return acc
        }, [])

        optionRef.value.series[0].name = filter_val

        const dataset2 = {
          dimensions: [fix_dimesion, measure],
          source: dataSource_one
        }

        await sleep_delay(delay)

        setDataset(dataset2)
      }
    }

    setOption(option)
    run()
  }

  function setWaterfall(option, dataset) {
    // const { dimensions, source: dataSource } = dataset
    // const [fix_dimesion, measure] = dimensions
    // let sum = 0
    // const dataSource2 = dataSource.reduce((acc, item, index) => {
    //   const amount = item[measure]
    //   function get_help() {
    //     if (!index) {
    //       return 0
    //     } else {
    //       sum += dataSource[index - 1][measure]
    //       if (amount < 0) {
    //         return sum + amount
    //       } else {
    //         return sum
    //       }
    //     }
    //   }
    //   acc.push({
    //     [fix_dimesion]: item[fix_dimesion],
    //     help: get_help(),
    //     positive: amount >= 0 ? amount : '-',
    //     negative: amount < 0 ? -amount : '-'
    //   })
    //   return acc
    // }, [])
    // // console.log(dataSource, dataSource2)
    // const dataset2 = {
    //   dimensions: [fix_dimesion, 'help', 'positive', 'negative'],
    //   source: dataSource2
    // }
    setOption(option)
    setDataset(dataset)

    console.log(option, dataset)
  }

  function setOdoojsEcharts(option, dataset) {
    const odoojs_echarts_type = option.odoojs_echarts_type
    const type_name =
      typeof odoojs_echarts_type === 'string'
        ? odoojs_echarts_type
        : odoojs_echarts_type.name

    const maps = {
      bar_race: setBarRace,
      waterfall: setWaterfall
    }

    return maps[type_name](option, dataset)
  }

  async function resetEcharts(modelreport) {
    console.log(modelreport)

    if (chartInstance) {
      chartInstance.dispose()
    }

    initCharts()
    showLoading()

    const option = await getOption(modelreport)
    const dataset = await getDataset(modelreport)

    if (option.odoojs_echarts_type) {
      setOdoojsEcharts(option, dataset)
    } else {
      setOption(option)
      setDataset(dataset)
    }
  }

  function setTheme(theme) {
    themeRef.value = theme
    console.log(theme)

    chartInstance.dispose()
    initCharts()

    const options = optionRef.value
    setOption(options)

    // initCharts()
  }

  function setDataset(dataset) {
    const options = optionRef.value
    const options2 = { ...options, dataset }

    setOption(options2)
    hideLoading()
  }

  // 更新/设置配置
  function setOption(option) {
    optionRef.value = { ...option }
    nextTick(() => {
      if (!chartInstance) {
        initCharts()
        if (!chartInstance) return
      }

      chartInstance.setOption(option)
      // hideLoading()
    })
  }

  // 获取echart实例
  function getInstance() {
    if (!chartInstance) {
      initCharts()
    }
    return chartInstance
  }

  // 更新大小
  function resize() {
    chartInstance?.resize()
  }

  // 监听元素大小
  function watchEl() {
    // 给元素添加过渡
    if (animation) {
      elRef.value.style.transition = 'width 1s, height 1s'
    }
    // eslint-disable-next-line no-unused-vars
    const resizeObserver = new ResizeObserver(entries => resize())
    resizeObserver.observe(elRef.value)
  }

  // 显示加载状
  function showLoading() {
    if (!chartInstance) {
      initCharts()
    }
    chartInstance?.showLoading()
  }
  // 显示加载状
  function hideLoading() {
    if (!chartInstance) {
      initCharts()
    }
    chartInstance?.hideLoading()
  }

  onMounted(() => {
    window.addEventListener('resize', resize)
    if (autoChartSize) watchEl()
  })

  onUnmounted(() => {
    window.removeEventListener('resize', resize)
  })

  return {
    setTheme,
    resetEcharts,

    setOption,
    getInstance,
    showLoading,
    hideLoading,
    setDataset
  }
}

function randInt() {
  return Math.floor(Math.random() * 1000 + 1)
}

const option_normal = {
  title: {
    text: 'ECharts 入门示例'
  },
  tooltip: {},
  // dataset: {
  //   dimensions: [],
  //   source: []
  // },
  xAxis: { type: 'category' },
  yAxis: {},
  series: [
    { name: 'Amount', type: 'bar', stack: 'x' },
    { name: 'Tax', type: 'bar', stack: 'x' },
    { name: 'Total', type: 'bar' }
  ]
}

async function getDataset_normal() {
  // dimensions: ['product', 'amount', 'tax', 'total'],
  // source: []

  const source = [
    {
      product: 'Matcha Latte',
      amount: randInt(),
      tax: randInt(),
      total: randInt()
    },
    {
      product: 'Milk Tea',
      amount: randInt(),
      tax: randInt(),
      total: randInt()
    },
    {
      product: 'Cheese Cocoa',
      amount: randInt(),
      tax: randInt(),
      total: randInt()
    },
    {
      product: 'Walnut Brownie',
      amount: randInt(),
      tax: randInt(),
      total: randInt()
    }
  ]

  return {
    dimensions: ['product', 'amount', 'tax', 'total'],
    source
  }
}
