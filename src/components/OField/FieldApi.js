import { computed } from 'vue'
import api from '@/odoorpc'

function get_recordMerged(formInfo) {
  const formview = api.env.formview(formInfo.viewInfo, {
    fields: formInfo.fields
  })

  return formview._get_values_for_modifiers(formInfo.record, formInfo.values)
}

function useFormApi() {
  // const viewInfo = computed(() => formInfo.viewInfo)

  function checkReadonly(formInfo, fieldInfo) {
    // const recordMerged = { ...formInfo.record, ...formInfo.values }

    const recordMerged = get_recordMerged(formInfo)

    const readonly = api.env.field(fieldInfo).readonly_get({
      record: recordMerged
    })

    // console.log([formInfo, formInfo.editable])
    // return !formInfo.editable    // for debug

    // WAttachment 的 编辑 尚未处理 todo

    return !formInfo.editable || readonly
  }

  function getValueDisplay(formInfo, fieldName) {
    const recordMerged = { ...formInfo.record, ...formInfo.values }

    return recordMerged[fieldName]
    // if (fieldName in formInfo.values) {
    //   return formInfo.values[fieldName]
    // } else {
    //   return formInfo.record[fieldName]
    // }
  }

  return { checkReadonly, getValueDisplay }
}

export function useField(props, ctx) {
  const formApi = useFormApi()
  const readonly = computed(() =>
    formApi.checkReadonly(props.formInfo, props.fieldInfo)
  )

  const dVal = computed(() =>
    formApi.getValueDisplay(props.formInfo, props.fieldName)
  )

  const widgetName2 = computed(() => {
    const fieldTypeMap = {
      selection: 'FSelection',
      char: 'FString',
      text: 'FString',
      html: 'FString',
      float: 'FNumber',
      integer: 'FNumber',
      monetary: 'FNumber',
      many2one: { attachment: 'WAttachment', default: 'FMany2one' },
      date: 'FDate',
      datetime: 'FDatetime',
      boolean: 'FBoolean',
      many2many: {
        many2many_tags: 'FM2mTags',
        x2many_tree: 'FMany2many',
        default: 'FMany2many'
      },
      one2many: { x2many_tree: 'FOne2many', default: 'FOne2many' },
      binary: 'FBinary'
    }

    // console.log(props.fieldInfo)

    const wt = fieldTypeMap[props.fieldInfo.type]
    if (!wt) return null
    else if (typeof wt === 'string') return wt
    else if (typeof wt !== 'object') return null
    else if (!props.fieldInfo.widget) return wt.default || null
    else return wt[props.fieldInfo.widget] || wt.default || null
  })

  const widgetName = computed(() => {
    // todo: o2mForm 中 嵌套 m2m 或 o2m 子表. 暂时 考虑不完善
    const name = widgetName2.value

    if (props.formInfo.formType === 'o2mForm') {
      if (['FMany2many', 'FOne2many'].includes(name)) {
        return null
      }
    }

    return name
  })

  const mVal = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      ctx.emit('update:modelValue', value)
    }
  })

  function onChange(value, tag) {
    console.log('onChange in fieldApi', value, tag)
    ctx.emit('change', value)
  }

  // widgetName, // OField 组件 使用该字段 进行判断. 其他组件不用
  return { widgetName, mVal, dVal, readonly, onChange }
}
