<template>
  <span v-if="readonly || !editable">
    <span>
      {{ value_display }}
    </span>
  </span>
  <div v-else>
    <ODatePicker
      v-model="value2"
      :width="width"
      :show-time="true"
      @change="handleChange"
    />

    <!-- edit: {{ [fieldInfo.type, fname] }} -->
  </div>
</template>

<script>
import OFMixin from './OFMixin'
import ODatePicker from '@/components/OInput/ODatePicker.vue'

export default {
  name: 'FDatetime',
  components: { ODatePicker },
  mixins: [OFMixin],
  props: {
    value: { type: String, default: null }
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
