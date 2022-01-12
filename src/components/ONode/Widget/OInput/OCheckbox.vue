<template>
  <!-- <div>
    <div>{{ value2[fname] }}</div>
    <a-checkbox v-model="value2[fname]" @change="handleChange" />
  </div> -->

  <a-checkbox
    v-model="value2[fname]"
    :id="elementId"
    :class="className2"
    @change="handleChange"
  />
</template>

<script>
import OInputMixin from './OInputMixin'

export default {
  name: 'OCheckbox',
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
      // console.log(value)
      const checked = value.target.checked
      this.onchange(checked)
    }
  }
}
</script>

<style type="text/css" scoped></style>
