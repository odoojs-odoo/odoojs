<template>
  <span :class="className"> {{ info.data.counters[placeholder_count] }} </span>
</template>

<script>
import PNodeMixin from './PNodeMixin'

export default {
  name: 'PCount',
  components: {},
  mixins: [PNodeMixin],

  props: {},

  data() {
    return {}
  },
  computed: {
    placeholder_count() {
      const placeholder_count = this.node.attrs['data-placeholder_count']

      return placeholder_count
    }
  },

  async created() {},

  mounted() {},

  methods: {}
}
</script>

<style lang="less"></style>
