<template>
  <div v-if="node.attrs.name === 'web_ribbon'" :class="className">
    <span :class="node.attrs.bg_color || undefined">
      {{ node.attrs.title }}
    </span>
  </div>

  <div v-else-if="node.attrs.name === 'qty_at_date_widget'" :class="className">
    <!-- todo: qty_at_date_widget -->
    <!-- qty_at_date_widget -->
  </div>

  <div
    v-else-if="node.attrs.name === 'res_config_invite_users'"
    :class="className"
  >
    <!-- TODO: OWidget: {{ node.attrs.name }} -->
  </div>

  <div v-else-if="node.attrs.name === 'res_config_dev_tool'" :class="className">
    <!-- TODO: OWidget: {{ node.attrs.name }} -->
  </div>

  <div v-else-if="node.attrs.name === 'res_config_edition'" :class="className">
    <!-- TODO: OWidget: {{ node.attrs.name }} -->
  </div>

  <div
    v-else-if="node.attrs.name === 'iap_buy_more_credits'"
    :class="className"
  >
    <!-- TODO: OWidget: {{ node.attrs.name }} -->
  </div>

  <div v-else>
    TODO: in OWidget: {{ node.attrs.name }}

    <!-- <widget name="qty_at_date_widget" width="0.1"/> -->
  </div>
</template>

<script>
import OMixin from './OMixin'
// import ONode from './ONode'
export default {
  name: 'OWidget',
  // components: { ONode },
  mixins: [OMixin],

  props: {},

  data() {
    return {}
  },
  computed: {
    className() {
      const arr = [...this.classNameByNode]
      arr.push('o_widget')
      if (this.node.attrs.name === 'web_ribbon') {
        arr.push('ribbon ribbon-top-right')
      } else if (this.node.attrs.name === 'qty_at_date_widget') {
        // arr.push('ribbon ribbon-top-right')
      }
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
