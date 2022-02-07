<template>
  <div>
    <TagNode :node="node" />
  </div>
</template>
<script>
import api from '@/odooapi'
import { toJSON } from '@/odooapi/xml2json'

import TagNode from './TagNode'

export default {
  components: { TagNode },
  data() {
    return {
      node: {}
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      // const html = await api.web.http_call('/my/home')
      const { url } = this.$route.query

      let html = await api.web.http_call(url)
      html = html.trim()
      // console.log('act_url', html.slice(0, 30))
      // html = html.split('<!DOCTYPE html>')[1].trim()
      // html = html.split('<html>')[1].trim()
      // html = html.split('</html>')[0].trim()
      html = html.split('</head>')[1].trim()
      html = html.slice(6)
      html = html.slice(0, html.length - 7).trim()

      // console.log('act_url', html)

      const res2 = toJSON(html)

      this.node = res2

      console.log('act_url', res2)
    }
  }
}
</script>
