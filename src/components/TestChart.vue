<template>
  <div ref="myCharts" :style="{ width: `300px`, height: `300px` }"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import * as echarts from 'echarts'
const myCharts = ref()

onMounted(() => {
  var myChart = echarts.init(myCharts.value)

  myChart.setOption({
    title: {
      text: 'ECharts 入门示例'
    },
    tooltip: {},
    dataset: {
      source: [
        ['product', 'amount'],
        ['衬衫', 1],
        ['羊毛衫', 2],
        ['雪纺衫', 3],
        ['裤子', 4]
      ]
    },
    xAxis: {
      type: 'category'
      // data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar'
        // data: [5, 20, 36, 10, 10, 20]
      }
    ]
  })
})
</script>
