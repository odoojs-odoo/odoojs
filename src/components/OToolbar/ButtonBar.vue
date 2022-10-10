<template>
  <div>
    <!-- ButtonBar

    {{ buttons }} -->

    <a-space>
      <template v-for="(btn, index) in buttons">
        <a-button
          :key="index"
          :type="btn.btn_type"
          @click="handleBtnClicked(btn)"
           size="small"
           style=" margin-top: 5px;margin-left: 10px;"
        >
          {{ btn.string }}
        </a-button>
      </template>
    </a-space>
  </div>
</template>

<script>
export default {
  name: 'ButtonBar',
  components: {},
  mixins: [],

  props: {
    buttons: { type: Array, default: () => [] }
  },

  data() {
    return {}
  },
  computed: {},
  watch: {},

  async created() {},

  mounted() {},

  methods: {
    async handleBtnClicked(btn) {
      const { type, name } = btn
      console.log('handleBtnClicked', btn)
      this.$emit('button-clicked', { type, name })
    }
  }
}
</script>

<style type="text/css"></style>
