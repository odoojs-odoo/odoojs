<template>
  <div>
    <!-- client home {{ action.id }} -->

    <div>TODO:{{ action.id }}</div>
  </div>
</template>

<script>
import api from '@/odooapi'

export default {
  name: 'Client',

  components: {},

  mixins: [],

  props: {
    viewInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },

  data() {
    return {}
  },
  computed: {
    action() {
      const { action = {} } = this.viewInfo
      return action
    }
  },
  watch: {},

  async created() {},

  mounted() {},

  methods: {
    onclick() {
      console.log([api])
    }
  }
}
</script>

<style type="text/css"></style>
