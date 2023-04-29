<template>
  <div>
    <!-- <EchartsWidget :report="undefined" /> -->

    <div v-for="rpt in reportsRef" :key="rpt.code">
      {{ rpt.code }}
      <EchartsWidget :report="rpt.code" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue'
// import useChart from '@/echart/useChart'

import useEchartsReport from '@/echart/useEchartsReport'

import EchartsWidget from '@/components/EchartsWidget.vue'

const { getReports } = useEchartsReport()
const reportsRef = ref([])

onMounted(() => {
  nextTick(async () => {
    reportsRef.value = await getReports()
  })
})
</script>

<style type="text/css"></style>
