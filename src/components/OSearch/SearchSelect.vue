<template>
  <span>
    <span>
      {{ title }}
    </span>

    <a-checkbox-group
      v-model="value2"
      name="checkboxgroup"
      :options="options2"
      @change="handleChange"
    />
  </span>
</template>

<script>
export default {
  name: 'SearchDefault',

  components: {},

  mixins: [],

  props: {
    title: { type: String, default: undefined },
    value: { type: Array, default: () => [] },
    options: { type: Array, default: () => [] }
    // placeholder: { type: String, default: undefined }
  },

  data() {
    return {
      value2: []
    }
  },
  computed: {
    options2() {
      return this.options.map(item => {
        return { value: item[0], label: item[1] }
      })
    }
  },
  watch: {
    value: {
      handler: function (val = []) {
        // console.log(val)
        this.value2 = val.map(item => item.name)
      },
      deep: true
    }
  },

  async created() {},

  mounted() {},

  methods: {
    handleChange(value) {
      // console.log(value)
      this.$emit('change', value)
    }
  }
}
</script>

<style type="text/css"></style>
