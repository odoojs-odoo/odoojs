<template>
  <a-switch
    v-if="readonly || !editable"
    :class="className"
    v-model="value2"
    @change="handleChange"
  />

  <OSwitch
    v-else
    :value="value"
    :fname="fname"
    :className="className"
    @on-change="onchange"
  />
</template>
<script>
import OWMixin from './OWMixin'

import OSwitch from './OInput/OSwitch.vue'

// eslint-disable-next-line no-unused-vars
const cp = item => JSON.parse(JSON.stringify(item))
export default {
  name: 'WBooleanToggle',
  components: { OSwitch },
  mixins: [OWMixin],
  props: {
    fieldClassName: { type: String, default: '' }
  },

  data() {
    return {
      value2: undefined
    }
  },

  computed: {
    className() {
      const arr = [...this.classNameByField]
      // arr.push('o_field_....')
      return arr.join(' ')
    }
  },

  watch: {
    // eslint-disable-next-line no-unused-vars
    value_readonly(newValue, oldValue) {
      // console.log('boole value', this.fname, newValue, oldValue)
      if ([true, false].includes(this.value_readonly))
        this.value2 = this.value_readonly
      // if (this.value_readonly !== undefined)       this.value2 = this.value_readonly
    }
  },

  async mounted() {
    // console.log('boole mounted', this.fname, this.value_readonly)
    if ([true, false].includes(this.value_readonly))
      this.value2 = this.value_readonly
    // if (this.value_readonly !== undefined) this.value2 = this.value_readonly
  },

  methods: {
    async handleChange(value) {
      // console.log(value)
      this.$emit('on-event', 'on-write', { [this.fname]: value })
    }
  }
}
</script>

<style type="text/css" scoped></style>
