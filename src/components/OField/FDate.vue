<template>
  <span v-if="readonly || !editable">
    {{ value_display }}
  </span>
  <div v-else>
    edit: {{ [fieldInfo.type, fname] }}
    <!-- <ODatePicker
      :value="value"
      :fname="fname"
      :required="required"
      :placeholder="node.attrs.placeholder"
      :element-id="node.attrs.id || node.attrs.name"
      :className="className"
      @on-change="onchange"
    /> -->
  </div>
</template>

<script>
import OFMixin from './OFMixin'

// import ODatePicker from './OInput/ODatePicker.vue'

export default {
  name: 'FDate',
  // components: { ODatePicker },
  mixins: [OFMixin],
  props: {},
  data() {
    return {}
  },
  computed: {},

  watch: {},

  created() {},

  mounted() {},

  methods: {}
}
</script>

<style type="text/css"></style>
