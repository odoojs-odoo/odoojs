const Mixin = {
  data() {
    return {}
  },
  computed: {},
  async created() {},

  methods: {
    async _handleLogin(action, payload) {
      const res = this.$store.dispatch(action, payload)
      res
        .then(data => {
          const ss = this.$store.state.user
          console.log('ssss,ss', data, ss)
          this.$router.push({
            path: '/'
            // query: this.otherQuery
          })
        })
        .catch(error => {
          const ss = this.$store.state.user
          console.log('errror,', error, ss)
        })
    }
  }
}

export default Mixin
