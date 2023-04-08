<template>
  <div class="login-form-box">
    <div class="form-box">
      <img src="../../assets/logo.png" alt="" class="imgLogo" />
      <h2>欢迎登录发票管理平台</h2>

      <a-form
        class="loginForm"
        :model="formState"
        name="basic"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item name="database" label="数据库">
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
          <a-button class="loginBtn" type="primary" html-type="submit"
            >登录</a-button
          >
        </a-form-item>
      </a-form>
      <lang class="langSelect" />
    </div>
  </div>
</template>

<script>
import loginApi from './loginApi'
import { defineComponent, reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { SyncOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'
import Lang from '@/components/Lang.vue'
export default defineComponent({
  components: {
    SyncOutlined,
    Lang
  },
  // setup 函数 构建组件
  setup() {
    // 必须先初始化调用 useRouter. 否则 返回 null. 这是vue3的bug
    const router = useRouter()

    // 以下定义组件响应式变量. 待 return
    const formState = reactive({ ...loginApi.formState })
    // 使用 ref 表示该变量为一个引用地址. 后续其他代码可以修改其值
    const codeNum = ref(formState.verificationCode)
    const databaseOptions = ref([])

    // 定义 state, 其内容为组件的响应式数据. 若调用外部方法, 第一个参数必须为 state
    const state = { formState, databaseOptions, codeNum }

    const { t } = useI18n()
    // ----- 以下定义组件的响应式方法, 待 return
    // 组件的响应式方法, 命名为on开头的函数
    function onClickCodeNum() {
      codeNum.value = loginApi.getVerificationCode()
    }

    async function onFinish(values) {
      callOnFinish({ state, router }, values)
    }

    // 约定, 不使用箭头函数的格式. 这里是一个反面例子
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo)
    }
    // function onFinishFailed2(errorInfo) {
    //   console.log('Failed:', errorInfo)
    // }

    // 以下定义组件生命周期事件的方法
    // 这里是 onMounted 事件, 单独定义一个外部函数, 直接调用
    onMounted(() => handleMounted({ state, router }))

    // 这里使用箭头函数 代码更简洁
    // onMounted(function () {
    //   handleMounted({ state, router })
    // })

    // return 返回 组件的 响应式数据和方法
    return {
      ...state,
      onClickCodeNum,
      onFinish,
      onFinishFailed,
      t
    }
  }
})

// 组件外函数定义在这里
//
// 组件外定义的函数, 第一个参数是对象, 包含 state, router 等组件的全局参数
// 第二个及以后的参数, 是该函数自己的参数
// eslint-disable-next-line no-unused-vars
async function handleMounted({ state }, ...payload) {
  // console.log(state)
  state.codeNum.value = state.formState.verificationCode
  const ops = await loginApi.getDatabaseSelectOptions()
  state.databaseOptions.value = ops.map(item => {
    return { value: item, label: item }
  })
}

async function callOnFinish({ router }, values) {
  // console.log('Success:', values)
  const info = await loginApi.handleLogin(values)
  if (info) {
    router.push({ path: '/' })
  }
}
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
