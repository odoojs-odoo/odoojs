export default {
  mixins: [],

  props: {},

  data() {
    return {}
  },
  computed: {},

  watch: {},

  async created() {},
  async mounted() {},

  methods: {
    fullPath_get(query) {
      return `/web?${Object.keys(query)
        .map(item => `${item}=${query[item]}`)
        .join('&')}`
    },

    load_routes() {
      const routes_json = localStorage.getItem('routes')
      if (!routes_json) {
        delete this.$route.meta.routes
        return
      }
      const json2obj = routes_json => {
        try {
          return JSON.parse(routes_json)
        } catch (e) {
          return false
        }
      }

      const old_routes = this.$route.meta.routes || []

      const routes = json2obj(routes_json)
      // to check routes is error
      const routes2 = routes.map(item => {
        const fullPath = this.fullPath_get(item.query)
        const old_route = old_routes.find(it => it.fullPath === fullPath) || {}
        return { ...old_route, fullPath, path: `/web`, ...item }
      })

      this.$route.meta.routes = routes2
    },

    save_routes() {
      const routes = this.$route.meta.routes || []
      // console.log('routes', cp(routes))
      const routes_to_storage = routes.map(item => {
        return {
          query: item.query,
          action: item.action,
          context: item.context,
          breadcrumbName: item.breadcrumbName
        }
      })

      const routes_json = JSON.stringify(routes_to_storage)
      console.log('save_routes', routes_json.length)
      localStorage.setItem('routes', routes_json)
    },

    async push_route_no_router(kw) {
      //   console.log('push_route_no_router')
      const { query } = kw
      const path = `/web`
      const fullPath = this.fullPath_get(query)
      const route = { fullPath, path, ...kw }
      const routes = this.$route.meta.routes || []
      this.$route.meta.routes = [...routes, route]
    },

    async push_route({ path, query, ...kw }) {
      // const { breadcrumbName, action, context, views } = kw
      console.log('push_route', this.$route, query, kw)

      const path2 = path || this.$route.name

      if (path2 === '/web2/mod') {
        this.$emit('on-event', 'on-router', { query, ...kw })
      } else {
        this.push_route_no_router({ query, ...kw })
        const path = `/web`
        this.$router.push({ path, query })
        this.save_routes()
      }
    },

    query_get() {
      if (this.$route.name === '/web2/mod') {
        return this.query || {}
      } else {
        const query = this.$route.query
        return query || {}
      }
    },

    async update_breadcrumbName(name) {
      //   console.log('update_breadcrumbName', this.$route.meta)
      if (this.$route.name === '/web2/mod') {
        this.$emit('on-event', 'on-update-title', name)
      } else {
        const route = this.$route.meta.routes.find(
          item => item.fullPath === this.$route.fullPath
        )

        if (route) {
          route.breadcrumbName = name
          this.save_routes()
        }
      }
    },

    async replace_route({ path, query, ...kw }) {
      //   console.log('replace_route')
      const path2 = path || this.$route.name
      if (path2 === '/web2/mod') {
        this.$emit('on-event', 'on-router-replace', { query, ...kw })
      } else {
        const path = `/web`
        const fullPath = this.fullPath_get(query)
        const { routes = [] } = this.$route.meta
        const route_old = routes.pop() || {}
        const route = { ...route_old, fullPath, path, query, ...kw }
        this.$route.meta.routes = [...routes, route]
        this.$router.replace({ path, query })
        this.save_routes()
      }
    }
  }
}