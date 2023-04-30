<template>
  <div>
    <div>Home page</div>
    <div>-----</div>
    <a-button type="primary" @click="onEchartsCtrl">ECharts</a-button>

    <div>-----</div>
    <a-button type="primary" @click="onEchartsExamples">
      All Echarts Examples
    </a-button>
    <div>-----</div>

    <a-button type="primary" @click="onLogout">注销再登录</a-button>
    <div>odoo version: {{ version_info.server_version }}</div>

    <div></div>
  </div>
</template>

<script setup>
import api from '@/odoorpc'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import TestChart2 from '../echarts/TestChart2.vue'

const router = useRouter()

const version_info = ref({})

onMounted(async () => {
  version_info.value = await api.web.webclient.version_info()
})

async function onLogout() {
  await api.web.logout()
  router.replace({ path: '/user/login' })
}

async function onEchartsCtrl() {
  router.replace({ path: '/echarts/ctrl' })
}

async function onEchartsExamples() {
  await api.web.logout()
  router.replace({ path: '/echarts/examples' })
}
</script>

<style type="text/css" scoped></style>
