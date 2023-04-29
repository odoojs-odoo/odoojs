<template>
  <div ref="myCharts" :style="{ width: `600px`, height: `300px` }"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import * as echarts from 'echarts'
const myCharts = ref()

function randInt() {
  return Math.floor(Math.random() * 1000 + 1)
}

onMounted(() => {
  var myChart = echarts.init(myCharts.value)
  const option = {
    xAxis: {
      data: ['A', 'B', 'C', 'D', 'E']
    },
    yAxis: {},
    series: [
      {
        data: [10, 22, 28, 43, 49],
        type: 'line',
        stack: 'x'
      },
      {
        data: [5, 4, 3, 5, 10],
        type: 'line',
        stack: 'x'
      }
    ]
  }

  console.log(option)
  myChart.setOption(option)
})
</script>
