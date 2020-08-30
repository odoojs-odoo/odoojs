<template>
  <div>
    <div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>

      <button @click="logout">注销</button>
      <div>&nbsp;</div>

      <button @click="$router.push('/home/test')">test</button>
      <div>&nbsp;</div>

      <!-- <button @click="$router.push('/sport/home')">足球</button> -->

      <div>&nbsp;</div>
    </div>
  </div>
</template>

<script>
// import api from '@/api'

export default {
  name: 'Home',
  components: {},
  mixins: [],

  data() {
    return {}
  },
  computed: {},
  async created() {
    // const M = api.env('res.bank')
    // console.log('M,', M)
  },

  methods: {
    logout() {
      this.$store.dispatch('user/logout').then((res) => {
        this.$router.push({ path: '/login' })
      })
    }
  }
}
</script>

<style type="text/css"></style>
