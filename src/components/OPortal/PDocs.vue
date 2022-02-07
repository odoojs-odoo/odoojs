<template>
  <div :class="className">
    <template v-for="(item, index) in node.children">
      <PNode :key="index" :info="{ ...info, node: item, data }" />
    </template>
  </div>
</template>

<script>
import PNodeMixin from './PNodeMixin'

import api from '@/odooapi'

import PNode from './PNode'

export default {
  name: 'PDocs',
  components: { PNode },
  mixins: [PNodeMixin],

  props: {},

  data() {
    return {
      data: { counters: {} }
    }
  },
  computed: {},

  async created() {},

  async mounted() {
    const counters = this.node.children.map(item => {
      const node_cnt = item.children.find(it => {
        return typeof it === 'object' && it.attrs['data-placeholder_count']
      })
      return node_cnt.attrs['data-placeholder_count']
    })

    const res = await api.my.counters({ counters })

    this.data = { counters: res }
    // console.log(counters, cp(this.data))
  },

  methods: {}
}
</script>

<style lang="less"></style>
