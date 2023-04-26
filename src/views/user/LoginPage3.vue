<template>
  <div v-if="sso_cas">loading</div>

  <LoginPage2 v-else />

  <div></div>
</template>

<script setup>
import LoginPage2 from './LoginPage2.vue'
import { useCasLogin } from './userCas'
import { useRouter } from 'vue-router'
const router = useRouter()
const { sso_cas, onCasCall } = useCasLogin(router)
onCasCall()
</script>

<style type="text/less" scoped></style>
