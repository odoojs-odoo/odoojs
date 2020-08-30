export default {
  data() {
    return {
      mobile: '13912345678',
      verifyCode: '',
      verifyCode2: ''
    }
  },
  computed: {},

  watch: {},

  async created() {},

  methods: {
    async sendSms(payload) {
      this.verifyCode2 = ''
      await this.$store.dispatch('user/smsSend', {
        mobile: this.mobile,
        ...payload
      })
      const code = await this.$store.dispatch('user/smsBack', {
        mobile: this.mobile
      })
      console.log('smsBack code,', code)
      setTimeout(() => {
        this.verifyCode2 = code
        // this.$emit('sms-code', code)
      }, 500)
    }
  }
}
