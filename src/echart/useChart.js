import { nextTick, onMounted, onUnmounted, unref } from 'vue'

import echarts from './lib'
import { SVGRenderer, CanvasRenderer } from 'echarts/renderers'

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
  render = RenderType.SVGRenderer,
  theme = ThemeType.Default
) {
  // 渲染模式
  echarts.use(render === RenderType.SVGRenderer ? SVGRenderer : CanvasRenderer)
  // echart实例
  let chartInstance = null

  // 初始化echart
  const initCharts = () => {
    const el = unref(elRef)
    if (!el || !unref(el)) {
      return
    }
    chartInstance = echarts.init(el, theme)
  }

  // 更新/设置配置
  const setOption = option => {
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
    console.log('showLoading, ', chartInstance)
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

  function setDataOption({ data, title, header, type }) {
    const options = {}

    setOption(options)
  }

  return { setOption, getInstance, showLoading, hideLoading }
}
