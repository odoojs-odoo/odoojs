import { computed } from 'vue'

import { useField } from './FieldApi'

function useDateApi() {
  function _date_format(date) {
    const year = date.getFullYear().toString().padStart(4, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')

    const hh = date.getHours().toString().padStart(2, '0')
    const mm = date.getMinutes().toString().padStart(2, '0')
    const ss = date.getSeconds().toString().padStart(2, '0')

    const today_str = `${year}-${month}-${day} ${hh}:${mm}:${ss}`
    return today_str
  }

  function date_format(date) {
    if (date && typeof date === 'object') {
      return _date_format(date)
    } else {
      return date
    }
  }

  return { date_format }
}

export function useFDatetime(props, ctx) {
  const { date_format } = useDateApi()
  const { dVal: valDisp, ...fieldData } = useField(props, ctx)

  const dVal = computed(() => date_format(valDisp.value))

  return { ...fieldData, dVal }
}
