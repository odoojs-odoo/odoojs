<template>
  <div>
    <!-- M2mCheckboxs
    {{ selectionOptions }} -->

    <a-checkbox-group
      v-model="value2[fname]"
      name="checkboxgroup"
      :options="options"
      :disabled="!editable"
      @change="onChange"
    />
  </div>
  <!-- <a-switch v-model="value2[fname]" @change="handleChange" /> -->
  <!-- <a-form-model ref="ruleForm" :model="value2" :rules="rules">
    <a-form-model-item :prop="fname">
      <a-switch v-model="value2[fname]" @change="handleChange" />
    </a-form-model-item>
  </a-form-model> -->
</template>
<script>
import inputMixin from './inputMixin'

// eslint-disable-next-line no-unused-vars
const cp = item => JSON.parse(JSON.stringify(item))
export default {
  name: 'M2mCheckboxs',
  components: {},
  mixins: [inputMixin],
  props: {
    selectionOptions: { type: Array, default: () => [] },
    editable: { type: Boolean, default: false }
  },

  data() {
    const plainOptions = [
      { label: 'Apple', value: 1 },
      { label: 'Pear', value: 2 },
      { label: 'Orange', value: 3 }
    ]

    return {
      value: [],
      plainOptions
    }
  },

  computed: {
    options() {
      console.log(this.dataDict[this.fname])
      return this.selectionOptions.map(item => {
        return { value: item[0], label: item[1] }
      })
    }
  },

  async mounted() {},

  methods: {
    onChange(checkedValues) {
      this.handleChange(checkedValues)
    },

    handleChange(value) {
      this.$emit('on-change', value)
    }
  }
}
</script>

<style type="text/css" scoped></style>
