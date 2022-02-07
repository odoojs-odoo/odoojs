<template>
  <nav :class="className">
    <template v-for="(item, index) in node.children">
      <template
        v-if="
          item.tagName === 'button' &&
          item.attrs.class.includes('navbar-toggler')
        "
      >
        <a-button :key="index" icon="menu" @click="e => onclick(e, item)" />
      </template>

      <template v-else-if="item.attrs.class.includes('navbar-collapse')">
        <PNode :key="index" v-show="collapse" :info="{ ...info, node: item }" />
      </template>

      <template v-else>
        <PNode :key="index" :info="{ ...info, node: item }" />
      </template>
    </template>
  </nav>
</template>

<script>
import PNodeMixin from './PNodeMixin'
import PNode from './PNode'

const cp = item => JSON.parse(JSON.stringify(item))
export default {
  name: 'PNav',
  components: { PNode },
  mixins: [PNodeMixin],

  props: {},

  data() {
    return {
      collapse: false
    }
  },
  computed: {},

  async created() {},

  mounted() {},

  methods: {
    onclick(e, item) {
      e.preventDefault()
      e.stopPropagation()
      console.log('btn click.', cp(item))

      this.collapse = !this.collapse
    }
  }
}
</script>

<style lang="less"></style>
