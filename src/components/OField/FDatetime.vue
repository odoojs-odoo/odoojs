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

const _date_format = date => {
  const year = date.getFullYear().toString().padStart(4, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')

  const hh = date.getHours().toString().padStart(2, '0')
  const mm = date.getMinutes().toString().padStart(2, '0')
  const ss = date.getSeconds().toString().padStart(2, '0')

  const today_str = `${year}-${month}-${day} ${hh}:${mm}:${ss}`
  return today_str
}

const date_format = date => {
  if (date && typeof date === 'object') {
    return _date_format(date)
  } else {
    return date
  }
}

export default {
  name: 'FDatetime',
  components: { ODatePicker },
  mixins: [OFMixin],
  props: {
    value: { type: [String, Date], default: null }
  },
  data() {
    return {}
  },
  computed: {
    value_readonly() {
      return date_format(this.record[this.fname])
    },

    value_edit() {
      // this.editable ?
      if (this.fname in this.values) {
        return date_format(this.values[this.fname])
      } else {
        return this.value_readonly
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
