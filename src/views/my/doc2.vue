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
      // //   path === '/my/quotes'
      // //   path === '/my/orders'

      const { path, params = {}, query } = this.$route
      const { id: res_id } = params
      console.log('doc2', path, params, query)

      // const { access_token } = query

      const paths = path.split('/')
      //   console.log('act_url', paths)

      const { report_type } = query

      if (report_type === 'pdf') {
        //
      } else {
        const function_name = paths[2]
        const node = await api.my[function_name]({ res_id, ...query })

        const node2 = {
          ...node,
          children: node.children.filter(
            item =>
              !((item.attrs || {}).class || '').includes(
                'alert alert-info alert-dismissible rounded-0 fade show d-print-none css_editable_mode_hidden'
              )
          )
        }

        this.node = node2
        console.log('act_url', cp(node))
      }
    }
  }
}
</script>
