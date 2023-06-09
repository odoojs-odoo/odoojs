import { computed, toRaw } from 'vue'
import api from '@/odoorpc'

export function useField(props, ctx) {
  const readonly = computed(() => {
    if (!props.formInfo.editable) {
      return true
    }

    const fapi = api.env.field(toRaw(props.fieldInfo))
    const formInfo = toRaw(props.formInfo)
    return fapi.check_readonly({ ...formInfo })
  })

  const dVal = computed(() => {
    // 后续 o2m, m2m 字段 都会特殊处理
    // 因此 这里 只需要简单 merge 即可
    const recordMerged = { ...props.formInfo.record, ...props.formInfo.values }
    return recordMerged[props.fieldName]
  })

  const widgetName2 = computed(() => {
    const fieldTypeMap = {
      selection: 'FSelection',
      char: 'FString',
      text: 'FString',
      json: 'FJson',
      html: 'FString',
      float: 'FNumber',
      integer: 'FNumber',
      monetary: 'FNumber',

      // WAttachment 组件. 要求服务端 重写 create 和 write 函数, 以 适应 特殊的 m2o 字段数据写入
      many2one: { attachment: 'WAttachment', default: 'FMany2one' },
      date: 'FDate',
      datetime: 'FDatetime',
      boolean: 'FBoolean',
      many2many: {
        autosave_many2many_tags: 'FM2mTags',
        many2many_tags: 'FM2mTags',
        x2many_tree: 'FMany2many',
        many2many: 'FM2mTags',
        default: 'FM2mTags'
      },
      one2many: {
        x2many_tree: 'FOne2many',
        many2many_tags: 'FM2mTags',
        one2many: 'FM2mTags',
        default: 'FM2mTags'
      },
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

    if ('relationInfo' in props.formInfo) {
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
