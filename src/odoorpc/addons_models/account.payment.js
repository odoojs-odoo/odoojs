import { Model } from '../models'

export class AccountPayment extends Model {
  constructor(...args) {
    super(...args)
  }

  static _format_to_onchange(record) {
    // 重写 onchange 需要 对 record 格式化

    return Object.keys(record).reduce((acc, fld) => {
      const meta = this._fields[fld] || {}
      const val = record[fld]

      if (meta.type === 'many2one') {
        acc[fld] = val ? val[0] : val
      } else {
        acc[fld] = val
      }

      return acc
    }, {})
  }

  static async onchange(ids, values, fname, field_onchange, kwargs = {}) {
    const { context } = kwargs
    const { default_is_internal_transfer } = context
    const res = await super.onchange(ids, values, fname, field_onchange, kwargs)

    const for_new_internal_transfer =
      default_is_internal_transfer && Array.isArray(fname) && !fname.length

    if (!for_new_internal_transfer) return res

    const { value } = res

    const values_onchange = this._format_to_onchange(value)
    const values_onchange2 = { ...values_onchange, is_internal_transfer: true }
    const res2 = await super.onchange(
      ids,
      values_onchange2,
      'is_internal_transfer',
      field_onchange,
      kwargs
    )

    const { value: value2 } = res2

    const value_return = { ...value, is_internal_transfer: true, ...value2 }

    return { ...res, ...res2, value: value_return }
  }
}

const AddonsModels = {
  'account.payment': AccountPayment
}

export default AddonsModels
