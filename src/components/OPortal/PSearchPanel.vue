<template>
  <span :class="className">
    <!-- 只有 任务里 有 . 暂时不处理 -->
    <!-- TODO SearchPanel -->

    <!-- <template v-for="(item, index) in node.children">
      <PNode :key="index" :info="{ ...info, node: item }" />
    </template> -->
  </span>
</template>

<script>
import PNodeMixin from './PNodeMixin'
// import PNode from './PNode'

// const cp = item => JSON.parse(JSON.stringify(item))
export default {
  name: 'PSearchPanel',
  // components: { PNode },
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
    // console.log('SearchPanel', cp(this.node))
  },

  methods: {
    // onclick(e, item) {
    //   e.preventDefault()
    //   e.stopPropagation()
    //   console.log('btn click.', cp(item))
    // }
  }
}
</script>

<style lang="less"></style>
