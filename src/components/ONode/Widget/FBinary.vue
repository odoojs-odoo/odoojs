<template>
  <span v-if="invisible"></span>

  <div v-else-if="widget === 'image'">
    <!-- image:{{ [field.type, fname, widget] }} -->
    <WImage
      :editable="editable"
      :data-info="dataInfo"
      :view-info="{ ...viewInfo, node }"
      @on-change="onchange"
    />
  </div>

  <div v-else-if="widget === 'tax-group-custom-field'">
    <!-- widget: tax-group-custom-field -->
    <WTaxGroupCustomField
      :value_readonly="value_readonly"
      :value_edit="value_edit"
      :editable="editable"
      :data-info="dataInfo"
      :view-info="{ ...viewInfo, node }"
      @on-change="onchange"
    />
  </div>

  <div v-else-if="widget_todo">{{ [field.type, fname, widget] }}</div>

  <span v-else-if="readonly || !editable" :class="className">
    <template v-if="value_readonly">
      <a-button
        type="link"
        icon="download"
        href="javascript:;"
        @click="onDownload"
      >
        {{ record[filename_field] }}
      </a-button>
    </template>
  </span>
  <div v-else>
    <!-- edit: {{ [field.type, fname] }}   -->

    <div :class="className">
      <a-button type="primary" v-if="!value" @click="onUpload">
        上传你的文件
      </a-button>

      <span v-else>
        <span @click="onUpload">
          <a-input
            :value="values[filename_field] || record[filename_field]"
            disabled
          >
          </a-input>
        </span>
        <a-button icon="edit" @click="onUpload" />
        <a-button icon="rest" @click="onDelete" />
      </span>
    </div>
  </div>
</template>

<script>
import api from '@/odooapi'
import { upload, file2Base64 } from '@/odooapi/tools'

import OFMixin from './OFMixin'
import WImage from './WImage.vue'
import WTaxGroupCustomField from './WTaxGroupCustomField.vue'

function call_download({ filename, filetype, data }) {
  // //ArrayBuffer 转为 Blob
  const blob = new Blob([data], { type: filetype })
  const objectUrl = URL.createObjectURL(blob)
  const filename2 = decodeURIComponent(filename)
  const a = document.createElement('a')
  a.setAttribute('href', objectUrl)
  a.setAttribute('download', filename2)
  a.click()
  return true
}

export default {
  name: 'FBinary',
  components: { WImage, WTaxGroupCustomField },
  mixins: [OFMixin],
  props: {},
  data() {
    return {}
  },
  computed: {
    filename_field() {
      return this.node.attrs.filename
    },
    widget_todo() {
      const done = []
      return done.includes(this.widget) ? '' : this.widget
    },

    className() {
      const arr = [...this.classNameByField]
      arr.push('o_field_binary_file')
      return arr.join(' ')
    }
  },

  watch: {},

  created() {},

  mounted() {},

  methods: {
    async onUpload() {
      // console.log('onUpload', this.node, this.values)

      upload(async files => {
        console.log('onUpload', files)
        const file = files[0]
        const filename_field = this.filename_field
        const filename = file.name
        const val = await file2Base64(file)
        this.onchange(val)
        this.$emit('on-event', 'on-change', filename_field, filename)
      })
    },

    async onDelete() {
      // console.log('onDelete')
      const filename_field = this.filename_field
      this.onchange(false)
      this.$emit('on-event', 'on-change', filename_field, false)
    },

    async onDownload() {
      const res_model = this.viewInfo.action.res_model
      const res_id = this.record.id
      const field = this.fname
      const filename = this.record.name
      const filename_field = 'name'
      const download = true

      const kw1 = { model: res_model, id: res_id, field }
      const kw2 = { filename, filename_field, download }
      // {model, id, field, filename, filename_field, download}
      const kw = { ...kw1, ...kw2 }
      const res = await api.web.content(kw)
      // console.log('onDownload', kw)
      // console.log('onDownload', res)
      call_download(res)
    }
  }
}
</script>

<style type="text/css"></style>
