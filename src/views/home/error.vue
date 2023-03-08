<template>
  <div>
    <div>Error page</div>

    <div>action_id:{{ [action_id] }} 没有定义 todo</div>

    <div>-----</div>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',
  components: {},
  mixins: [],

  data() {
    return {
      action_id: ''
    }
  },
  computed: {},
  watch: {},

  async created() {},

  mounted() {
    const query = this.$route.query
    const { action } = query
    this.action_id = action
  },

  methods: {}
}
</script>

<style type="text/css"></style>
