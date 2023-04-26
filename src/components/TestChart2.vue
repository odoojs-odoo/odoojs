<template>
  <a-button type="primary" @click="onChangeChart">Change</a-button>
  <div ref="chartEl" :style="{ width: `600px`, height: `300px` }"></div>
</template>

<script setup>
import { onMounted, ref, computed, nextTick } from 'vue'
import useChart, { RenderType, ThemeType } from '@/echart/useChart'

const dataset = {
  dimensions: ['product', 'amount', 'tax', 'total'],
  source: [
    { product: 'Matcha Latte', amount: 43.3, tax: 85.8, total: 93.7 },
    { product: 'Milk Tea', amount: 83.1, tax: 73.4, total: 55.1 },
    { product: 'Cheese Cocoa', amount: 86.4, tax: 65.2, total: 82.5 },
    { product: 'Walnut Brownie', amount: 72.4, tax: 53.9, total: 39.1 }
  ]
}

const title = {
  text: 'ECharts 入门示例'
}

const serires = [
  { name: 'amount', type: 'bar' },
  { name: 'tax', type: 'bar' },
  { name: 'total', type: 'line' }
]

const option = computed(() => ({
  title: { text: 'ECharts 入门示例222' },
  tooltip: {},
  dataset: {
    ...dataset
  },
  xAxis: { type: 'category' },
  yAxis: {},
  series: [...serires]
}))

const chartEl = ref()

const { setOption, showLoading } = useChart(
  chartEl,
  true,
  true,
  RenderType.SVGRenderer,
  ThemeType.Dark
)

function randInt() {
  return Math.floor(Math.random() * 1000 + 1)
}

function onChangeChart() {
  console.log('onChangeChart')
  setOption({
    title: {
      text: 'ECharts 入门示例2223333'
    },
    tooltip: {},
    dataset: {
      source: [
        ['product', 'amount', 'tax'],
        ['衬衫', randInt(), randInt()],
        ['羊毛衫', randInt(), randInt()],
        ['雪纺衫', randInt(), randInt()],
        ['裤子', randInt(), randInt()]
      ]
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {},
    series: [
      { name: 'amount', type: 'bar' },
      { name: 'tax', type: 'line' }
    ]
  })
}

onMounted(() => {
  nextTick(() => {
    // 显示loading
    showLoading()
    // 假装有网络请求 ...
    // 渲染图表
    setOption(option.value)
  })
})
</script>
