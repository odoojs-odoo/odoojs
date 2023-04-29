<template>
  <div>
    <div>
      <span> Set theme </span>
      <a-radio-group
        v-model:value="themeRef"
        option-type="button"
        :options="[ThemeType.Dark, ThemeType.Light, ThemeType.Default]"
        @change="onChangeTheme"
      />
    </div>

    <a-button @click="onReset"> reset </a-button>
    <div ref="chartEl" :style="{ width: `600px`, height: `300px` }"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, nextTick, toRaw } from 'vue'
import useChart, { RenderType, ThemeType } from '@/echart/useChart'

const props = defineProps(['report'])

const chartEl = ref()
const useChartData = useChart(chartEl, true, true, RenderType.SVGRenderer)
const { resetEcharts, setTheme } = useChartData
const themeRef = ref(ThemeType.Default)
function onChangeTheme() {
  setTheme(themeRef.value)
}
function onReset() {
  resetEcharts(toRaw(props.report))
}
onMounted(() => {
  nextTick(async () => {
    resetEcharts(toRaw(props.report))
  })
})
</script>

<style type="text/css"></style>
