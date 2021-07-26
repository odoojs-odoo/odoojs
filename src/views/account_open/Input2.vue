<template>
  <Input
    v-model="value2"
    :element-id="elementId"
    :type="type"
    :number="number"
    :placeholder="placeholder"
    style="width: 200px"
    @on-change="onInputChange"
    @on-enter="onInputEnter"
    @on-blur="onInputBlur"
  />
</template>

<script>
export default {
  name: 'OInput',
  components: {},

  props: {
    value: { type: [String, Number, Boolean, Array, Date], default: undefined },
    elementId: { type: String, default: undefined },
    type: { type: String, default: undefined },
    number: { type: Boolean, default: undefined },
    placeholder: { type: String, default: undefined }
  },

  data() {
    return {
      changed: false
    }
  },
  computed: {
    value2: {
      get() {
        return this.value
      },
      set(/*value*/) {
        // console.log(' value2, ', value, typeof value)
        // this.$emit('input', value)
      }
    }
  },

  async created() {},

  mounted() {},

  methods: {
    onInputChange() {
      this.changed = true
    },

    _onInputEnterAndBlur(event) {
      if (this.changed) {
        this.changed = false
        const value = event.target.value

        const value2 = this.type === 'number' ? Number(value) : value
        this.onchange(value2)
      }
    },

    onInputEnter(event) {
      this._onInputEnterAndBlur(event)
    },

    onInputBlur(event) {
      this._onInputEnterAndBlur(event)
    },

    onchange(value, text) {
      console.log('handleOnchange', [this.fname, value, text])
      this.$emit('on-change', value, text)
    }
  }
}
</script>

<style type="text/css">
.input-required :nth-last-child(1) {
  color: red !important;
  background-color: dodgerblue;
}
</style>
