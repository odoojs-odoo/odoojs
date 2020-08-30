const Mixin = {
  data() {
    return {
      //
    }
  },
  computed: {
    userId: function() {
      return this.$store.state.user.uid
    },
    userName: function() {
      return this.$store.state.user.name
    }
  },

  async created() {
    this.$store.dispatch('user/getInfo')
  },

  methods: {
    async handleClickTabbar() {
      console.log(this.selected)
    }
  }
}

export default Mixin
