import { computed } from 'vue'
import api from '@/odoorpc'

// eslint-disable-next-line no-unused-vars
import { download, upload, file2Base64 } from '@/odoorpc/tools'

import { useField } from './FieldApi'

export function useWAttachment(props, ctx) {
  const { dVal: valDisp, onChange, ...fieldData } = useField(props, ctx)

  const dVal = computed(() => (valDisp.value || [0, null])[1])

  async function onDownload() {
    const val = valDisp.value
    if (val) {
      const relation = api.env.relation(props.fieldInfo)
      const res = await relation.web_content(...val)
      console.log('onDownload', res)
      download(res)
    }
  }

  async function onUpload() {
    // 该方式要求 服务端 重写 create 和 write 函数, 以 特殊处理 附件m2o 字段的 数据写入
    // console.log('onUpload', this.node, this.values)

    upload(async files => {
      // console.log('onUpload', files)
      const file = files[0]
      const name = file.name
      const mimetype = file.type
      const datas = await file2Base64(file)

      const value = { name, mimetype, datas }
      console.log('onUpload2', [value, name])

      onChange([value, name])

      // this.handleChange([value, name])
    })
  }

  return { ...fieldData, dVal, onUpload, onDownload }
}
