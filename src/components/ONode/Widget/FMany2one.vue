<template>
  <span v-if="invisible"></span>

  <WRadio
    v-else-if="widget === 'radio'"
    :value_readonly="value_readonly"
    :value_edit="value_edit"
    :selectionOptions="selectionOptions || []"
    :editable="editable"
    :data-info="dataInfo"
    :view-info="{ ...viewInfo, node }"
    @on-change="handleSelectionChange"
  />

  <WSelection
    v-else-if="widget === 'selection'"
    :value_readonly="value_readonly"
    :value_edit="value_edit"
    :selectionOptions="selectionOptions || []"
    :editable="editable"
    :data-info="dataInfo"
    :view-info="{ ...viewInfo, node }"
    @on-change="handleSelectionChange"
  />

  <div v-else-if="widget === 'attachment_image'">
    <!-- todo: {{ [field.type, fname, widget] }}
    {{ value_display }} -->
    <!-- {{ [field.type, fname, widget, value_display] }} -->

    <WAttachmentImage
      :value_readonly="value_readonly"
      :value_edit="value_edit"
      :data-info="dataInfo"
      :view-info="{ ...viewInfo, node }"
    />
  </div>

  <div
    v-else-if="
      ['many2one_avatar_user', 'many2one_avatar_employee'].includes(widget)
    "
  >
    <!-- {{ value_display }} -->
    <WImage
      :value_readonly="value_readonly"
      :editable="editable"
      :data-info="dataInfo"
      :view-info="{ ...viewInfo, node }"
      @on-change="onchange"
    />
  </div>

  <div v-else-if="widget_todo">
    todo: {{ [field.type, fname, widget] }}
    {{ value_display }}
    {{ selectionOptions }}
  </div>

  <a v-else-if="readonly || !editable" :class="className">
    <!-- {{ [field.type, fname, widget] }} -->
    <span> {{ value_readonly }} </span>
  </a>

  <div v-else>
    <!-- edit m2o:   -->
    <OSearchSelect
      :value="value_with_label"
      :fname="fname"
      :required="required"
      :placeholder="node.attrs.placeholder"
      :element-id="node.attrs.id || node.attrs.name"
      :className="className"
      :limit="7"
      mode="default"
      :optionsMethod="optionsMethod"
      @on-change="onchange"
    />
  </div>
</template>

<script>
import api from '@/odooapi'
import OFMixin from './OFMixin'

import WRadio from './WRadio.vue'
import WSelection from './WSelection.vue'
import WImage from './WImage.vue'

import WAttachmentImage from './WAttachmentImage.vue'

import OSearchSelect from './OInput/OSelect/OSearchSelect.vue'

const widget_to_load_options = ['selection', 'radio']

export default {
  name: 'FMany2one',
  components: { WRadio, WSelection, WImage, WAttachmentImage, OSearchSelect },
  mixins: [OFMixin],
  props: {},
  data() {
    return {
      selectionOptions: undefined
    }
  },
  computed: {
    value_readonly() {
      const val = this.record[this.fname]
      return val ? val[1] : ''
    },

    value_edit() {
      if (this.fname in this.values) {
        const val = this.record[this.fname]
        return val ? val[0] : undefined
      } else {
        const val = this.record[this.fname]
        return val ? val[0] : undefined
      }
    },

    value_with_label() {
      if (this.fname in this.values) {
        const val = this.values[this.fname]
        return val || undefined
      } else {
        const val = this.record[this.fname]
        return val || undefined
      }
    },

    widget_todo() {
      // many2one_avatar_user
      // many2one_avatar_employee
      // res_partner_many2one
      // many2one_barcode
      // product_configurator
      const done = [
        'res_partner_many2one',
        // 'many2one_avatar_user',
        'many2one_barcode',
        'product_configurator'
      ]
      return done.includes(this.widget) ? '' : this.widget
    },

    className() {
      const arr = [...this.classNameByField]
      arr.push('o_form_uri')
      return arr.join(' ')
    }
  },

  watch: {
    // eslint-disable-next-line no-unused-vars
    'dataInfo.ready'(newValue, oldValue) {
      if (widget_to_load_options.includes(this.widget)) {
        if (newValue && !this.selectionOptions) {
          // console.log('m2o, watch ready', this.fname, newValue)
          this.load_select_options()
        }
      }
    }
  },

  created() {},

  mounted() {
    if (widget_to_load_options.includes(this.widget)) {
      if (this.dataInfo.ready && !this.selectionOptions) {
        // console.log('m2o,selection, mounted', [this.fname, this.field])
        this.load_select_options()
      }
    }
  },

  methods: {
    async load_select_options() {
      // console.log(this.field)
      const ops = await this.optionsMethod({ name: '', limit: 0 })
      this.selectionOptions = ops
      // console.log(ops)
    },
    optionsMethod(payload = {}) {
      // console.log('get_options', payload, this.values)
      return api.Node.get_selection(this.viewInfo, {
        record: this.record,
        values: this.values,
        field: this.fname,
        ...payload
      })
    },

    handleSelectionChange(value) {
      const label = this.selectionOptions.find(item => item[0] === value)
      this.onchange([value, label ? label[1] : ''])
    }
  }
}
</script>

<style type="text/css"></style>
