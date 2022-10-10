<template>
  <span>
    <template v-if="!editable || readonly">
      <a-button
        v-if="value_readonly && value_readonly"
        type="link"
        icon="download"
        href="javascript:;"
        @click="onDownload"
      >
        {{ value_readonly[1] }}
      </a-button>
      <!-- <a-button type="primary" @click="testAttach"> test </a-button> -->
    </template>

    <template v-else>
      <template v-if="!value_display">
        <a-button type="primary" @click="onUpload"> 上传你的文件 </a-button>
      </template>
      <template v-else>
        <!-- old: {{ value_readonly }}, new: -->
        {{ value_display && value_display[1] }}
        <a-button type="primary" @click="onUpload"> 重新上传你的文件 </a-button>
      </template>
    </template>
  </span>
</template>

<script>
import { download, upload, file2Base64 } from '@/odoorpc/tools'

import OFMixin from './OFMixin'

import api from '@/odoorpc'

export default {
  name: 'WAttachment',
  components: {},
  mixins: [OFMixin],
  props: {
    value: { type: Array, default: undefined }
  },

  data() {
    return {}
  },
  computed: {},

  watch: {},

  created() {},

  mounted() {},

  methods: {
    async testAttach() {
      const Model = api.env.model('ir.attachment')
      //   const fgs = Model.fields_get([], [])
      //   console.log(fgs)
      const res = await Model.read(this.value_readonly[0], {
        fields: [
          'name',
          'res_model',
          'res_field',
          'res_id',
          'store_fname',
          'file_size',
          'mimetype'
        ]
      })
      console.log(res)
    },

    async onDownload() {
      const relation = api.env.relation(this.fieldInfo)
      const res = await relation.web_content(...this.value_readonly)
      //   console.log('onDownload', res)
      download(res)
    },

    async onUpload() {
      // console.log('onUpload', this.node, this.values)

      upload(async files => {
        // console.log('onUpload', files)
        const file = files[0]
        const name = file.name
        const mimetype = file.type
        const datas = await file2Base64(file)

        // console.log('onUpload2', name, mimetype)

        const value = { name, mimetype, datas }
        this.handleChange([value, name])
      })
    }
  }
}
</script>

<style type="text/css"></style>
