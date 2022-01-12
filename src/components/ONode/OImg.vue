<template>
  <span>
    <img :class="className" :src="img_url(node.attrs.src)" width="20%" />
  </span>
</template>

<script>
import OMixin from './OMixin'

export default {
  name: 'OImg',
  components: {},
  mixins: [OMixin],

  props: {},

  data() {
    return {}
  },
  computed: {
    className() {
      const arr = [...this.classNameByNode]
      //   arr.push('o_horizontal_separator')

      return arr.join(' ')
    }
  },

  async created() {},

  mounted() {
    // console.log(this.node)
  },

  methods: {
    img_url(src) {
      const base_api = process.env.VUE_APP_BASE_API
      const pre = src.slice(0, base_api.length)
      // console.log([base_api, pre, src])
      if (base_api === pre) {
        return src
      } else {
        return `${base_api}${src}`
      }
    }
  }
}
</script>

<style type="text/css"></style>
