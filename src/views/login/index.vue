<template>
  <div class="login">
    <div class="opa">
      <div class="loginCont">
        <p class="loginTitle">odoojs</p>
        <div class="loginForm">
          <div class="formInput">
            <input
              v-model="form.username"
              prefix="md-person"
              placeholder="用户名"
            />
          </div>
          <div class="formInput">
            <input
              v-model="form.password"
              prefix="iconfont iconfont icon-mima"
              type="password"
              placeholder="密码"
            />
          </div>
          <div class="formInput flex">
            <input
              v-model="form.number"
              prefix="iconfont iconfont icon-yanzhengma"
              placeholder="输入验证码"
            />
            <div class="code">aaa</div>
          </div>
          <!-- <div class="reUsername">
            <Checkbox v-model="single">记住用户名</Checkbox>
          </div> -->
          <button type="success" long @click="handleLogin">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loginMixin from './loginMixin'

export default {
  name: 'AppLogin',
  // components: { withEmail },
  mixins: [loginMixin],

  data() {
    return {
      single: undefined,

      form: {
        username: 'admin',
        password: '123456'
      }
    }
  },
  computed: {
    //
  },
  async created() {
    // console.log('ssss,ss login app')
  },

  methods: {
    async handleLogin() {
      return this._handleLogin('user/login', this.form)
    }
  }
}
</script>

<style type="text/css"></style>
