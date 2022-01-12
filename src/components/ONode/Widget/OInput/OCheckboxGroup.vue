<template>
  <div>
    <!-- 
    {{ selectionOptions }} -->

    <!-- {{ options }}
    {{ fname }}
    {{ value }}
    {{ value2 }}
    {{ value2[fname] }} -->

    <!-- {{ value2 }} -->

    <a-checkbox-group
      v-model="value2[fname]"
      name="checkboxgroup"
      :options="options"
      :disabled="!editable"
      @change="handleChange"
    />
  </div>
</template>
<script>
import OInputMixin from './OInputMixin'

// eslint-disable-next-line no-unused-vars
const cp = item => JSON.parse(JSON.stringify(item))
export default {
  name: 'OCheckboxGroup',
  components: {},
  mixins: [OInputMixin],
  props: {
    selectionOptions: { type: Array, default: () => [] },
    editable: { type: Boolean, default: false }
  },

  data() {
    return {}
  },

  computed: {
    options() {
      // console.log(this.record[this.fname])
      return this.selectionOptions.map(item => {
        return { value: item[0], label: item[1] }
      })
    }
  },

  async mounted() {},

  methods: {
    handleChange(checkedValues) {
      // console.log(checkedValues)
      this.onchange(checkedValues)
    }
  }
}
</script>

<style type="text/css" scoped></style>
