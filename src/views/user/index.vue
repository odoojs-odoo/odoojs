<template>
  <div>
    <!-- <div>&nbsp;</div>
    <div>&nbsp;</div>
    Login Page -->
    <div>&nbsp;</div>
    <div>&nbsp;</div>

    <h1>欢迎使用 antd-odoojs</h1>

    <!-- {{ form_data }} -->
    <!-- -->
    <a-form-model
      ref="ruleForm"
      :model="form2"
      :rules="rules"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
    >
      <a-form-model-item prop="database" label="数据库">
        <a-select v-model="form2.database">
          <a-select-option
            v-for="item in database_options"
            :value="item"
            :key="item"
            >{{ item }}</a-select-option
          >
        </a-select>
      </a-form-model-item>

      <a-form-model-item prop="username" label="账号">
        <a-input v-model="form2.username" placeholder="用户账号" />
      </a-form-model-item>

      <a-form-model-item prop="password" label="密码">
        <a-input-password v-model="form2.password" placeholder="密码" />
      </a-form-model-item>

      <a-form-model-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" @click="onSubmit"> Submit </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import loginMixin from '@/mixins/loginMixin'

export default {
  name: 'AppLogin',
  components: {},
  mixins: [loginMixin],

  data() {
    return {}
  },
  computed: {},
  async created() {
    this.init()
  },

  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const success = res => {
            console.log('login ok session:', res)
            Object.keys(res).forEach(item => {
              this.$route.meta[item] = res[item]
            })

            // Toast.success(res.name + '登录')
            this.$router.push({ path: '/' })
          }

          // eslint-disable-next-line no-unused-vars
          const error = e => {
            // console.log(e)
          }

          this.handleLogin(this.form2, success, error)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style type="text/css"></style>
