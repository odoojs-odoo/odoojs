<template>
  <div :class="className">
    <img
      :src="image_url"
      :title="value_readonly"
      alt="图像"
      :style="img_style"
    />
  </div>
</template>

<script>
import OWMixin from './OWMixin'

export default {
  name: 'WAttachmentImage',
  components: {},
  mixins: [OWMixin],
  props: {},
  data() {
    return {}
  },
  computed: {
    className() {
      const arr = [...this.classNameByField]
      arr.push('o_attachment_image')
      return arr.join(' ')
    },
    image_url() {
      const baseURL = process.env.VUE_APP_BASE_API
      const baseURL2 = '/web/image'
      return `${baseURL}${baseURL2}/${this.value_display}?unique=1`
    },
    img_style() {
      return 'width: 100%'
    }
  },

  watch: {},

  created() {},

  mounted() {},

  methods: {}
}
</script>

<style type="text/css"></style>
