<template>
  <div>
    <div>&nbsp;</div>
    <div>&nbsp;</div>

    <!-- <Divider /> -->

    <Card style="width:350px">
      <p slot="title">
        <Icon type="ios-home"></Icon>
        欢迎使用 odoorpc odoojs
      </p>

      <Form
        ref="form"
        :model="form"
        :rules="login_rules"
        label-position="left"
        :label-width="100"
        width="80"
      >
        <FormItem prop="database" label="数据库">
          <Select
            v-model="form.database"
            prefix="md-reorder"
            placeholder="数据库"
            style="width:200px"
          >
            <Option
              v-for="item in database_options"
              :value="item"
              :key="item"
              >{{ item }}</Option
            >
          </Select>
        </FormItem>
        <FormItem prop="username" label="账号">
          <i-input
            type="text"
            v-model="form.username"
            placeholder="用户账号"
            style="width:200px"
          >
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </i-input>
        </FormItem>
        <FormItem prop="password" label="密码">
          <i-input
            type="password"
            v-model="form.password"
            placeholder="密码"
            style="width:200px"
          >
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </i-input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="onLogin('form')">登录</Button>
        </FormItem>
      </Form>
    </Card>

    <div>&nbsp;</div>
    <div>&nbsp;</div>
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
    onLogin(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          const success = res => {
            this.$Message.success(res.name + '登录')
            this.$router.replace({
              path: '/'
            })
          }
          const error = e => {
            this.$Message.error(e.data.message)
          }

          this.handleLogin(success, error)
        } else {
          //
        }
      })
    }
  }
}
</script>

<style type="text/css"></style>
