<template>
  <span v-if="invisible"></span>

  <!--  -->
  <span v-else-if="widget === 'many2many_tags_email'">
    todo: many2many_tags_email
    <WM2mTags
      :value_readonly="value_readonly"
      :value_edit="value_edit"
      :editable="editable"
      :data-info="dataInfo"
      :view-info="{ ...viewInfo, node }"
      @on-change="onchange"
    />
  </span>

  <WM2mTags
    v-else-if="widget === 'many2many_tags'"
    :value_readonly="value_readonly"
    :value_edit="value_edit"
    :editable="editable"
    :data-info="dataInfo"
    :view-info="{ ...viewInfo, node }"
    @on-change="onchange"
  />

  <span v-else-if="widget === 'many2many_checkboxes'">
    <WM2mCheckboxes
      :value_readonly="value_readonly"
      :value_edit="value_edit"
      :editable="editable"
      :data-info="dataInfo"
      :view-info="{ ...viewInfo, node }"
      @on-change="onchange"
    />
  </span>

  <span v-else-if="widget === 'many2many_binary'">
    <WM2mBinary
      :value_readonly="value_readonly"
      :value_edit="value_edit"
      :editable="editable"
      :data-info="dataInfo"
      :view-info="{ ...viewInfo, node }"
      @on-change="onchange"
    />
  </span>

  <div v-else-if="widget_todo">
    todo: {{ [field.type, fname, widget] }}
    {{ [value_display, record[fname]] }}
  </div>
  <div v-else>
    <!-- m2m non widget {{ [field.type, fname, widget] }} -->

    <WX2mView
      :value_readonly="value_readonly"
      :value_edit="value_edit"
      :editable="editable"
      :data-info="dataInfo"
      :view-info="{ ...viewInfo, node }"
      @on-change="onchange"
    />
  </div>
</template>

<script>
import OFMixin from './OFMixin'

import WM2mTags from './WM2mTags.vue'
import WM2mCheckboxes from './WM2mCheckboxes.vue'

import WM2mBinary from './WM2mBinary.vue'

import WX2mView from './WX2mView.vue'

export default {
  name: 'FMany2many',
  components: { WM2mTags, WM2mCheckboxes, WM2mBinary, WX2mView },
  mixins: [OFMixin],
  props: {},
  data() {
    return {}
  },
  computed: {
    value_edit() {
      if (this.fname in this.values) return this.values[this.fname]
      else {
        const val = this.record[this.fname]
        if (val && val.length) return [[6, false, val]]
        else return []
      }
    },

    widget_todo() {
      // widget="many2many"
      // widget="many2many_binary"
      // widget="many2many_tags_email"

      const done = []
      return done.includes(this.widget) ? '' : this.widget
    },

    className() {
      const arr = [...this.classNameByField]
      // TODO

      return arr.join(' ')
    }
  },

  watch: {},

  created() {},

  async mounted() {},

  methods: {}
}
</script>

<style type="text/css"></style>
