<template>
  <span>
    <template v-if="!editable || readonly">
      {{ value_display }}
    </template>

    <template v-else>
      <OInputNumber v-model="value2" :width="width" @change="handleChange" />
    </template>
  </span>
</template>

<script>
import OFMixin from './OFMixin'
import OInputNumber from '@/components/OInput/OInputNumber.vue'

export default {
  name: 'FNumber',
  components: { OInputNumber },
  mixins: [OFMixin],
  props: {
    value: { type: Number, default: 0 }
  },
  data() {
    return {}
  },
  computed: {
    value_display() {
      const value = this.value_edit
      if (this.fieldInfo.widget === 'monetary') {
        const value2 = value || 0.0
        const value3 = value2.toFixed(2)
        return value3
      } else {
        return value
      }
    }
  },

  watch: {},

  created() {},

  mounted() {},

  methods: {}
}
</script>

<style type="text/css"></style>
