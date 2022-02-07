<template>
  <div>
    <PNode :info="{ node }" />
  </div>
</template>
<script>
import api from '@/odooapi'
import PNode from '@/components/OPortal/PNode'
// eslint-disable-next-line no-unused-vars
const cp = val => JSON.parse(JSON.stringify(val))

export default {
  name: 'MyDoc',
  components: { PNode },
  mixins: [],
  data() {
    return {
      node: {}
    }
  },
  watch: {
    // 菜单切换时, 触发
    '$route.fullPath': {
      handler: function (/*val*/) {
        // console.log('in watch, $route.fullPath')
        // console.log('watch fullPath')
        this.init()
      },
      deep: true
    }
  },

  mounted() {
    this.init()
  },
  methods: {
    async init() {
      console.log('doc', this.$route)
      const { path, query = {} } = this.$route
      //   path === '/my/quotes'
      //   path === '/my/orders'

      //   params: {id: '2'}

      const paths = path.split('/')
      //   console.log('act_url', paths)

      const function_name = paths[2]
      const node = await await api.my[function_name]({ ...query })

      this.node = await node
      console.log('act_url', cp(this.node))
    }
  }
}
</script>
