<template>
  <div>
    ChartView

    {{ lang }}

    <div ref="chartEl" :style="{ width: `600px`, height: `300px` }"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useChartView } from './chartApi'

const router = useRouter()

const props = defineProps(['actionId'])
const emit = defineEmits(['search-change'])

const chartEl = ref()

const useData = useChartView(props, { emit, router, chartEl })

const { lang } = useData
</script>

<style></style>
