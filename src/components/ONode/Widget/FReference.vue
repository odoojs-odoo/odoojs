<template>
  <span v-if="invisible"></span>

  <div v-else-if="widget_todo">{{ [field.type, fname, widget] }}</div>

  <span v-else-if="readonly || !editable" :class="className">
    <!-- {{ [field.type, fname] }} -->
    {{ value_display }}
  </span>

  <div v-else>
    edit: {{ [field.type, fname] }}
    <!-- <OInput
   
    :value="value"
    type="text"
    :fname="fname"
    :required="required"
    :placeholder="node.attrs.placeholder"
    :element-id="node.attrs.id || node.attrs.name"
    :className="className"
    @on-change="onchange"
  /> -->
  </div>

  <!-- <span v-else> TODO:edit, {{ record[fname] }} </span> -->
</template>

<script>
import OFMixin from './OFMixin'

// import OInput from './OInput/OInput.vue'

export default {
  name: 'FReference',
  //   components: { OInput },
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

    widget_todo() {
      const done = []
      return done.includes(this.widget) ? '' : this.widget
    },

    className() {
      const arr = [...this.classNameByField]
      //   arr.push('o_field_text')

      return arr.join(' ')
    }
  },

  watch: {},

  created() {},

  mounted() {},

  methods: {}
}
</script>

<style type="text/css"></style>
