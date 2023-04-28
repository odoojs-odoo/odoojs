<template>
  <div ref="myCharts" :style="{ width: `300px`, height: `300px` }"></div>
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
    dataset: {
      dimensions: ['product', 'amount'],
      source: [
        { product: 'Matcha Latte', amount: randInt() },
        { product: 'Milk Tea', amount: randInt() },
        { product: 'Cheese Cocoa', amount: randInt() },
        { product: 'Walnut Brownie', amount: randInt() }
      ]
    },

    xAxis: {
      max: 'dataMax'
    },
    yAxis: {
      type: 'category',
      // data: ['A', 'B', 'C', 'D', 'E'],
      inverse: true,
      animationDuration: 300,
      animationDurationUpdate: 300,
      max: 2 // only the largest 3 bars will be displayed
    },
    series: [
      {
        realtimeSort: true,
        name: 'X',
        type: 'bar',
        // data: data,
        label: {
          show: true,
          position: 'right',
          valueAnimation: true
        }
      }
    ],
    legend: {
      show: true
    },
    animationDuration: 3000,
    animationDurationUpdate: 3000,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear'
  }

  // function update() {
  //   var data = option.series[0].data
  //   for (var i = 0; i < data.length; ++i) {
  //     if (Math.random() > 0.9) {
  //       data[i] += Math.round(Math.random() * 2000)
  //     } else {
  //       data[i] += Math.round(Math.random() * 200)
  //     }
  //   }
  //   myChart.setOption(option)
  // }

  myChart.setOption(option)

  setInterval(function () {
    // update()
  }, 3000)
})
</script>
