<template>
  <div>
    <div>Home page</div>
    <div></div>

    <a-button type="primary" @click="onLogout">注销再登录</a-button>
  </div>
</template>

<script setup>
import {} from 'vue'
// import { useRouter } from 'vue-router'
// import { useCasLogin } from './userCas'

// const router = useRouter()

// const { onCasCall } = useCasLogin(router)

// onCasCall()

async function onLogout() {
  // await api.web.logout()
  // router.replace({ path: '/user/login' })
}
</script>

<style type="text/css" scoped></style>
