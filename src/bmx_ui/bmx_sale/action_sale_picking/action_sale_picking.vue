<template>
  <div>
    <div>
      <template v-if="viewType === 'tree'">
        <TreeView />
      </template>

      <template v-else-if="viewType === 'form'">
        <FormView />
      </template>

      <template v-else> todo:{{ viewType }}</template>
    </div>
  </div>
</template>

<script>
import viewMixin from '@/odooui/viewMixin'

import TreeView from '@/components/OView/TreeView.vue'
// import FormView from '@/components/OView/FormView.vue'

import FormView from './form.vue'

export default {
  name: 'WebView',
  components: { TreeView, FormView },
  mixins: [viewMixin],

  data() {
    return {}
  },

  computed: {},

  watch: {},

  async created() {},

  mounted() {
    console.log('mounted, action_purchase_picking', this.$route.fullPath)
  },

  methods: {}
}
</script>

<style type="text/css"></style>
