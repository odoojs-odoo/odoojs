<template>
  <span>
    <template v-if="!editable || readonly">
      <img :src="image_url" />
    </template>

    <template v-else> // </template>
  </span>
</template>

<script>
import OFMixin from './OFMixin'

import api from '@/odoorpc'

export default {
  name: 'FString',
  components: {},
  mixins: [OFMixin],
  props: {},
  data() {
    return {}
  },
  computed: {
    image_url() {
      if (this.value_display) {
        return `${api.baseURL}${this.value_display}`
      } else {
        return undefined
      }
    }
  },

  watch: {},

  created() {},

  mounted() {},

  methods: {}
}
</script>

<style type="text/css"></style>
