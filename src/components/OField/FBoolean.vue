<template>
  <span v-if="readonly || !editable">
    <a-checkbox :checked="value_display" disabled />
  </span>
  <div v-else>
    <a-checkbox v-model="value2" @change="handleChange" />
  </div>
</template>

<script>
import OFMixin from './OFMixin'

export default {
  name: 'FBoolean',
  // components: { OInput },
  mixins: [OFMixin],
  props: {
    value: { type: Boolean, default: false }
  },
  data() {
    return {}
  },
  computed: {},

  watch: {},

  created() {},

  mounted() {},

  methods: {
    async handleChange(e) {
      const value = e.target.checked
      this.$emit('change', this.fieldInfo.name, value)
    }
  }
}
</script>

<style type="text/css"></style>
