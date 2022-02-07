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
  name: 'MyAccount',
  components: { PNode },
  mixins: [],
  data() {
    return {
      node: {}
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const node = await api.my.account()
      this.node = node
      console.log('act_url', cp(this.node))
    }
  }
}
</script>
