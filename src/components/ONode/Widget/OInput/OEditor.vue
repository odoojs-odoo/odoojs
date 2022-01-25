<template>
  <div>
    <!-- editor:
    <div>{{ value }}</div>
    <div>
      {{ fname }}

      {{ value2 }}
    </div> -->

    <!-- {{ value2[fname] }} -->

    <editor
      ref="teditor"
      v-model="value2[fname]"
      :id="elementId"
      :init="editorInit"
      @onChange="onInputChange"
    ></editor>
  </div>
</template>

<script>
import OInputMixin from './OInputMixin'

import api from '@/odooapi'

import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'

import 'tinymce/icons/default/icons'
import 'tinymce/themes/silver'
// 引入富文本编辑器主题的js和css
import 'tinymce/themes/silver/theme.min'
import 'tinymce/skins/ui/oxide/skin.min.css'
// 扩展插件
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/wordcount' // 字数统计插件
import 'tinymce/plugins/media' // 插入视频插件
import 'tinymce/plugins/template' // 模板插件
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/preview'

export default {
  name: 'OEditor',
  components: { Editor },
  mixins: [OInputMixin],

  props: {
    res_model: { type: String, default: 'ir.ui.view' },
    res_id: { type: Number, default: undefined },

    value: { type: String, default: '' },

    height: { type: Number, default: 500 },
    plugins: {
      type: [String, Array],
      default:
        'link lists image code table wordcount media fullscreen preview paste'
    },
    toolbar: {
      type: [String, Array],
      default:
        'fontselect| fontsizeselect | bold italic underline strikethrough table fullscreen  | link  image media  | undo redo  | alignleft aligncenter alignright alignjustify | bullist numlist | forecolor backcolor | outdent indent blockquote | code | removeformat'
    }
  },

  data() {
    return {
      // 子组件的数据变量，默认未父组件传递过来的数据
      tinymceHtml: '',
      // tinymce默认配置参数，含插件，请注意插件路径，如果错误容易保unexpect token ','之类错误
      editorInit: {
        relative_urls: true,
        language_url: '../../tinymce/zh_CN.js',
        language: 'zh_CN',
        skin_url: '../../tinymce/skins/ui/oxide',
        content_style:
          '* { padding:1px 2px; margin:0; } img {max-width:100% !important }',
        plugin_preview_width: 375, // 预览宽度
        plugin_preview_height: 200,
        lineheight_val:
          '1 1.1 1.2 1.3 1.35 1.4 1.5 1.55 1.6 1.75 1.8 1.9 1.95 2 2.1 2.2 2.3 2.4 2.5 2.6 2.7 2.8 3 3.1 3.2 3.3 3.4 4 5',
        fontsize_formats:
          '8pt 10pt 11pt 12pt 13pt 14pt 15pt 16pt 17pt 18pt 24pt 36pt',
        font_formats:
          "微软雅黑='微软雅黑';宋体='宋体';黑体='黑体';仿宋='仿宋';楷体='楷体';隶书='隶书';幼圆='幼圆';Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings",
        plugins: this.plugins,
        powerpaste_word_import: 'merge',
        toolbar: this.toolbar,
        height: 400,
        media_live_embeds: true, //视频的内嵌代码预览是否开启，为ture时富文本编辑框可实现预览功能
        paste_data_images: true,
        statusbar: true, // 底部的状态栏
        menubar: true, // 最上方的菜单
        branding: false, // 水印“Powered by TinyMCE”
        //自定义逻辑替换 Tinymce 的默认媒体嵌入逻辑
        images_upload_handler: (blobInfo, success, failure) => {
          //  this.$emit('handleImgUpload', blobInfo, success, failure);
          this.handleImgUpload(blobInfo, success, failure)
        },
        init_instance_callback: editor => {
          // if(this.value){
          //   editor.setContent(this.value)
          // }
          // this.hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            console.log('editor.getContent(),,', editor.getContent())
          })
        }
      }
    }
  },

  computed: {},

  watch: {},

  async created() {
    this.initTinym()
  },

  mounted() {},

  methods: {
    initValue(value) {
      const val = value
      if (!val) {
        this.value2 = { [this.fname]: val }
      }

      // str.replace(/需要替换的字符串/g，"新字符串")
      // const v = '<img src="/as1d" /> <img src="/as2d" /> <img src="/a3sd" />'
      const base_api = process.env.VUE_APP_BASE_API
      const base = base_api.slice(1)
      const re = new RegExp('src="/web/image', 'g')
      const val2 = val.replace(re, `src="${base}/web/image`)

      //   console.log('initValue: ', val, val2)

      this.value2 = { [this.fname]: val2 }
    },

    // 富文本改变后获取值

    // eslint-disable-next-line no-unused-vars
    onInputChange(event) {
      //   console.log('event,,,', event)
      const val = this.value2[this.fname]

      const base_api = process.env.VUE_APP_BASE_API
      const base1 = base_api
      const base2 = base_api.slice(1)

      const re1 = new RegExp(`src="${base1}/web/image`, 'g')
      const val2 = val.replace(re1, 'src="/web/image')

      const re2 = new RegExp(`src="${base2}/web/image`, 'g')
      const val3 = val2.replace(re2, 'src="/web/image')

      //   console.log('onInputChange,,,', val3)
      this.onchange(val3)
      // console.log('event,,,', event.level.content, this.value2[this.fname], this.fname);
    },
    initTinym() {
      //   this.value2[this.fname] = null
      //初始化加载配置项
      tinymce.init({})
      // console.log('初始化加载配置项,,,', tinymce)
    },

    // 上传本地 图片执行事件
    // eslint-disable-next-line no-unused-vars
    async handleImgUpload(blobInfo, success, failure) {
      //   console.log(blobInfo)

      const data = blobInfo.base64()
      const name = blobInfo.filename()
      const res_model = this.res_model
      const res_id = this.res_id

      const width = 100
      const height = 100

      const payload = { name, data, res_model, res_id, width, height }

      const res = await api.web_editor.attachment.add_data(payload)

      const url2 = res.image_src
      const base_api = process.env.VUE_APP_BASE_API
      //   const base1 = base_api
      const base2 = base_api.slice(1)

      //   console.log(name, base_api, url2)
      const url = `${base2}${url2}`
      success(url)

      //   let formdata = new FormData()
      //   // append 方法中的第一个参数就是 我们要上传文件 在后台接收的文件名
      //   // 这个值要根据后台来定义
      //   // 第二个参数是我们上传的文件
      //   formdata.append('file', blobInfo.blob())
      //   // axios 定义上传方法
      //   axios({
      //     method: 'post', // post方法
      //     url: 'http://112.156.20.36:18000/manage/manage/file/uploadFile', // 请求上传图片服务器的路径
      //     headers: {
      //       //   Authorization: 'Bearer ' + getToken(),
      //       'Content-Type': 'application/x-www-form-urlencoded' // 采用表单上传的方式，看后台如何接受
      //     },
      //     data: formdata // 请求数据formdata
      //   }).then(res => {
      //     if (res.data.code != 200) {
      //       // 上传失败执行此方法，将失败信息填入参数中
      //       failure('HTTP Error: ' + res.msg)
      //       return
      //     }
      //     // 上传成功之后，将对应完整的图片路径拼接在success的参数中
      //     success(res.data.msg)
      //   })
    }
  }
}
</script>

<style type="text/css"></style>
