import { nextTick, onMounted, onUnmounted, unref, ref, toRaw } from 'vue'

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
  if (!modelreport) {
    return { ...option_normal }
  }

  const [model, report] = modelreport.split(',')
  return api.env.model(model).get_echart_option(report)
}

async function getDataSource(modelreport) {
  if (!modelreport) {
    return getDataSource_normal()
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
  const timers = ref([])

  // 初始化echart
  function initCharts() {
    const el = unref(elRef)
    if (!el || !unref(el)) {
      return
    }
    chartInstance = echarts.init(el, themeRef.value)
  }

  async function resetEcharts(modelreport) {
    timers.value.forEach(item => {
      clearInterval(item)
    })

    timers.value = []

    const currentValue = ref(0)

    function update(records, dynamic, dynamic_datas) {
      const fix_dimesion = dynamic.fix_dimesion
      const dynamic_dimesion = dynamic.dynamic_dimesion
      const measure = dynamic.measure

      if (dynamic_datas.length > currentValue.value) {
        const filter_val = dynamic_datas[currentValue.value]
        currentValue.value += 1

        // console.log('1', filter_val, currentValue.value)

        const dataSource_one = records.reduce((acc, one) => {
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

        // console.log(currentValue.value, filter_val, toRaw(optionRef.value))

        optionRef.value.series[0].name = filter_val
        setDataSource(dataSource_one)
      }
    }

    const option = await getOption(modelreport)

    if (chartInstance) {
      chartInstance.dispose()
    }

    initCharts()
    showLoading()

    setOption(option)
    sleep(2000)

    const dataSource = await getDataSource(modelreport)

    if (!option.odoojs_config) {
      setDataSource(dataSource)
    } else if (!option.odoojs_config.dynamic) {
      setDataSource(dataSource)
    } else {
      const dynamic = option.odoojs_config.dynamic
      const dynamic_dimesion = dynamic.dynamic_dimesion
      const dynamic_datas = dataSource.reduce((acc, one) => {
        if (!acc.includes(one[dynamic_dimesion])) {
          acc.push(one[dynamic_dimesion])
        }
        return acc
      }, [])

      dynamic_datas.sort()

      const timer = setInterval(function () {
        console.log('1')
        update(dataSource, dynamic, dynamic_datas)
      }, 300)

      timers.value.push(timer)
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

  function setDataSource(dataSource) {
    const options = optionRef.value

    const options2 = {
      ...options,
      dataset: {
        ...options.dataset,
        source: [...dataSource]
      }
    }

    setOption(options2)
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
      hideLoading()
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
    setDataSource
  }
}

function randInt() {
  return Math.floor(Math.random() * 1000 + 1)
}

const option_normal = {
  odoojs_config: {
    a: 1
  },
  title: {
    text: 'ECharts 入门示例'
  },
  tooltip: {},
  dataset: {
    dimensions: ['product', 'amount', 'tax', 'total'],
    source: []
  },
  xAxis: { type: 'category' },
  yAxis: {},
  series: [
    { name: 'Amount', type: 'bar', stack: 'x' },
    { name: 'Tax', type: 'bar', stack: 'x' },
    { name: 'Total', type: 'bar' }
  ]
}

async function getDataSource_normal() {
  return [
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
}
