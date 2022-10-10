<template>
  <span>
    <span>
      {{ title }}
    </span>
    <a-select
      v-model="value2"
      mode="tags"
      style="width: 300px;"
      :placeholder="placeholder"
      @change="handleChange"
    >
    </a-select>
  </span>
</template>

<script>
export default {
  name: 'SearchChar',

  components: {},

  mixins: [],

  props: {
    title: { type: String, default: undefined },
    value: { type: Array, default: () => [] },
    placeholder: { type: String, default: undefined }
  },

  data() {
    return {
      value2: []
    }
  },
  computed: {},
  watch: {
    value: {
      handler: function (val = []) {
        this.value2 = val.map(item => item.string)
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
