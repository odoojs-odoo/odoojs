<template>
  <div>
    <h1>{{ 'odoorpc-js tutorial' }}</h1>

    <div>&nbsp;</div>
    <button @click="onclick"><H1> Test RPC</H1></button>

    <div>&nbsp;</div>
    <div>&nbsp;</div>
  </div>
</template>

<script>
import { test_rpc } from '@/odoorpc_test/test_rpc'

export default {
  name: 'TestRpc',
  props: {},
  data() {
    return {}
  },
  computed: {},

  async created() {},
  methods: {
    onclick() {
      console.log('click btn')
      //   alert('click btn')
      test_rpc()
    }
  }
}
</script>

<style scoped></style>
