<template>
  <span v-if="invisible"></span>
  <div v-else-if="widget === 'image_url'">
    <!--  {{ [field.type, fname, widget] }} -->

    <WImage
      :value_readonly="value_readonly"
      :editable="editable"
      :data-info="dataInfo"
      :view-info="{ ...viewInfo, node }"
      @on-change="onchange"
    />
  </div>

  <div v-else-if="widget === 'text'">
    <!-- widget: text -->
    <span v-if="readonly || !editable" :class="className">
      <!-- {{ [field.type, fname] }} -->
      {{ value_display }}
    </span>

    <div v-else>
      <OInput
        :value="value"
        type="text"
        :fname="fname"
        :required="required"
        :placeholder="node.attrs.placeholder"
        :element-id="node.attrs.id || node.attrs.name"
        :className="className"
        @on-change="onchange"
      />
    </div>
  </div>

  <div v-else-if="widget_todo">todo: {{ [field.type, fname, widget] }}</div>

  <span v-else-if="readonly || !editable" :class="className">
    <!-- {{ [field.type, fname] }} -->
    {{ value_display }}
  </span>
  <div v-else>
    <!-- edit: {{ [field.type, fname] }} -->
    <OInput
      :value="value"
      :type="undefined"
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
import WImage from './WImage.vue'
import OInput from './OInput/OInput.vue'

export default {
  name: 'FChar',
  components: { OInput, WImage },
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
      // CopyClipboardChar

      const done = [
        'mobile',
        'phone',
        'url',
        'email',
        'field_partner_autocomplete',
        'section_and_note_text'
      ]
      return done.includes(this.widget) ? '' : this.widget
    },

    className() {
      // console.log(this.fname, this.node, this.record)
      const arr = [...this.classNameByField]
      arr.push('o_field_char')
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
