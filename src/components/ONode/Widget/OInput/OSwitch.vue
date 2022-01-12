<template>
  <a-switch v-model="value2[fname]" @change="handleChange" />
</template>

<script>
import OInputMixin from './OInputMixin'

export default {
  name: 'OSwitch',
  components: {},
  mixins: [OInputMixin],

  props: {},

  data() {
    return {}
  },
  computed: {},

  watch: {},

  async created() {},

  mounted() {},

  methods: {
    async handleChange(value) {
      //   console.log(value)
      this.onchange(value)
    }
  }
}
</script>

<style type="text/css" scoped></style>
