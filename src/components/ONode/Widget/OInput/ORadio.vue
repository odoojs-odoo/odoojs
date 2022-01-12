<template>
  <div>
    <!-- {{ fname }} -->

    <a-radio-group
      v-model="value2[fname]"
      :options="
        selectionOptions.map(item => {
          return { value: item[0], label: item[1] }
        })
      "
      @change="onChangeRadio"
    />
  </div>
</template>
<script>
import OInputMixin from './OInputMixin'

// eslint-disable-next-line no-unused-vars
const cp = item => JSON.parse(JSON.stringify(item))
export default {
  name: 'ORadio',
  components: {},
  mixins: [OInputMixin],
  props: {
    selectionOptions: { type: Array, default: () => [] }
  },

  data() {
    return {}
  },

  computed: {},

  async mounted() {},

  methods: {
    onChangeRadio(event) {
      const value = event.target.value
      // console.log('onChangeRadio', [this.fname, value, this.selectionOptions])
      this.onchange(value)
    }
  }
}
</script>

<style type="text/css" scoped></style>
