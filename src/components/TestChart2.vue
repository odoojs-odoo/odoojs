<template>
  <div>
    <span> set theme </span>

    <a-radio-group
      v-model:value="themeRef"
      option-type="button"
      :options="[ThemeType.Dark, ThemeType.Light, ThemeType.Default]"
      @change="onChangeTheme"
    />
  </div>

  <div>
    <span> change report </span>

    <a-radio-group
      v-model:value="reportRef"
      option-type="button"
      :options="[
        { label: 'Default Demo', value: undefined },
        { label: 'SO Report', value: 'sale.order,report' },
        { label: 'SO Rank', value: 'sale.order,rank' }
      ]"
      @change="onChangeReport"
    />
  </div>

  <div ref="chartEl" :style="{ width: `600px`, height: `300px` }"></div>
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue'
import useChart, { RenderType, ThemeType } from '@/echart/useChart'

const chartEl = ref()
const useChartData = useChart(chartEl, true, true, RenderType.SVGRenderer)
const { resetEcharts, setTheme } = useChartData

const themeRef = ref(ThemeType.Default)
const reportRef = ref()

function onChangeTheme() {
  setTheme(themeRef.value)
}

async function onChangeReport() {
  resetEcharts(reportRef.value)
  // onChangeOption()
}

onMounted(() => {
  nextTick(async () => {
    onChangeReport()
  })
})
</script>
