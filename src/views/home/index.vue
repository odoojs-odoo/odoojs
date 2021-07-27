<template>
  <div>
    <div>&nbsp;</div>
    <div>&nbsp;</div>

    <!-- <div>Home page</div> -->
    <!-- <div>odoo version: {{ api.version_info.server_version }}</div> -->
    <!-- <div>odoo version: {{ version_info.server_version }}</div> -->

    <h1>主页设计说明</h1>
    <p>在主页上, 可以展示一些当前用户个性化的内容</p>
    <p>如下文展示的当前登录用户的用户信息</p>
    <p>可以将该用户常用的功能按钮, 显示在主页上, 如下文的按钮 "财务报表"</p>

    <Divider />

    <Button @click="$router.push({ path: '/web/page.accountReport/list' })">
      财务报表
    </Button>

    <Divider />

    <!-- const path = `/web/${name}/list`
        this.$router.push({ path }) -->

    <Card style="width:350px">
      <p slot="title">
        <Icon type="ios-contact" />
        当前登录用户
      </p>
      <div>姓名: {{ session_info.name }}</div>
      <div>数据库: {{ session_info.db }}</div>
      <div>语言: {{ (session_info.user_context || {}).lang }}</div>
      <div>服务版本: {{ session_info.server_version }}</div>
      <div>
        所属公司:
        {{
          ((session_info.user_companies || {}).current_company || [
            null,
            null
          ])[1]
        }}
      </div>
      <div>
        管理的公司:
        {{
          ((session_info.user_companies || {}).allowed_companies || [])
            .map(item => item[1])
            .join(',')
        }}
      </div>

      <Button @click="onLogout">{{
        session_info.uid ? '注销' : '登录'
      }}</Button>
    </Card>

    <Divider />
    <h1>控制台说明</h1>
    <p>1 左侧侧边栏, 展示一个树形多级菜单</p>
    <p>2 自定义菜单是在 前端代码中定义的菜单项</p>
    <p>3 我的控制台是当前登录账户个性化的功能菜单项</p>
    <p>4 公共控制台是所有用户公用的功能菜单项</p>
    <p>5 odoo官方菜单, 测试用, 展示 odoo 官方菜单树</p>

    <Divider />
    <h1>控制台设计说明</h1>
    <p>1. 自定义菜单在前端中配置</p>
    <p>
      2. 我的控制台, 需要在服务端自行创建一个模块, 示例模块是:
      odoojs_democompany_admin
    </p>
    <p>
      3. 公共控制台, 需要在服务端自行创建一个模块, 示例模块是:
      odoojs_democompany
    </p>
    <p>4. odoo 官方菜单是 测试, demo 演示用</p>

    <div>&nbsp;</div>
    <div>&nbsp;</div>

    <div>&nbsp;</div>
  </div>
</template>

<script>
import api from '@/api'

export default {
  name: 'Home',
  components: {},
  mixins: [],

  data() {
    return {
      api,
      version_info: {}
    }
  },
  computed: {
    session_info() {
      return { ...api.session_info }
    }
  },
  async created() {
    // this.version_info = await api.version_info_promise
  },

  methods: {
    async onLogout() {
      await api.logout()
      this.$router.replace({ path: '/user/login' })
    }
  }
}
</script>

<style type="text/css"></style>
