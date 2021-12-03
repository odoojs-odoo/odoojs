<template>
  <div>
    <h1>{{ 'odoorpc-js tutorial' }}</h1>

    <!-- <div>&nbsp;</div>
    <div>&nbsp;</div>
    <button @click="onclickApiAddons"><H1> Test API Addons</H1></button>
    <div>&nbsp;</div> -->
    <div>&nbsp;</div>
    <button @click="onclick"><H1> Test RPC</H1></button>

    <div>&nbsp;</div>
    <div>&nbsp;</div>
    <button @click="onclickJS"><H1> Test OdooJS</H1></button>

    <div>&nbsp;</div>
    <div>&nbsp;</div>
  </div>
</template>

<script>
import { test_rpc } from '@/odoorpc/test_rpc'
import { test_odoojs } from '@/odoojs/test_odoojs'

import { test_api_addons } from '@/api_addons/test_api_addons'

export default {
  name: 'TestRpc',
  props: {},
  data() {
    return {}
  },
  computed: {},

  async created() {},
  methods: {
    onclickApiAddons() {
      console.log('click btn')
      //   alert('click btn')
      test_api_addons()
    },

    onclick() {
      console.log('click btn')
      //   alert('click btn')
      test_rpc()
    },

    onclickJS() {
      console.log('click onclickJS')
      //   alert('click btn')
      test_odoojs()
    }
  }
}
</script>

<style scoped></style>
