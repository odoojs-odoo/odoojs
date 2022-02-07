<template>
  <!--  -->

  <button @click="onclick" :class="className">
    <template v-if="!node.children || !node.children.length">
      {{ node.content || 'No node.content' }}
      <!-- {{ node.content || node.attrs.title }} -->
    </template>

    <template v-else>
      <template v-for="(item, index) in node.children">
        <!-- {{ index }} {{ item.tagName }} -->
        <PNode :key="index" :info="{ ...info, node: item }" />
      </template>
    </template>
  </button>
</template>

<script>
import PNodeMixin from './PNodeMixin'

import PNode from './PNode'
const cp = item => JSON.parse(JSON.stringify(item))

export default {
  name: 'PButton',
  components: { PNode },
  mixins: [PNodeMixin],

  props: {},

  data() {
    return {}
  },
  computed: {},

  async created() {},

  mounted() {
    // console.log('btn click.', cp(this.node))
  },

  methods: {
    onclick(e) {
      e.preventDefault()
      e.stopPropagation()
      console.log('btn click.', cp(this.info))
    }
  }
}
</script>

<style lang="less"></style>
