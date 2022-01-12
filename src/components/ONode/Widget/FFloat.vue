<template>
  <span v-if="invisible"></span>
  <!-- :fieldClassName="className"
    :editable="editable" -->
  <WStatinfo
    v-else-if="widget === 'statinfo'"
    :value_readonly="value_readonly"
    :data-info="dataInfo"
    :view-info="{ ...viewInfo, node }"
  />

  <WMonetary
    v-else-if="widget === 'monetary'"
    :value_readonly="value_readonly"
    :value_edit="value_edit"
    :editable="editable"
    :data-info="dataInfo"
    :view-info="{ ...viewInfo, node }"
    @on-change="onchange"
  />

  <WInteger
    v-else-if="widget === 'integer'"
    :value_readonly="value_readonly"
    :value_edit="value_edit"
    :editable="editable"
    :data-info="dataInfo"
    :view-info="{ ...viewInfo, node }"
    @on-change="onchange"
  />

  <div v-else-if="widget_todo">{{ [field.type, fname, widget] }}</div>

  <div v-else-if="readonly || !editable" :class="className">
    <!-- {{ [field.type, fname] }} -->
    <span>
      {{ value_display }}
    </span>
  </div>
  <div v-else>
    <!-- edit: {{ [field.type, fname] }} -->
    <OInput
      :value="value"
      type="number"
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
import WStatinfo from './WStatinfo.vue'
import WMonetary from './WMonetary.vue'
import WInteger from './WInteger.vue'
import OInput from './OInput/OInput.vue'

export default {
  name: 'FWidget',
  components: { WStatinfo, WMonetary, WInteger, OInput },
  mixins: [OFMixin],
  props: {},
  data() {
    return {}
  },
  computed: {
    value_readonly() {
      return this.record[this.fname] || 0
    },

    widget_todo() {
      const done = ['product_discount', 'float', 'percentage']
      return done.includes(this.widget) ? '' : this.widget
    },

    className() {
      const arr = [...this.classNameByField]
      arr.push('o_field_float')

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
