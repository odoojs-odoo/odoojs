<template>
  <span>
    <template v-if="!editable || readonly">
      <img :src="image_url" style="width: 50%" />
    </template>

    <template v-else>
      <!-- todo upload img -->
      <img :src="image_url" style="width: 50%" />
    </template>
  </span>
</template>

<script>
// todo
// import OFMixin from './OFMixin'

// import api from '@/odoorpc'

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
        return `data:image/png;base64,${this.value_display}`
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
