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
  computed: {},

  watch: {},

  created() {},

  mounted() {},

  methods: {}
}
</script>

<style type="text/css"></style>
