<template>
  <div>
    <span> Set theme </span>
    <a-radio-group
      v-model:value="themeRef"
      option-type="button"
      :options="[ThemeType.Dark, ThemeType.Light, ThemeType.Default]"
      @change="onChangeTheme"
    />
  </div>

  <div>
    <a-dropdown>
      <template #overlay>
        <a-menu @click="onChangeReport">
          <template v-for="rpt in reportsRef" :key="rpt.code">
            <a-menu-item>
              <dot-chart-outlined />
              {{ rpt.name }}
            </a-menu-item>
          </template>
        </a-menu>
      </template>
      <a-button>
        <span> Change Report </span>
        <DownOutlined />
      </a-button>
    </a-dropdown>
  </div>

  <div ref="chartEl" :style="{ width: `600px`, height: `300px` }"></div>
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue'
import useChart, { RenderType, ThemeType } from '@/echart/useChart'

const chartEl = ref()
const useChartData = useChart(chartEl, true, true, RenderType.SVGRenderer)
const { getReports, resetEcharts, setTheme } = useChartData

const reportsRef = ref([])

const themeRef = ref(ThemeType.Default)

function onChangeTheme() {
  setTheme(themeRef.value)
}

async function onChangeReport(menu) {
  resetEcharts(menu.key)
}

onMounted(() => {
  nextTick(async () => {
    reportsRef.value = await getReports()
    resetEcharts()
  })
})
</script>
