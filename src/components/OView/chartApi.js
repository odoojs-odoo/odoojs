import { watch, computed, reactive, ref, unref } from 'vue'
import api from '@/odoorpc'
import { useLang } from '@/components/useApi/useLang'

import echarts from '@/echart/lib'

// import useChart, { RenderType, ThemeType } from '@/echart/useChart'

function sleep(millisecond) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, millisecond)
  })
}

export function useChartView(props, ctx) {
  const { lang } = useLang()

  // const useChartData = useChart(ctx.chartEl, true, true, RenderType.SVGRenderer)
  // const { resetEcharts, setTheme } = useChartData

  // watch actionId
  watch(
    () => props.actionId,
    async newVal => {
      console.log(newVal)
      const chartview = api.env.chartview(newVal)
      await sleep(100)
      const el = unref(ctx.chartEl)
      const chartInstance = echarts.init(el)
      await chartview.echart_run(chartInstance)
    },
    { immediate: true }
  )

  return { lang }
}
