<template>
  <div class="login-form-box">
    <div class="form-box">
      <img src="../../assets/logo.png" alt="" class="imgLogo" />
      <h2>欢迎 登录 odoojs 平台</h2>

      <a-form
        class="loginForm"
        :model="formState"
        name="basic"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item v-show="show_db" name="database" label="数据库">
          <a-select
            v-model:value="formState.database"
            :options="databaseOptions"
          />
        </a-form-item>

        <a-form-item
          label="账号"
          name="username"
          :rules="[{ required: true, message: '请输入您的账号!' }]"
        >
          <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item
          label="密码"
          name="password"
          :rules="[{ required: true, message: '请输入您的密码!' }]"
        >
          <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-form-item name="verificationCode" label="校验码">
          <a-row :gutter="4">
            <a-col :span="15">
              <a-input
                v-model:value="formState.verificationCode"
                placeholder="验证码"
              />
            </a-col>
            <a-col :span="4">
              <a-button type="primary" @click="onClickCodeNum">
                {{ codeNum }}
                <template #icon>
                  <SyncOutlined />
                </template>
              </a-button>
            </a-col>
          </a-row>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 8 }">
          <a-button class="loginBtn" type="primary" html-type="submit">
            登录
          </a-button>
        </a-form-item>
      </a-form>
      {{ lang }}
      <LangMenu class="langSelect" />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

import LangMenu from '@/components/LangMenu.vue'
import { useLogin } from './useLogin'
import { useRouter } from 'vue-router'
const router = useRouter()

const useData = useLogin()
const { show_db, lang, formState, databaseOptions, codeNum } = useData
const { load_databaseOptions, onClickCodeNum, handleLogin } = useData

async function onFinish(values) {
  const info = await handleLogin(values)

  if (info) {
    router.push({ path: '/' })
  } else {
    alert('err')
  }
}

function onFinishFailed(errorInfo) {
  console.log('Failed:', errorInfo)
}

onMounted(async () => {
  load_databaseOptions()
})
</script>

<style lang="less" type="text/less" scoped>
.login-form-box {
  width: 100%;
  height: 100vh;
  display: flex;
  /* Chrome、Safari */
  display: -webkit-flex;
  /* IE */
  display: -ms-flex;
  /* fireFox */
  display: -moz-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
}
.form-box {
  padding: 30px 60px;
  border-radius: 10px;
  display: flex;
  /* Chrome、Safari */
  display: -webkit-flex;
  /* IE */
  display: -ms-flex;
  /* fireFox */
  display: -moz-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.2);
}

.imgLogo {
  width: 100px;
  height: 100px;
}

.loginForm {
  max-width: 300px;
  margin-top: 30px;
  .loginBtn {
    width: 100%;
  }
}
</style>
