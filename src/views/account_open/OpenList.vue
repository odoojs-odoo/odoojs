<template>
  <div>
    <h1>{{ '期初设置' }}</h1>
    <Divider />
    <OpenHeader :model="model" />
    <OpenLine :move_id="move_id" :move_data="dataDict" />

    <Divider />
  </div>
</template>

<script>
import api from '@/api'

import OpenHeader from './OpenHeader'
import OpenLine from './OpenLine'

export default {
  name: 'AccountOpenList',
  components: { OpenHeader, OpenLine },
  mixins: [],

  props: {},

  data() {
    return {
      model: undefined,
      move_id: 0,
      dataDict: {}
    }
  },
  computed: {},

  async created() {
    await this.init()
  },

  mounted() {},
  methods: {
    async init() {
      console.log('init,', this.$route)

      const model = this.$route.meta.model

      const Model2 = api.env.model(model)
      const move = await Model2.open_move_get()

      this.model = move
      this.move_id = move.id
      this.dataDict = { ...move.values }
    }
  }
}
</script>

<style type="text/css"></style>
