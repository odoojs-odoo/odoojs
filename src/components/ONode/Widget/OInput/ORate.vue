<template>
  <div @click="onclick">
    <!-- {{ fname }}
    {{ selectionOptions }}
     -->

    <a-rate
      v-model="value2[fname]"
      :count="selectionOptions.length - 1"
      @change="onChange"
    />
  </div>
</template>
<script>
import OInputMixin from './OInputMixin'

// eslint-disable-next-line no-unused-vars
const cp = item => JSON.parse(JSON.stringify(item))
export default {
  name: 'ORate',
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
    onclick(e) {
      // console.log('onclick rate')
      e.preventDefault()
      e.stopPropagation()
    },
    onChange(value) {
      console.log('onChange rate')
      // console.log('onChangeRadio', [
      //   this.fname,
      //   value,
      //   typeof value,
      //   this.selectionOptions
      // ])

      this.onchange(value.toString())
    }
  }
}
</script>

<style lang="less">
.o_field_widget {
  .ant-rate {
    position: relative;
    top: 0px;
    left: 0px;
  }
}
</style>
