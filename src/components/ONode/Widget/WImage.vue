<template>
  <div v-if="readonly || !editable" :class="className">
    <!-- {{ widget }} -->
    <!-- <a-divider> </a-divider> -->
    <!-- img {{ image_url }} -->
    <img
      class="img img-fluid"
      :src="image_url"
      alt="二进制文件"
      :style="img_style"
    />
  </div>

  <div v-else>
    <!-- edit: img:{{ image_url }} -->
    <Upload :imageUrl="image_url" @on-change="onchange" />
  </div>
</template>

<script>
import OWMixin from './OWMixin'
import api from '@/odooapi'

import Upload from './OInput/Upload.vue'

export default {
  name: 'WImage',
  components: { Upload },
  mixins: [OWMixin],
  props: {},
  data() {
    return {}
  },
  computed: {
    className() {
      const arr = [...this.classNameByField]
      arr.push('o_field_image')
      if (this.widget === 'many2one_avatar_user') arr.push('o_m2o_avatar')

      return arr.join(' ')
    },

    img_style() {
      if (this.widget === 'many2one_avatar_user') return 'width: 30%'
      else {
        return 'width: 30%'
        // return undefined
      }
    },

    //

    image_url() {
      const record = this.record
      // console.log(api)
      // console.log('image_url,  ', this, this.editable)
      const url = api.Node.image_url(this.viewInfo, record)
      return url
    }
  },

  watch: {},

  created() {},

  mounted() {},

  methods: {}
}
</script>

<style type="text/css"></style>
