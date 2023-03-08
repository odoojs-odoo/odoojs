import { computed } from 'vue'
import api from '@/odoorpc'

// eslint-disable-next-line no-unused-vars
import { download, upload, file2Base64 } from '@/odoorpc/tools'

import { useField } from './FieldApi'

export function useWAttachment(props, ctx) {
  const { dVal: valDisp, ...fieldData } = useField(props, ctx)

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

  return { ...fieldData, dVal, onDownload }
}
