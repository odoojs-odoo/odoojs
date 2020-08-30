export default {
  data() {
    return {
      // email: 'email@email.com',
      verifyCode: '',
      verifyCode2: ''
    }
  },
  computed: {},

  watch: {},

  async created() {},

  methods: {
    async sendEmail(payload) {
      this.verifyCode2 = ''
      await this.$store.dispatch('user/emailSend', {
        ...payload
      })
      const code = await this.$store.dispatch('user/emailBack', {
        ...payload
      })
      console.log('emailBack code,', code)
      setTimeout(() => {
        this.verifyCode2 = code
        // this.$emit('sms-code', code)
      }, 500)
    }
  }
}
