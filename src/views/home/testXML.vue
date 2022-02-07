<template>
  <div>
    <div>Test Xml</div>

    <a-button type="primary" @click="onClick">test</a-button>

    <div>-----</div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: 'TestTable',
  components: {},
  mixins: [],

  data() {
    return {}
  },
  computed: {},
  async created() {},

  methods: {
    onClick() {
      // const xx = require('./x1.xml')
      // console.log('onclick', xx)
      // axios({
      //   method: 'get',
      //   url: './x1.xml'
      // }).then(res => {
      //   console.log(res)
      // })
      // const url = './x1.xml'
      // const request = new XMLHttpRequest()
      // request.open('get', url)
      // request.send(null)
      // request.onload = function () {
      //   console.log(request)
      // }
    }
  }
}
</script>

<style type="text/css"></style>
