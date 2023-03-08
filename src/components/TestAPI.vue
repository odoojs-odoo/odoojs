<template>
  <div>
    <h1>Test API</h1>

    <a-button @click="onClick"> Test </a-button>
  </div>
</template>

<script>
import rpc from '@/odoorpc'

export default {
  name: 'TestAPI',
  props: {},

  methods: {
    async onClick() {
      // console.log(' ok', process.env.VUE_APP_ODOO_DB)

      const v = await rpc.web.webclient.version_info()
      console.log(' ok', v)
      const res = await rpc.web.session.authenticate({
        db: 'vwat',
        login: 'admin',
        password: '123456w'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
