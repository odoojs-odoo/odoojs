<template>
  <div>
    <div>
      <template v-if="viewType === 'tree'">
        <TreeView />
      </template>

      <template v-else-if="viewType === 'form'">
        <!-- partner -->
        <FormView />
      </template>

      <template v-else> todo:{{ viewType }}</template>
    </div>
  </div>
</template>

<script>
import viewMixin from '@/odooui/viewMixin'

import TreeView from '@/components/OView/TreeView.vue'

import FormView from '@/odooui/base/view_partner_form.vue'

export default {
  name: 'action_contacts',
  components: { TreeView, FormView },
  mixins: [viewMixin],

  data() {
    return {}
  },

  computed: {},

  watch: {},

  async created() {},

  mounted() {},

  methods: {}
}
</script>

<style type="text/css"></style>
