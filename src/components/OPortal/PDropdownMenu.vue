<template>
  <span :class="className">
    <a-dropdown :trigger="['click']">
      <PNode :info="{ ...info, node: node.children[0] }" />

      <a-menu slot="overlay">
        <template v-for="(item, index) in node.children[1].children">
          <a-menu-item :key="index">
            <PNode :info="{ ...info, node: item }" />
          </a-menu-item>
        </template>
      </a-menu>
    </a-dropdown>
  </span>
</template>

<script>
import PNodeMixin from './PNodeMixin'
import PNode from './PNode'

// const cp = item => JSON.parse(JSON.stringify(item))
export default {
  name: 'PBtnGroup',
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

  mounted() {
    // console.log('Btn Group', cp(this.node))
  },

  methods: {}
}
</script>

<style lang="less"></style>
