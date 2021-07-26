<template>
  <div>
    <!-- {{ fullname }} -->

    <Tooltip :content="node.attrs.title">
      <Icon type="ios-information-circle" />
    </Tooltip>
  </div>
</template>

<script>
import OMixin from './OMixin'

export default {
  name: 'OTooltip',
  components: {},
  mixins: [OMixin],

  props: {},

  data() {
    return {}
  },
  computed: {},

  async created() {},

  mounted() {},

  methods: {
    onclick() {
      const type = this.node.attrs.type
      const name = this.node.attrs.name
      console.log('action:', type, name)
    }
  }
}
</script>

<style type="text/css"></style>
