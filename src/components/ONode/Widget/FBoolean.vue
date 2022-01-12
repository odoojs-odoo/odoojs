<template>
  <span v-if="invisible"></span>
  <div v-else-if="widget === 'boolean_toggle'">
    <!-- widget,boolean_toggle -->
    <WBooleanToggle
      :value_readonly="value_readonly"
      :value_edit="value_edit"
      :editable="editable"
      :data-info="dataInfo"
      :view-info="{ ...viewInfo, node }"
      @on-change="onchange"
      @on-event="handleOnEvent"
    />
  </div>

  <div v-else-if="widget === 'boolean_favorite'">
    <!-- widget,boolean_favorite -->
    <WBooleanFavorite
      :value_readonly="value_readonly"
      :value_edit="value_edit"
      :editable="editable"
      :data-info="dataInfo"
      :view-info="{ ...viewInfo, node }"
      @on-change="onchange"
      @on-event="handleOnEvent"
    />
  </div>

  <div v-else-if="widget_todo">{{ [field.type, fname, widget] }}</div>

  <span v-else-if="readonly || !editable" :class="className">
    <!-- {{ [field.type, fname, value] }} -->
    <a-checkbox v-model="value_display" disabled />
  </span>

  <!-- <span v-else> {{ [field.type, fname] }} </span> -->
  <OCheckbox
    v-else
    :value="value"
    :fname="fname"
    :required="required"
    :placeholder="node.attrs.placeholder"
    :element-id="node.attrs.id || node.attrs.name"
    :className="className"
    @on-change="onchange"
  />
</template>

<script>
import OFMixin from './OFMixin'

import WBooleanToggle from './WBooleanToggle.vue'
import WBooleanFavorite from './WBooleanFavorite.vue'

import OCheckbox from './OInput/OCheckbox.vue'

export default {
  name: 'FBoolean',
  components: { WBooleanToggle, WBooleanFavorite, OCheckbox },
  mixins: [OFMixin],
  props: {},
  data() {
    return {}
  },
  computed: {
    widget_todo() {
      // upgrade_boolean,  勾选后 , 触发 企业版 操作

      const done = ['upgrade_boolean']
      return done.includes(this.widget) ? '' : this.widget
    },

    className() {
      const arr = [...this.classNameByField]
      arr.push('o_field_boolean')

      return arr.join(' ')
    }
  },

  watch: {},
  created() {},

  async mounted() {},

  methods: {}
}
</script>

<style type="text/css">
  .o_field_widget {

  }
  .o_field_boolean {
    top: 7px;
    left: 2px;
    right: auto;
    position: relative;
  }
</style>
