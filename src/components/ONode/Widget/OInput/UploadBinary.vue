<template>
  <div>
    <!-- UploadBinary -->

    <a-upload
      :file-list="fileList2"
      :customRequest="customRequest"
      @change="handleChange"
    >
      <a-button> <a-icon type="upload" /> Upload </a-button>
    </a-upload>
  </div>
</template>
<script>
import api from '@/odooapi'

// eslint-disable-next-line no-unused-vars
const cp = item => JSON.parse(JSON.stringify(item))

export default {
  name: 'UploadBinary',
  components: {},
  mixins: [],
  props: {
    fileList: { type: Array, default: () => [] }
  },

  data() {
    return {}
  },

  computed: {
    fileList2: {
      get() {
        return this.fileList.map(item => {
          return { uid: item.id, ...item }
        })
      }
    }
  },

  async mounted() {},

  methods: {
    async customRequest(payload) {
      // console.log(' customRequest ', payload)
      const { file } = payload
      const attach = await api.web.binary2.upload_attachment_one({ file })
      // console.log(' customRequest2 ', attach)
      const fileList = [...this.fileList, attach]

      this.$emit('on-change', fileList)
    },

    handleChange(info) {
      // console.log('handleChange', info)
      const { file } = info

      if (file.status === 'removed') {
        const fileList = this.fileList.filter(item => item.id !== file.id)
        this.$emit('on-change', fileList)
        return
      } else {
        //
      }
    }

    // beforeUpload(file) {
    //   console.log('beforeUpload', file)
    // }
  }
}
</script>

<style type="text/css" scoped></style>
