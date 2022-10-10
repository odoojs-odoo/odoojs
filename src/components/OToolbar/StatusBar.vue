<template>
  <a-radio-group
    v-model="currentState"
    button-style="solid"
    size="small"
    style="
      float: right;
      margin-right: 10px;
      margin-top: 5px;
      margin-bottom: 5px;
    "
  >
    <template v-for="btn in states">
      <a-radio-button
        style="pointer-events: none"
        :value="btn[0]"
        :key="btn[0]"
      >
        {{ btn[1] }}
      </a-radio-button>
    </template>
  </a-radio-group>
</template>

<script>
export default {
  name: 'StatusBar',

  components: {},

  mixins: [],

  props: {
    states: { type: Array, default: () => [] },
    currentState: { type: String, default: '' }
  },

  data() {
    return {}
  },
  computed: {},
  watch: {},

  async created() {},

  mounted() {},

  methods: {}
}
</script>

<style type="text/css"></style>
