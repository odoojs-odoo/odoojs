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
  // var data = [900, 200, 100, -100, -200, 100, 100, 200, -100, -300, -200]

  var data = [900, 345, 393, -108, -154, 135, 178, 286, -119, -361, -203]

  var help = []
  var positive = []
  var negative = []

  for (var i = 0, sum = 0; i < data.length; ++i) {
    if (data[i] >= 0) {
      positive.push(data[i])
      negative.push('-')
    } else {
      positive.push('-')
      negative.push(-data[i])
    }

    if (i === 0) {
      help.push(0)
    } else {
      sum += data[i - 1]
      if (data[i] < 0) {
        help.push(sum + data[i])
      } else {
        help.push(sum)
      }
    }
  }

  const date_month = (function () {
    var list = []
    for (var i = 1; i <= 11; i++) {
      list.push('Oct/' + i)
    }
    return list
  })()

  // console.log(data)
  // console.log(help)
  // console.log(positive)
  // console.log(negative)
  const dataSource = date_month.map((item, index) => ({
    date_month: item,
    help: help[index],
    positive: positive[index],
    negative: negative[index]
  }))

  console.log(dataSource)

  const option = {
    title: {
      text: 'Waterfall'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    dataset: {
      dimensions: ['date_month', 'help', 'positive', 'negative'],
      source: dataSource
    },
    xAxis: {
      type: 'category',
      splitLine: { show: false }
      // data: (function () {
      //   var list = []
      //   for (var i = 1; i <= 11; i++) {
      //     list.push('Oct/' + i)
      //   }
      //   return list
      // })()
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        type: 'bar',
        stack: 'all',
        itemStyle: {
          borderColor: 'rgba(0,0,0,0)',
          color: 'rgba(0,0,0,0)'
        },
        emphasis: {
          itemStyle: {
            borderColor: 'rgba(0,0,0,0)',
            color: 'rgba(0,0,0,0)'
          }
        }
        // data: help
      },
      {
        // name: 'positive',
        type: 'bar',
        stack: 'all'
        // data: positive
      },
      {
        // name: 'negative',
        type: 'bar',
        stack: 'all',
        // data: negative,
        itemStyle: {
          color: '#f33'
        }
      }
    ]
  }

  console.log(option)
  myChart.setOption(option)
})
</script>
