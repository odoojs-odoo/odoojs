<template>
  <div>
    <!-- upload -->

    <a-icon type="rest" theme="filled" @click="handleDelete" />
    <a-upload
      name="avatar"
      list-type="picture-card"
      class="avatar-uploader"
      :show-upload-list="false"
      :before-upload="beforeUpload"
      :customRequest="customRequest"
      @change="handleChange"
    >
      <img
        v-if="updated ? imageUrl2 : imageUrl"
        :src="updated ? imageUrl2 : imageUrl"
        alt="avatar"
        width="100%"
      />
      <div v-else>
        <a-icon :type="loading ? 'loading' : 'plus'" />
        <div class="ant-upload-text">Upload</div>
      </div>
    </a-upload>
  </div>
</template>
<script>
// import OInputMixin from './OInputMixin'

// eslint-disable-next-line no-unused-vars
const cp = item => JSON.parse(JSON.stringify(item))

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

export default {
  name: 'Upload',
  components: {},
  // mixins: [OInputMixin],
  props: {
    imageUrl: { type: String, default: undefined }
  },

  data() {
    return {
      loading: false,
      imageUrl2: undefined,
      updated: false
    }
  },

  computed: {},

  async mounted() {},

  methods: {
    handleDelete() {
      this.imageUrl2 = undefined
      this.updated = true
      this.$emit('on-change', false)
    },
    handleChange(info) {
      console.log('handleChange', info)
      // if (info.file.status === 'uploading') {
      //   this.loading = true
      //   return
      // }
      // if (info.file.status === 'done') {
      //   // Get this url from response in real world.
      //   getBase64(info.file.originFileObj, imageUrl => {
      //     this.imageUrl = imageUrl
      //     this.loading = false
      //   })
      // }
    },
    customRequest(payload) {
      console.log(' customRequest ', payload)

      const { file } = payload

      getBase64(file, imageUrl => {
        // console.log(typeof imageUrl)
        // console.log(imageUrl)
        this.imageUrl2 = imageUrl
        this.updated = true
        this.loading = false

        // data:image/jpeg;base64,
        const value = imageUrl.slice(23)

        this.$emit('on-change', value)
      })
    },
    beforeUpload(file) {
      console.log('beforeUpload', file)
      // return false
      // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      // if (!isJpgOrPng) {
      //   this.$message.error('You can only upload JPG file!')
      // }
      // const isLt2M = file.size / 1024 / 1024 < 2
      // if (!isLt2M) {
      //   this.$message.error('Image must smaller than 2MB!')
      // }
      // return isJpgOrPng && isLt2M
    }
  }
}
</script>

<style type="text/css" scoped>
/* .avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
} */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
