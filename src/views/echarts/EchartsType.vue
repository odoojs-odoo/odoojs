<template>
  <div v-for="rpt in reportsRef" :key="rpt.code">
    {{ rpt.code }}
    <EchartsWidget :report="rpt.code" />
  </div>
</template>
<script setup>
import { watch, ref, computed } from 'vue'
import useEchartsReport from '@/echart/useEchartsReport'
import EchartsWidget from './Components/EchartsWidget.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const echartsType = computed(() => {
  const { query } = router.currentRoute.value
  const { action } = query

  return action
})

const { getReports } = useEchartsReport()
const reportsRef = ref([])

watch(
  echartsType,
  async newVal => {
    reportsRef.value = await getReports(newVal)
  },
  { immediate: true }
)
</script>

<style></style>
