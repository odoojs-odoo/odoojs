<template>
  <div :class="className">
    {{ node.attrs.string }}
    <!-- <span :class="node.attrs.bg_color || undefined">
      {{ node.attrs.title }}
    </span> -->
  </div>
</template>

<script>
import OMixin from './OMixin'
// import ONode from './ONode'
export default {
  name: 'OSeparator',
  // components: { ONode },
  mixins: [OMixin],

  props: {},

  data() {
    return {}
  },
  computed: {
    className() {
      const arr = [...this.classNameByNode]
      arr.push('o_horizontal_separator')

      return arr.join(' ')
    }
  },

  async created() {},

  mounted() {
    // console.log(this.node)
  },

  methods: {}
}
</script>

<style type="text/css"></style>
