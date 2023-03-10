<template>
  <div class="login-form-box">
    <div class="form-box">
        <img src="../../assets/logo.png" alt="" class="imgLogo" />
        <h2>欢迎登录发票管理平台</h2>

        <a-form class="loginForm" :model="formState" name="basic"
          autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
          <a-form-item name="database" label="数据库">
            <a-select v-model:value="formState.database" :options="databaseOptions" />
          </a-form-item>

          <a-form-item label="账号" name="username" :rules="[{ required: true, message: '请输入您的账号!' }]">
            <a-input v-model:value="formState.username" />
          </a-form-item>

          <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入您的密码!' }]">
            <a-input-password v-model:value="formState.password" />
          </a-form-item>

          <a-form-item name="verificationCode" label="校验码">
            <a-row :gutter="4">
              <a-col :span="15">
                <a-input v-model:value="formState.verificationCode" placeholder="验证码" />
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
            <a-button class="loginBtn" type="primary" html-type="submit">登录</a-button>
          </a-form-item>
        </a-form>
        <lang class="langSelect" />
    </div>
  </div>
</template>

<script>
/*
// 代码书写规范
// 1. 使用 组件式而非选项式 api风格.
// 2. 强烈不建议使用隐式 setup, <script setup> 的代码写法, 除非组件代码非常简单.
// 3. 而建议使用 显式 setup() 函数, 在函数中定义组件的变量和函数
// 4. 若调用 useRouter(), 必须放在 setup() 函数 中的第一句代码, 如:
//    const router = useRouter()
// 5. setup函数内, 首先要定义 state 对象, 其值为 组件中的 响应式数据对象.
// 6. setup函数的 return 格式为 return { ...state, ... }
//     也即 state 需要解构后 放入 setup 函数返回值中.
//     setup 函数返回值中 的其他部分为 响应式函数.
// 7. state 中的属性值, 通常需要定义为 ref()
// 8. setup函数中, 需要定义 响应式函数, 并放在 return 中
//     建议 响应式函数 不使用箭头函数. 以便于 和变量定义区别
// 9. setup函数中, 最后注册组件生命周期函数
// 10. 为了建少 setup 函数的长度.
//     强烈建议将复杂的处理定义为外部函数, 放在 defineComponent 函数之外
//     建议 外部函数 不使用 箭头函数,  以便于 和变量定义区别
// 11. 调用外部函数的第一个参数必须是 {state}, 即响应式数据对象
// 12. 外部函数中, 可对 state 进行读写.
//     注意, ref 类型的数据的读写. 需要 state.someval.value
//     注意, 不可以使用 vue3 非正式的 $ref 写法
// 13. 变量命名. 用名词 camelCase
//     变量定义 通常用 const. 非必要 不用 let.
// 14. 函数命名. 用动词 或 动宾 camelCase
// 15. 建议响应式函数 以on开头, 如 onChange
// 16. 建议 组件的生命周期事件内代码, 直接调用一个预先定义好的外部函数
//     该外部函数命名, 以handle开头, 且与事件名同名, 如 onMounted 对应的外部函数为 handleMounted.
*/

import loginApi from './loginApi'
import { defineComponent, reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { SyncOutlined } from '@ant-design/icons-vue';
import { useI18n } from "vue-i18n";
import Lang from '@/components/Lang.vue';
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

<style lang='less' type="text/less" scoped>
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
    box-shadow: 0 0 20px 10px rgba(0, 0, 0, .2);
  }

  .imgLogo{
    width:100px;
    height:100px;
  }
  
  .loginForm{
    max-width: 300px;
    margin-top: 30px;
   .loginBtn{
      width:100%
    }
  }
 
</style>
