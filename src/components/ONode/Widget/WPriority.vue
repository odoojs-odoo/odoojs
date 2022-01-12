<template>
  <div v-if="readonly || !editable" :class="className">
    <!-- WPriority {{ [field.type, fname] }}
    <span>
      {{ value_display }}
    </span>
    {{ value }}
    {{ selectionOptions }} -->

    <ORate
      :value="value"
      :selectionOptions="selectionOptions"
      :fname="fname"
      :required="required"
      :placeholder="node.attrs.placeholder"
      :element-id="node.attrs.id || node.attrs.name"
      :className="className"
      @on-change="handleOnchange"
    />
  </div>

  <ORate
    v-else
    :value="value"
    :selectionOptions="selectionOptions"
    :fname="fname"
    :required="required"
    :placeholder="node.attrs.placeholder"
    :element-id="node.attrs.id || node.attrs.name"
    :className="className"
    @on-change="onchange"
  />
</template>

<script>
import OWMixin from './OWMixin'
import ORate from './OInput/ORate.vue'

export default {
  name: 'WPriority',
  components: { ORate },
  mixins: [OWMixin],
  props: {
    selectionOptions: { type: Array, default: () => [] }
  },
  data() {
    return {}
  },
  computed: {
    value() {
      return Number(this.value_edit || '0')
    },

    className() {
      const arr = [...this.classNameByField]
      return arr.join(' ')
    }
  },

  watch: {},

  created() {},

  mounted() {},

  methods: {
    async handleOnchange(value) {
      // console.log('handleOnchange', [this.fname, value])
      this.$emit('on-event', 'on-write', { [this.fname]: value })
    }
  }
}
</script>

<style type="text/css"></style>
