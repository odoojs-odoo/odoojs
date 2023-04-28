<template>
  <div>
    <div>Home page</div>

    <TestChart2 />

    <div>-----</div>

    <TestChart />
    <div>-----</div>

    <div></div>

    <a-button type="primary" @click="onLogout">注销再登录</a-button>
    <div>odoo version: {{ version_info.server_version }}</div>
  </div>
</template>

<script setup>
import api from '@/odoorpc'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import TestChart from '@/components/TestChart.vue'
import TestChart2 from '@/components/TestChart2.vue'

const router = useRouter()

const version_info = ref({})

onMounted(async () => {
  version_info.value = await api.web.webclient.version_info()
})

async function onLogout() {
  await api.web.logout()
  router.replace({ path: '/user/login' })
}
</script>

<style type="text/css" scoped></style>
