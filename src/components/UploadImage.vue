<template>
  <div>
    <div>
      <div>&nbsp;</div>

      <div>
        原有的图片:
        <img :src="imgUrl" alt="原有的图片" width="20%">
      </div>

      <div>
        刚上传的图片:
        <img :src="headImg" alt="asdads" width="20%">
      </div>

      <div>
        <Upload :before-upload="handleUpload" action="">
          <Button icon="ios-cloud-upload-outline">上传图片</Button>
        </Upload>
        <!-- <div v-if="file !== null">
          Upload file: {{ file.name }}
          <Button type="text" @click="upload" :loading="loadingStatus">{{
            loadingStatus ? 'Uploading' : 'Click to upload'
          }}</Button>
        </div> -->
      </div>

      <!-- <div>
        <input
          id="Updateimage"
          type="file"
          lay-verify="required"
          accept="image/jpeg, image/png, image/jpg"
          @change="toBase64()"
        />
      </div> -->
    </div>
  </div>
</template>

<script>
/*
 上传图片组件
 在 选择组件库以后, 使用组件库的上传组件 替换这里的 input 框
*/

export default {
  name: 'Dialog',
  components: {},

  props: {
    value: { type: String, default: undefined },
    imgUrl: { type: String, default: undefined }
  },

  data() {
    return {
      headImg: '',

      file: null,
      loadingStatus: false
    }
  },

  computed: {},

  async created() {},

  methods: {
    // handleUpload() {
    //   //
    // },

    handleUpload(file) {
      this.file = file

      console.log('handleUpload', file)
      const reader = new FileReader()
      // console.log('reader', reader)
      const that = this

      reader.onloadend = function() {
        // console.log('reader.result', reader.result)
        const image = reader.result
        that.headImg = image

        const ss = image.split(';base64,')
        const raw_image = ss[1]
        that.$emit('input', raw_image)
      }
      if (file) {
        reader.readAsDataURL(file)
      }

      return false
    },
    upload() {
      this.loadingStatus = true
      setTimeout(() => {
        this.file = null
        this.loadingStatus = false
        this.$Message.success('Success')
      }, 1500)
    },

    toBase64() {
      const that = this
      const file = document.querySelector('input[type=file]').files[0]
      // console.log('base64', file)
      const reader = new FileReader()
      // console.log('reader', reader)
      reader.onloadend = function() {
        // console.log('reader.result', reader.result)
        const image = reader.result
        that.headImg = image

        const ss = image.split(';base64,')
        const raw_image = ss[1]
        that.$emit('input', raw_image)
      }
      if (file) {
        reader.readAsDataURL(file)
      }
    }
  }
}
</script>

<style type="text/css"></style>
