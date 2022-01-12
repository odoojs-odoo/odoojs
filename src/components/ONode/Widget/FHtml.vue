<template>
  <span v-if="invisible"></span>

  <div v-else-if="widget_todo">{{ [field.type, fname, widget] }}</div>

  <div v-else-if="readonly || !editable" :class="className">
    <!-- read: {{ value_display }} -->
    <div class="o_readonly" v-html="value_display"></div>
  </div>

  <div v-else>
    <!-- edit html: {{ [field.type, fname] }}  -->
    <!-- read:
    <div>{{ value_display }}</div>
    <div class="o_readonly" v-html="value_display"></div> -->
    <OEditor
      :res_model="viewInfo.action.res_model"
      :res_id="record.id"
      :value="value"
      :fname="fname"
      :required="required"
      :placeholder="node.attrs.placeholder"
      :element-id="node.attrs.id || node.attrs.name"
      :className="className"
      @on-change="onchange"
    />
  </div>
</template>

<script>
import OFMixin from './OFMixin'

import OEditor from './OInput/OEditor.vue'

export default {
  name: 'FHtml',
  components: { OEditor },
  mixins: [OFMixin],
  props: {},
  data() {
    return {}
  },
  computed: {
    value_readonly() {
      return this.record[this.fname] || ''
    },

    value() {
      return this.value_edit || ''
    },

    value_display() {
      const val = this.value
      if (!val) return val

      const base_api = process.env.VUE_APP_BASE_API

      // str.replace(/需要替换的字符串/g，"新字符串")
      // const v = '<img src="/as1d" /> <img src="/as2d" /> <img src="/a3sd" />'
      const val2 = val.replace(/src="/g, `src="${base_api}`)
      // console.log(val2)
      // console.log(this.value)
      return val2
    },

    widget_todo() {
      const done = []
      return done.includes(this.widget) ? '' : this.widget
    },

    className() {
      const arr = [...this.classNameByField]
      arr.push('o_form_field')
      arr.push('o_form_field_html')
      return arr.join(' ')
    }
  },

  watch: {},

  created() {},

  mounted() {
    console.log(this.viewInfo)
  },

  methods: {}
}
</script>

<style type="text/css"></style>
