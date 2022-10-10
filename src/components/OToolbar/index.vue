<template>
  <a-row>
    <a-col :span="12">
      <ButtonBar
        v-if="!editable"
        :buttons="buttons"
        @button-clicked="handleBtnClicked"
      />
    </a-col>
    <a-col :span="12">
      <template v-if="states.length">
        <StatusBar :current-state="currentState" :states="states" />
      </template>
    </a-col>
  </a-row>
</template>

<script>
import ButtonBar from './ButtonBar.vue'
import StatusBar from './StatusBar.vue'

export default {
  name: 'OToolBar',

  components: { ButtonBar, StatusBar },

  mixins: [],

  props: {
    editable: { type: Boolean, default: false },
    buttons: { type: Array, default: () => [] },
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

  methods: {
    async handleBtnClicked(btn) {
      this.$emit('button-clicked', btn)
    }
  }
}
</script>

<style type="text/css"></style>
